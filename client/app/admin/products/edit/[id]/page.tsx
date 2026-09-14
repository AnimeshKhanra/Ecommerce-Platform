// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import api from "@/lib/axios";
// import ProductForm from "@/components/admin/ProductForm";
// import {
//   Product,
//   ProductFormData,
// } from "@/types/product.types";

// export default function EditProductPage() {
//   const params = useParams();
//   const id = params.id as string;

//   const [loading, setLoading] = useState(true);
//   const [productData, setProductData] =
//     useState<ProductFormData | null>(null);

//   useEffect(() => {
//     fetchProduct();
//   }, [id]);

//   async function fetchProduct() {
//     try {
//       const res = await api.get(
//         `/products/${id}`
//       );

//       const product: Product =
//         res.data.data;

//       setProductData({
//         name: product.name,
//         description:
//           product.description || "",
//         price: product.price,
//         stock: product.stock,
//         categoryId:
//           product.categoryId,
//         images: product.images || [],
//       });
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   if (loading) {
//     return (
//       <div className="max-w-4xl mx-auto px-6 py-10">
//         <div className="h-96 bg-slate-200 animate-pulse rounded-2xl" />
//       </div>
//     );
//   }

//   if (!productData) {
//     return (
//       <div className="text-center py-20">
//         Product not found
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-6 py-10">
//       <h1 className="text-3xl font-bold mb-8">
//         Edit Product
//       </h1>

//       <ProductForm
//         initialData={productData}
//         productId={id}
//         isEdit={true}
//       />
//     </div>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Package,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";

import api from "@/lib/axios";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import ProductForm from "@/components/admin/ProductForm";
import {
  Product,
  ProductFormData,
} from "@/types/product.types";

export default function EditProductPage() {
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [productData, setProductData] =
    useState<ProductFormData | null>(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  async function fetchProduct() {
    try {
      const res = await api.get(`/products/${id}`);

      const product: Product = res.data.data;

      setProductData({
        name: product.name,
        description: product.description || "",
        price: product.price,
        stock: product.stock,
        categoryId: product.categoryId,
        images: product.images || [],
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  }

  // Loading skeleton
  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
        <Skeleton className="mb-6 h-8 w-40" />
        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-4 w-72" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-10 w-32" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Product not found
  if (!productData) {
    return (
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-20">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="size-4" />
          <AlertTitle>Product not found</AlertTitle>
          <AlertDescription>
            The product you are trying to edit does not exist
            or could not be loaded.
          </AlertDescription>
        </Alert>

        <Link
          href="/admin/products"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "gap-2"
          )}
        >
          <ArrowLeft className="size-4" />
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
      {/* Back link */}
      <Link
        href="/admin/products"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "mb-6 gap-2 pl-0 text-muted-foreground hover:text-foreground"
        )}
      >
        <ArrowLeft className="size-4" />
        Back to Products
      </Link>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <Package className="size-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">
                Edit Product
              </CardTitle>
              <CardDescription>
                Update the details of this product
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <ProductForm
            initialData={productData}
            productId={id}
            isEdit={true}
          />
        </CardContent>
      </Card>
    </div>
  );
}