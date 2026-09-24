"use client";

import { useEffect, useState, useCallback } from "react";
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
import { adminProductsService } from "@/services/product.service";
import {
  getAllProducts,
  deleteProductService,
} from "@/services/product.service";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);


  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await adminProductsService();
      setProducts(response.products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);


  function handleDelete(id: string) {
    setProductToDelete(id); // open confirmation dialog
  }

  async function confirmDelete() {
    if (!productToDelete) return;

    try {
      await deleteProductService(productToDelete);
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete));
      toast.success("Product deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
    } finally {
      setProductToDelete(null);
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10">
        <p>Loading products...</p>
      </div>
    );
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

  // if (products.length === 0) {
  //   return (
  //     <EmptyState
  //       title="No products found"
  //       description="Start by creating your first product."
  //       action={
  //         <Link href="/admin/products/create">
  //           Add Product
  //         </Link>
  //       }
  //     />
  //   );
  // }

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