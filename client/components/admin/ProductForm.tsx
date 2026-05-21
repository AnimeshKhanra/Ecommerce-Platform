"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import {
  Category,
  ProductFormData,
} from "@/types/product.types";
import { useRouter } from "next/navigation";

interface ProductFormProps {
  initialData?: ProductFormData;
  productId?: string;
  isEdit?: boolean;
}

export default function ProductForm({
  initialData,
  productId,
  isEdit = false,
}: ProductFormProps) {
  const router = useRouter();

  const [categories, setCategories] = useState<
    Category[]
  >([]);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] =
    useState<ProductFormData>(
      initialData || {
        name: "",
        description: "",
        price: 0,
        stock: 0,
        categoryId: "",
        images: [],
      }
    );

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const res = await api.get("/categories");
      setCategories(res.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleImageUpload(
    file: File
  ) {
    const form = new FormData();
    form.append("image", file);

    const res = await api.post(
      "/upload/image",
      form,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return res.data.data.url;
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      if (isEdit) {
        await api.put(
          `/products/${productId}`,
          formData
        );
      } else {
        await api.post("/products", formData);
      }

      router.push("/admin/products");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const imageUrl =
        await handleImageUpload(file);

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, imageUrl],
      }));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-8 rounded-2xl shadow"
    >
      <input
        type="text"
        placeholder="Product Name"
        value={formData.name}
        onChange={(e) =>
          setFormData({
            ...formData,
            name: e.target.value,
          })
        }
        className="w-full border p-3 rounded-lg"
      />

      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({
            ...formData,
            description:
              e.target.value,
          })
        }
        className="w-full border p-3 rounded-lg"
      />

      <input
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={(e) =>
          setFormData({
            ...formData,
            price: Number(
              e.target.value
            ),
          })
        }
        className="w-full border p-3 rounded-lg"
      />

      <input
        type="number"
        placeholder="Stock"
        value={formData.stock}
        onChange={(e) =>
          setFormData({
            ...formData,
            stock: Number(
              e.target.value
            ),
          })
        }
        className="w-full border p-3 rounded-lg"
      />

      <select
        value={formData.categoryId}
        onChange={(e) =>
          setFormData({
            ...formData,
            categoryId:
              e.target.value,
          })
        }
        className="w-full border p-3 rounded-lg"
      >
        <option value="">
          Select Category
        </option>

        {categories.map((category) => (
          <option
            key={category.id}
            value={category.id}
          >
            {category.name}
          </option>
        ))}
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {formData.images.map(
          (image, index) => (
            <img
              key={index}
              src={image}
              alt="preview"
              className="w-full h-24 object-cover rounded-lg"
            />
          )
        )}
      </div>

      <button
        disabled={loading}
        className="bg-indigo-600 text-white px-6 py-3 rounded-xl"
      >
        {loading
          ? "Saving..."
          : isEdit
          ? "Update Product"
          : "Create Product"}
      </button>
    </form>
  );
}