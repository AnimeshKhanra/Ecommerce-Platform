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

const MAX_IMAGES = 8;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

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
  const [uploadingImages, setUploadingImages] = useState(false);

  const [formData, setFormData] = useState<ProductFormData>(
    initialData || emptyForm
  );

  // Newly selected local files
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  // Local preview URLs for newly selected files
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  // =========================================================
  // Fetch Categories
  // =========================================================

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

  // =========================================================
  // Cleanup Object URLs
  // =========================================================

  useEffect(() => {
    return () => {
      previewImages.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [previewImages]);

  // =========================================================
  // Handle Input Changes
  // =========================================================

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

  // =========================================================
  // Handle Multiple Image Selection
  // =========================================================

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) {
      return;
    }

    // Current existing images + newly selected images
    const totalImages =
      formData.images.length +
      selectedImages.length +
      files.length;

    if (totalImages > MAX_IMAGES) {
      toast.error(
        `You can upload maximum ${MAX_IMAGES} images`
      );

      e.target.value = "";
      return;
    }

    // Validate files
    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast.error(
          `${file.name}: Only JPG, JPEG, PNG and WEBP images are allowed`
        );

        e.target.value = "";
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast.error(
          `${file.name}: Image size must be less than 5MB`
        );

        e.target.value = "";
        return;
      }
    }

    // Add files
    setSelectedImages((prev) => [
      ...prev,
      ...files,
    ]);

    // Create previews
    const newPreviews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviewImages((prev) => [
      ...prev,
      ...newPreviews,
    ]);

    // Allow selecting the same file again
    e.target.value = "";
  };

  // =========================================================
  // Remove Newly Selected Image
  // =========================================================

  const handleRemoveSelectedImage = (index: number) => {
    // Revoke object URL
    URL.revokeObjectURL(previewImages[index]);

    setSelectedImages((prev) =>
      prev.filter((_, imageIndex) => imageIndex !== index)
    );

    setPreviewImages((prev) =>
      prev.filter((_, imageIndex) => imageIndex !== index)
    );
  };

  // =========================================================
  // Remove Existing Product Image
  // =========================================================

  const handleRemoveExistingImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter(
        (_, imageIndex) => imageIndex !== index
      ),
    }));
  };

  // =========================================================
  // Upload Images
  // =========================================================

  const uploadImages = async (): Promise<string[]> => {
    if (selectedImages.length === 0) {
      return [];
    }

    const form = new FormData();

    selectedImages.forEach((file) => {
      form.append("images", file);
    });

    try {
      setUploadingImages(true);

      const response = await api.post(
        "/upload/images",
        form
      );

      const uploadedImages =
        response.data.data.images;

      if (!uploadedImages || !Array.isArray(uploadedImages)) {
        throw new Error(
          "Invalid image upload response"
        );
      }

      return uploadedImages.map(
        (image: {
          imageUrl: string;
          publicId: string;
        }) => image.imageUrl
      );
    } catch (error) {
      console.error(
        "Image upload failed:",
        error
      );

      throw new Error(
        "Failed to upload product images"
      );
    } finally {
      setUploadingImages(false);
    }
  };

  // =========================================================
  // Submit
  // =========================================================

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // -----------------------------------------------
    // Basic validation
    // -----------------------------------------------

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

    if (
      formData.images.length +
        selectedImages.length >
      MAX_IMAGES
    ) {
      toast.error(
        `Maximum ${MAX_IMAGES} images are allowed`
      );

      return;
    }

    try {
      setLoading(true);

      // -----------------------------------------------
      // Upload newly selected images
      // -----------------------------------------------

      const uploadedImageUrls =
        await uploadImages();

      // -----------------------------------------------
      // Combine existing + newly uploaded images
      // -----------------------------------------------

      const finalImages = [
        ...formData.images,
        ...uploadedImageUrls,
      ];

      // -----------------------------------------------
      // Final product data
      // -----------------------------------------------

      const productData: ProductFormData = {
        ...formData,
        images: finalImages,
      };

      // -----------------------------------------------
      // Create / Update Product
      // -----------------------------------------------

      if (isEdit && productId) {
        await api.patch(
          `/admin/products/${productId}`,
          productData
        );

        toast.success(
          "Product updated successfully"
        );
      } else {
        await api.post(
          "/admin/products/create",
          productData
        );

        toast.success(
          "Product created successfully"
        );
      }

      // -----------------------------------------------
      // Reset upload state
      // -----------------------------------------------

      setSelectedImages([]);
      setPreviewImages([]);

      // -----------------------------------------------
      // Redirect
      // -----------------------------------------------

      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error(
        "Product operation failed:",
        error
      );

      toast.error(
        isEdit
          ? "Failed to update product"
          : "Failed to create product"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // Render
  // =========================================================

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* =================================================
          Product Name
      ================================================= */}

      <div className="space-y-2">
        <Label htmlFor="name">
          Product Name
        </Label>

        <Input
          id="name"
          type="text"
          name="name"
          placeholder="e.g. Wireless Headphones"
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      {/* =================================================
          Description
      ================================================= */}

      <div className="space-y-2">
        <Label htmlFor="description">
          Description
        </Label>

        <Textarea
          id="description"
          name="description"
          placeholder="Describe the product..."
          value={formData.description}
          onChange={handleChange}
          rows={5}
          disabled={loading}
        />
      </div>

      {/* =================================================
          Price & Stock
      ================================================= */}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="price">
            Price (₹)
          </Label>

          <Input
            id="price"
            type="number"
            name="price"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={formData.price}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stock">
            Stock
          </Label>

          <Input
            id="stock"
            type="number"
            name="stock"
            min="0"
            placeholder="0"
            value={formData.stock}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
      </div>

      {/* =================================================
          Category
      ================================================= */}

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
          disabled={loading}
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

      {/* =================================================
          Image Upload
      ================================================= */}

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="images">
            Product Images
          </Label>

          <span className="text-sm text-muted-foreground">
            {formData.images.length +
              selectedImages.length}
            /{MAX_IMAGES}
          </span>
        </div>

        <div className="relative">
          <Upload className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            id="images"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleFileChange}
            disabled={
              loading ||
              uploadingImages ||
              formData.images.length +
                selectedImages.length >=
                MAX_IMAGES
            }
            className="pl-9"
          />
        </div>

        <p className="text-xs text-muted-foreground">
          JPG, PNG or WEBP • Maximum 5MB per image •
          Maximum {MAX_IMAGES} images
        </p>

        {uploadingImages && (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            Uploading images...
          </p>
        )}
      </div>

      {/* =================================================
          Existing Image Previews
      ================================================= */}

      {formData.images.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">
            Existing Images
          </p>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {formData.images.map(
              (image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="group relative aspect-square overflow-hidden rounded-lg border"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt={`Product image ${
                      index + 1
                    }`}
                    className="size-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveExistingImage(
                        index
                      )
                    }
                    disabled={loading}
                    aria-label="Remove image"
                    className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-destructive text-white opacity-90 transition-opacity hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <X className="size-4" />
                  </button>

                  {index === 0 && (
                    <span className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
                      Primary
                    </span>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* =================================================
          New Image Previews
      ================================================= */}

      {previewImages.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">
            New Images
          </p>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {previewImages.map(
              (preview, index) => (
                <div
                  key={`${preview}-${index}`}
                  className="group relative aspect-square overflow-hidden rounded-lg border"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview}
                    alt={`Selected image ${
                      index + 1
                    }`}
                    className="size-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveSelectedImage(
                        index
                      )
                    }
                    disabled={loading}
                    aria-label="Remove selected image"
                    className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-destructive text-white opacity-90 transition-opacity hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* =================================================
          Submit
      ================================================= */}

      <Button
        type="submit"
        disabled={
          loading ||
          uploadingImages
        }
        className="w-full sm:w-auto"
      >
        {(loading || uploadingImages) && (
          <Loader2 className="size-4 animate-spin" />
        )}

        {uploadingImages
          ? "Uploading Images..."
          : loading
          ? "Saving..."
          : isEdit
          ? "Update Product"
          : "Create Product"}
      </Button>
    </form>
  );
}