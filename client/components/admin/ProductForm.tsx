// "use client";

// import { useEffect, useState } from "react";
// import api from "@/lib/axios";
// import {
//   Category,
//   ProductFormData,
// } from "@/types/product.types";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast"

// interface ProductFormProps {
//   initialData?: ProductFormData;
//   productId?: string;
//   isEdit?: boolean;
// }

// export default function ProductForm({
//   initialData,
//   productId,
//   isEdit = false,
// }: ProductFormProps) {
//   const router = useRouter();

//   const [categories, setCategories] = useState<
//     Category[]
//   >([]);

//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] =
//     useState<ProductFormData>(
//       initialData || {
//         name: "",
//         description: "",
//         price: 0,
//         stock: 0,
//         categoryId: "",
//         images: [],
//       }
//     );

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   async function fetchCategories() {
//     try {
//       //TODO: also create a new categoris here if admin want
//       const res = await api.get("/categories");
//       setCategories(res.data.data);
//     } catch (error) {
//       console.error(error);
//       toast.error("Operation failed");
//     }
//   }

//   async function handleImageUpload(
//     file: File
//   ) {
//     const form = new FormData();
//     form.append("image", file);

//     const res = await api.post(
//       "/upload/image",
//       form,
//       {
//         headers: {
//           "Content-Type":
//             "multipart/form-data",
//         },
//       }
//     );

//     return res.data.data.url;
//   }

//   async function handleSubmit(
//     e: React.FormEvent
//   ) {
//     e.preventDefault();

//     setLoading(true);

//     try {
//       if (isEdit) {
//         await api.patch(
//           `/admin/products/${productId}`,
//           formData
//         );
//       } else {
//         // await api.post("/admin/products/create", formData);
//         await api.post("/products", formData);
//       }

//       router.push("/admin/products");
//     } catch (error) {
//       console.error(error);
//       toast.error("Operation failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleFileChange(
//     e: React.ChangeEvent<HTMLInputElement>
//   ) {
//     const file = e.target.files?.[0];

//     if (!file) return;

//     try {
//       const imageUrl =
//         await handleImageUpload(file);

//       setFormData((prev) => ({
//         ...prev,
//         images: [...prev.images, imageUrl],
//       }));
//     } catch (error) {
//       console.error(error);
//       toast.error("Operation failed");
//     }
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="space-y-6 bg-white p-8 rounded-2xl shadow"
//     >
//       <input
//         type="text"
//         placeholder="Product Name"
//         value={formData.name}
//         onChange={(e) =>
//           setFormData({
//             ...formData,
//             name: e.target.value,
//           })
//         }
//         className="w-full border p-3 rounded-lg"
//       />

//       <textarea
//         placeholder="Description"
//         value={formData.description}
//         onChange={(e) =>
//           setFormData({
//             ...formData,
//             description:
//               e.target.value,
//           })
//         }
//         className="w-full border p-3 rounded-lg"
//       />

//       <input
//         type="number"
//         placeholder="Price"
//         value={formData.price}
//         onChange={(e) =>
//           setFormData({
//             ...formData,
//             price: Number(
//               e.target.value
//             ),
//           })
//         }
//         className="w-full border p-3 rounded-lg"
//       />

//       <input
//         type="number"
//         placeholder="Stock"
//         value={formData.stock}
//         onChange={(e) =>
//           setFormData({
//             ...formData,
//             stock: Number(
//               e.target.value
//             ),
//           })
//         }
//         className="w-full border p-3 rounded-lg"
//       />

//       <select
//         value={formData.categoryId}
//         onChange={(e) =>
//           setFormData({
//             ...formData,
//             categoryId:
//               e.target.value,
//           })
//         }
//         className="w-full border p-3 rounded-lg"
//       >
//         <option value="">
//           Select Category
//         </option>

//         {categories.map((category) => (
//           <option
//             key={category.id}
//             value={category.id}
//           >
//             {category.name}
//           </option>
//         ))}
//       </select>

//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleFileChange}
//       />

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {formData.images.map(
//           (image, index) => (
//             <img
//               key={index}
//               src={image}
//               alt="preview"
//               className="w-full h-24 object-cover rounded-lg"
//             />
//           )
//         )}
//       </div>

//       <button
//         disabled={loading}
//         className="bg-indigo-600 text-white px-6 py-3 rounded-xl"
//       >
//         {loading
//           ? "Saving..."
//           : isEdit
//           ? "Update Product"
//           : "Create Product"}
//       </button>
//     </form>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import api from "@/lib/axios";

import {
  Category,
  ProductFormData,
} from "@/types/product.types";

interface ProductFormProps {
  initialData?: ProductFormData;
  productId?: string;
  isEdit?: boolean;
}

const emptyForm: ProductFormData = {
  name: "",
  description: "",
  price: 0,
  stock: 0,
  categoryId: "",
  images: [],
};

export default function ProductForm({
  initialData,
  productId,
  isEdit = false,
}: ProductFormProps) {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState<ProductFormData>(
    initialData || emptyForm
  );

  // ==========================================
  // Fetch Categories
  // ==========================================

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");

        setCategories(response.data.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        toast.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  // ==========================================
  // Handle Input Changes
  // ==========================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock"
          ? Number(value)
          : value,
    }));
  };

  // ==========================================
  // Upload Single Image
  // ==========================================

  const handleImageUpload = async (file: File) => {
    const form = new FormData();

    form.append("image", file);

    try {
      setUploadingImage(true);

      const response = await api.post(
        "/upload/image",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = response.data.data.imageUrl;

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, imageUrl],
      }));

      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  // ==========================================
  // File Change
  // ==========================================

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    handleImageUpload(file);

    // Allow selecting the same file again
    e.target.value = "";
  };

  // ==========================================
  // Remove Image
  // ==========================================

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter(
        (_, imageIndex) => imageIndex !== index
      ),
    }));
  };

  // ==========================================
  // Submit
  // ==========================================

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Product name is required");
      return;
    }

    if (formData.price <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }

    if (formData.stock < 0) {
      toast.error("Stock cannot be negative");
      return;
    }

    if (!formData.categoryId) {
      toast.error("Please select a category");
      return;
    }

    if (uploadingImage) {
      toast.error("Please wait for image upload to finish");
      return;
    }

    try {
      setLoading(true);

      if (isEdit && productId) {
        await api.patch(
          `/admin/products/${productId}`,
          formData
        );

        toast.success("Product updated successfully");
      } else {
        await api.post(
          "/admin/products/create",
          formData
        );

        toast.success("Product created successfully");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error("Product operation failed:", error);

      toast.error(
        isEdit
          ? "Failed to update product"
          : "Failed to create product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl bg-white p-8 shadow"
    >
      {/* Product Name */}

      <div>
        <label className="mb-2 block font-medium">
          Product Name
        </label>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
        />
      </div>

      {/* Description */}

      <div>
        <label className="mb-2 block font-medium">
          Description
        </label>

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          className="w-full rounded-lg border p-3"
        />
      </div>

      {/* Price */}

      <div>
        <label className="mb-2 block font-medium">
          Price
        </label>

        <input
          type="number"
          name="price"
          min="0"
          step="0.01"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
        />
      </div>

      {/* Stock */}

      <div>
        <label className="mb-2 block font-medium">
          Stock
        </label>

        <input
          type="number"
          name="stock"
          min="0"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
        />
      </div>

      {/* Category */}

      <div>
        <label className="mb-2 block font-medium">
          Category
        </label>

        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
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
      </div>

      {/* Image */}

      <div>
        <label className="mb-2 block font-medium">
          Product Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploadingImage || loading}
          className="w-full rounded-lg border p-3"
        />

        {uploadingImage && (
          <p className="mt-2 text-sm text-gray-500">
            Uploading image...
          </p>
        )}
      </div>

      {/* Image Preview */}

      {formData.images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {formData.images.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="relative overflow-hidden rounded-lg border"
            >
              <img
                src={image}
                alt={`Product image ${index + 1}`}
                className="h-32 w-full object-cover"
              />

              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute right-2 top-2 rounded-full bg-red-600 px-2 py-1 text-xs text-white"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Submit */}

      <button
        type="submit"
        disabled={loading || uploadingImage}
        className="rounded-xl bg-indigo-600 px-6 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {uploadingImage
          ? "Uploading Image..."
          : loading
          ? "Saving..."
          : isEdit
          ? "Update Product"
          : "Create Product"}
      </button>
    </form>
  );
}