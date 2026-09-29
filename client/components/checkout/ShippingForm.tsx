'use client';

import { useState } from 'react';
import { z } from 'zod';
import { createCheckout } from '@/lib/checkoutApi';
import { ShippingAddress } from '@/types/checkout.types';
import toast from 'react-hot-toast';

const shippingSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  addressLine1: z.string().min(5, 'Address must be at least 5 characters'),
  addressLine2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  postalCode: z.string().min(4, 'Postal code is required'),
  country: z.string().min(2, 'Country is required'),
});

export default function ShippingForm() {
  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ShippingAddress, string>>
  >({});

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = shippingSchema.safeParse(formData);

    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof ShippingAddress, string>> = {};

      parsed.error.issues.forEach((err) => {
        const field = err.path[0] as keyof ShippingAddress;

        fieldErrors[field] = err.message;
      });

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await createCheckout(formData);

      window.location.href = res.url;
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Checkout failed');
    } finally {
      setLoading(false);
    }
  }

  function updateField(field: keyof ShippingAddress, value: string) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white p-6 rounded-2xl border shadow-sm"
    >
      <h2 className="text-2xl font-bold">Shipping Address</h2>

      {/* Full Name */}
      <div>
        <input
          type="text"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(e) => updateField('fullName', e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <input
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => updateField('phone', e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Address Line 1 */}
      <div>
        <input
          type="text"
          placeholder="Address Line 1"
          value={formData.addressLine1}
          onChange={(e) => updateField('addressLine1', e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        {errors.addressLine1 && (
          <p className="text-red-500 text-sm mt-1">{errors.addressLine1}</p>
        )}
      </div>

      {/* Address Line 2 */}
      <div>
        <input
          type="text"
          placeholder="Address Line 2 (Optional)"
          value={formData.addressLine2}
          onChange={(e) => updateField('addressLine2', e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        {errors.addressLine2 && (
          <p className="text-red-500 text-sm mt-1">{errors.addressLine2}</p>
        )}
      </div>

      {/* City + State */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* City */}
        <div>
          <input
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={(e) => updateField('city', e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>

        {/* State */}
        <div>
          <input
            type="text"
            placeholder="State"
            value={formData.state}
            onChange={(e) => updateField('state', e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          {errors.state && (
            <p className="text-red-500 text-sm mt-1">{errors.state}</p>
          )}
        </div>
      </div>

      {/* Postal Code + Country */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Postal Code */}
        <div>
          <input
            type="text"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={(e) => updateField('postalCode', e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          {errors.postalCode && (
            <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
          )}
        </div>

        {/* Country */}
        <div>
          <select
            value={formData.country}
            onChange={(e) =>
              updateField("country", e.target.value)
            }
            className="w-full border p-3 rounded-lg bg-white"
          >
            <option value="India">India</option>
            {/* <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option> */}
          </select>

          {errors.country && (
            <p className="text-red-500 text-sm mt-1">
              {errors.country}
            </p>
          )}
        </div>
      </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-4 rounded-xl hover:opacity-90 disabled:opacity-50"
        >
          {loading ? 'Redirecting...' : 'Proceed to Payment'}
        </button>
    </form>
  );
}
