// "use client";

// import { useEffect, useState } from "react";
// import api from "@/lib/axios";
// import Link from "next/link";
// import { Product } from "@/types/product.types";
// import ProductTable from "@/components/admin/ProductTable";
// import EmptyState from "@/components/common/EmptyState";

// export default function AdminProductsPage() {
//   const [products, setProducts] = useState<
//     Product[]
//   >([]);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   async function fetchProducts() {
//     try {
//       const res = await api.get("/products");

//       setProducts(res.data.data.products);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   async function handleDelete(id: string) {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this product?"
//     );

//     if (!confirmed) return;

//     try {
//       await api.delete(`/products/${id}`);

//       setProducts((prev) =>
//         prev.filter((p) => p.id !== id)
//       );
//     } catch (error) {
//       console.error(error);
//     }
//   }


//   if (!products.length) {
//     return (
//       <EmptyState
//         title="No Products"
//         description="Start by creating your first product."
//         buttonText="Create Product"
//         buttonLink="/admin/products/create"
//       />
//     );
//   }


//   return (
//     <div className="max-w-7xl mx-auto px-6 py-10">
//       <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center mb-8">
//         <h1 className="text-3xl font-bold">
//           Admin Products
//         </h1>

//         <Link
//           href="/admin/products/create"
//           className="bg-indigo-600 text-white px-6 py-3 rounded-xl"
//         >
//           Add Product
//         </Link>
//       </div>

//       <ProductTable
//         products={products}
//         onDelete={handleDelete}
//       />
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Package } from "lucide-react";
import toast from "react-hot-toast";

import api from "@/lib/axios";
import { Product } from "@/types/product.types";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import ProductTable from "@/components/admin/ProductTable";
import EmptyState from "@/components/common/EmptyState";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await api.get("/products");
      setProducts(res.data.data.products);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load products");
    }
  }

  function handleDelete(id: string) {
    setProductToDelete(id); // open confirmation dialog
  }

  async function confirmDelete() {
    if (!productToDelete) return;

    try {
      await api.delete(`/products/${productToDelete}`);
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete));
      toast.success("Product deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
    } finally {
      setProductToDelete(null);
    }
  }

  if (!products.length) {
    return (
      <EmptyState
        title="No Products"
        description="Start by creating your first product."
        buttonText="Create Product"
        buttonLink="/admin/products/create"
      />
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <Package className="size-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">Products</CardTitle>
              <CardDescription>
                Manage your store inventory
              </CardDescription>
            </div>
            <Badge variant="secondary" className="ml-1">
              {products.length}
            </Badge>
          </div>

          <Link
            href="/admin/products/create"
            className={cn(buttonVariants(), "gap-2")}
          >
            <Plus className="size-4" />
            Add Product
          </Link>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6">
          <ProductTable
            products={products}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      {/* Delete confirmation */}
      <AlertDialog
        open={!!productToDelete}
        onOpenChange={(open) => !open && setProductToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete product?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove
              the product from your store.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}