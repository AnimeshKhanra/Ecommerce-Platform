"use client";

import { useState } from "react";
import { z } from "zod";
import { createCheckoutSession } from "@/lib/paymentApi";

const shippingSchema = z.object({
  fullName: z.string().min(2, "Full name required"),
  address: z.string().min(5, "Address required"),
  city: z.string().min(2, "City required"),
  postalCode: z.string().min(4, "Postal code required"),
  country: z.string().min(2, "Country required"),
});

type ShippingFormData = z.infer<typeof shippingSchema>;

export default function ShippingForm() {
  const [formData, setFormData] =
    useState<ShippingFormData>({
      fullName: "",
      address: "",
      city: "",
      postalCode: "",
      country: "India",
    });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ShippingFormData, string>>
  >({});

  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const parsed =
      shippingSchema.safeParse(formData);

    if (!parsed.success) {
      const fieldErrors: any = {};

      parsed.error.issues.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res =
        await createCheckoutSession(formData);

      window.location.href = res.url;
    } catch (error) {
      console.error(error);
      alert("Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  function updateField(
    field: keyof ShippingFormData,
    value: string
  ) {
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
      <h2 className="text-2xl font-bold">
        Shipping Address
      </h2>

      <div>
        <input
          type="text"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(e) =>
            updateField(
              "fullName",
              e.target.value
            )
          }
          className="w-full border p-3 rounded-lg"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">
            {errors.fullName}
          </p>
        )}
      </div>

      <div>
        <input
          type="text"
          placeholder="Address"
          value={formData.address}
          onChange={(e) =>
            updateField(
              "address",
              e.target.value
            )
          }
          className="w-full border p-3 rounded-lg"
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">
            {errors.address}
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <input
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={(e) =>
              updateField("city", e.target.value)
            }
            className="w-full border p-3 rounded-lg"
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">
              {errors.city}
            </p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={(e) =>
              updateField(
                "postalCode",
                e.target.value
              )
            }
            className="w-full border p-3 rounded-lg"
          />
          {errors.postalCode && (
            <p className="text-red-500 text-sm mt-1">
              {errors.postalCode}
            </p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Country"
            value={formData.country}
            onChange={(e) =>
              updateField(
                "country",
                e.target.value
              )
            }
            className="w-full border p-3 rounded-lg"
          />
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">
              {errors.country}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-4 rounded-xl hover:opacity-90"
      >
        {loading
          ? "Redirecting..."
          : "Proceed to Payment"}
      </button>
    </form>
  );
}