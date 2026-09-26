// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";

// import api from "@/lib/axios";

// import {
//   Category,
//   ProductFormData,
// } from "@/types/product.types";

// interface ProductFormProps {
//   initialData?: ProductFormData;
//   productId?: string;
//   isEdit?: boolean;
// }

// const emptyForm: ProductFormData = {
//   name: "",
//   description: "",
//   price: 0,
//   stock: 0,
//   categoryId: "",
//   images: [],
// };

// export default function ProductForm({
//   initialData,
//   productId,
//   isEdit = false,
// }: ProductFormProps) {
//   const router = useRouter();

//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [uploadingImage, setUploadingImage] = useState(false);

//   const [formData, setFormData] = useState<ProductFormData>(
//     initialData || emptyForm
//   );

//   // ==========================================
//   // Fetch Categories
//   // ==========================================

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await api.get("/categories");

//         setCategories(response.data.data);
//       } catch (error) {
//         console.error("Failed to fetch categories:", error);
//         toast.error("Failed to load categories");
//       }
//     };

//     fetchCategories();
//   }, []);

//   // ==========================================
//   // Handle Input Changes
//   // ==========================================

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]:
//         name === "price" || name === "stock"
//           ? Number(value)
//           : value,
//     }));
//   };

//   // ==========================================
//   // Upload Single Image
//   // ==========================================

//   const handleImageUpload = async (file: File) => {
//     const form = new FormData();

//     form.append("image", file);

//     try {
//       setUploadingImage(true);

//       const response = await api.post(
//         "/upload/image",
//         form,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       const imageUrl = response.data.data.imageUrl;

//       setFormData((prev) => ({
//         ...prev,
//         images: [...prev.images, imageUrl],
//       }));

//       toast.success("Image uploaded successfully");
//     } catch (error) {
//       console.error("Image upload failed:", error);
//       toast.error("Failed to upload image");
//     } finally {
//       setUploadingImage(false);
//     }
//   };

//   // ==========================================
//   // File Change
//   // ==========================================

//   const handleFileChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = e.target.files?.[0];

//     if (!file) return;

//     handleImageUpload(file);

//     // Allow selecting the same file again
//     e.target.value = "";
//   };

//   // ==========================================
//   // Remove Image
//   // ==========================================

//   const handleRemoveImage = (index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       images: prev.images.filter(
//         (_, imageIndex) => imageIndex !== index
//       ),
//     }));
//   };

//   // ==========================================
//   // Submit
//   // ==========================================

//   const handleSubmit = async (
//     e: React.FormEvent<HTMLFormElement>
//   ) => {
//     e.preventDefault();

//     if (!formData.name.trim()) {
//       toast.error("Product name is required");
//       return;
//     }

//     if (formData.price <= 0) {
//       toast.error("Price must be greater than 0");
//       return;
//     }

//     if (formData.stock < 0) {
//       toast.error("Stock cannot be negative");
//       return;
//     }

//     if (!formData.categoryId) {
//       toast.error("Please select a category");
//       return;
//     }

//     if (uploadingImage) {
//       toast.error("Please wait for image upload to finish");
//       return;
//     }

//     try {
//       setLoading(true);

//       if (isEdit && productId) {
//         await api.patch(
//           `/admin/products/${productId}`,
//           formData
//         );

//         toast.success("Product updated successfully");
//       } else {
//         await api.post(
//           "/admin/products/create",
//           formData
//         );

//         toast.success("Product created successfully");
//       }

//       router.push("/admin/products");
//       router.refresh();
//     } catch (error) {
//       console.error("Product operation failed:", error);

//       toast.error(
//         isEdit
//           ? "Failed to update product"
//           : "Failed to create product"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="space-y-6 rounded-2xl bg-white p-8 shadow"
//     >
//       {/* Product Name */}

//       <div>
//         <label className="mb-2 block font-medium">
//           Product Name
//         </label>

//         <input
//           type="text"
//           name="name"
//           placeholder="Product Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full rounded-lg border p-3"
//         />
//       </div>

//       {/* Description */}

//       <div>
//         <label className="mb-2 block font-medium">
//           Description
//         </label>

//         <textarea
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleChange}
//           rows={5}
//           className="w-full rounded-lg border p-3"
//         />
//       </div>

//       {/* Price */}

//       <div>
//         <label className="mb-2 block font-medium">
//           Price
//         </label>

//         <input
//           type="number"
//           name="price"
//           min="0"
//           step="0.01"
//           placeholder="Price"
//           value={formData.price}
//           onChange={handleChange}
//           className="w-full rounded-lg border p-3"
//         />
//       </div>

//       {/* Stock */}

//       <div>
//         <label className="mb-2 block font-medium">
//           Stock
//         </label>

//         <input
//           type="number"
//           name="stock"
//           min="0"
//           placeholder="Stock"
//           value={formData.stock}
//           onChange={handleChange}
//           className="w-full rounded-lg border p-3"
//         />
//       </div>

//       {/* Category */}

//       <div>
//         <label className="mb-2 block font-medium">
//           Category
//         </label>

//         <select
//           name="categoryId"
//           value={formData.categoryId}
//           onChange={handleChange}
//           className="w-full rounded-lg border p-3"
//         >
//           <option value="">
//             Select Category
//           </option>

//           {categories.map((category) => (
//             <option
//               key={category.id}
//               value={category.id}
//             >
//               {category.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Image */}

//       <div>
//         <label className="mb-2 block font-medium">
//           Product Image
//         </label>

//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           disabled={uploadingImage || loading}
//           className="w-full rounded-lg border p-3"
//         />

//         {uploadingImage && (
//           <p className="mt-2 text-sm text-gray-500">
//             Uploading image...
//           </p>
//         )}
//       </div>

//       {/* Image Preview */}

//       {formData.images.length > 0 && (
//         <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
//           {formData.images.map((image, index) => (
//             <div
//               key={`${image}-${index}`}
//               className="relative overflow-hidden rounded-lg border"
//             >
//               <img
//                 src={image}
//                 alt={`Product image ${index + 1}`}
//                 className="h-32 w-full object-cover"
//               />

//               <button
//                 type="button"
//                 onClick={() => handleRemoveImage(index)}
//                 className="absolute right-2 top-2 rounded-full bg-red-600 px-2 py-1 text-xs text-white"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Submit */}

//       <button
//         type="submit"
//         disabled={loading || uploadingImage}
//         className="rounded-xl bg-indigo-600 px-6 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
//       >
//         {uploadingImage
//           ? "Uploading Image..."
//           : loading
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
import { Loader2, Upload, X } from "lucide-react";

import api from "@/lib/axios";
import {
  Category,
  ProductFormData,
} from "@/types/product.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      HTMLInputElement | HTMLTextAreaElement
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

      const response = await api.post("/upload/image", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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
        await api.patch(`/admin/products/${productId}`, formData);
        toast.success("Product updated successfully");
      } else {
        await api.post("/admin/products/create", formData);
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Product Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          type="text"
          name="name"
          placeholder="e.g. Wireless Headphones"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Describe the product..."
          value={formData.description}
          onChange={handleChange}
          rows={5}
        />
      </div>

      {/* Price & Stock */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="price">Price (₹)</Label>
          <Input
            id="price"
            type="number"
            name="price"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            type="number"
            name="stock"
            min="0"
            placeholder="0"
            value={formData.stock}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label>Category</Label>
        <Select
          value={formData.categoryId}
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              categoryId: value ?? "",
            }))
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categories.map((category) => (
                <SelectItem
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Image Upload */}
      <div className="space-y-2">
        <Label htmlFor="image">Product Image</Label>

        <div className="relative">
          <Upload className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploadingImage || loading}
            className="pl-9"
          />
        </div>

        {uploadingImage && (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            Uploading image...
          </p>
        )}
      </div>

      {/* Image Previews */}
      {formData.images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {formData.images.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="group relative aspect-square overflow-hidden rounded-lg border"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt={`Product image ${index + 1}`}
                className="size-full object-cover"
              />

              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                aria-label="Remove image"
                className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-destructive text-white opacity-90 transition-opacity hover:opacity-100"
              >
                <X className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        disabled={loading || uploadingImage}
        className="w-full sm:w-auto"
      >
        {(loading || uploadingImage) && (
          <Loader2 className="size-4 animate-spin" />
        )}
        {uploadingImage
          ? "Uploading Image..."
          : loading
          ? "Saving..."
          : isEdit
          ? "Update Product"
          : "Create Product"}
      </Button>
    </form>
  );
}