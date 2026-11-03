# Frontend Codebase
This file contains the consolidated codebase for the client. Excludes node_modules, .next, and media assets.

## Directory Structure

```text
client/
├── app                                               # Next.js App Router (pages, layouts, route handlers)
│   ├── admin                                         # Admin dashboard and management pages
│   │   ├── dashboard
│   │   │   └── page.tsx
│   │   ├── orders
│   │   │   └── page.tsx
│   │   └── products
│   │       ├── create
│   │       │   └── page.tsx
│   │       ├── edit
│   │       │   └── [id]
│   │       │       └── page.tsx
│   │       └── page.tsx
│   ├── cart
│   │   └── page.tsx
│   ├── checkout
│   │   ├── cancel
│   │   │   └── page.tsx
│   │   ├── success
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── contact
│   │   └── page.tsx
│   ├── dashboard
│   │   └── page.tsx
│   ├── login
│   │   └── page.tsx
│   ├── orders
│   │   ├── [id]
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── privacy
│   │   └── page.tsx
│   ├── products
│   │   ├── [id]
│   │   │   ├── page.tsx
│   │   │   └── ProductDetail.tsx
│   │   └── page.tsx
│   ├── profile
│   │   └── page.tsx
│   ├── register
│   │   └── page.tsx
│   ├── returns
│   │   └── page.tsx
│   ├── shipping
│   │   └── page.tsx
│   ├── terms
│   │   └── page.tsx
│   ├── test-products
│   │   └── page.tsx
│   ├── error.tsx
│   ├── globals.css                                   # Global styles and Tailwind CSS imports
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components                                        # Reusable React UI components
│   ├── admin                                         # Admin dashboard and management components
│   │   ├── LowStockAlert.tsx
│   │   ├── ProductForm.tsx
│   │   ├── ProductTable.tsx
│   │   ├── RecentOrdersTable.tsx
│   │   ├── RevenueChart.tsx
│   │   └── StatsCard.tsx
│   ├── auth                                          # Authentication forms and route guard components
│   │   ├── LoginForm.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── RegisterForm.tsx
│   ├── cart                                          # Shopping cart UI components
│   │   ├── CartItem.tsx
│   │   └── OrderSummary.tsx
│   ├── checkout                                      # Checkout form components
│   │   └── ShippingForm.tsx
│   ├── common                                        # Common reusable UI elements
│   │   └── EmptyState.tsx
│   ├── home                                          # Home/landing page section components
│   │   ├── FeaturedCategories.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── HeroSection.tsx
│   │   ├── NewArrivals.tsx
│   │   └── WhyChooseUs.tsx
│   ├── orders                                        # Order tracking and administration components
│   │   ├── AdminOrderTable.tsx
│   │   ├── OrderCard.tsx
│   │   ├── OrderItem.tsx
│   │   └── OrderStatusBadge.tsx
│   ├── reviews                                       # Product reviews and rating components
│   │   ├── ReviewCard.tsx
│   │   ├── ReviewForm.tsx
│   │   ├── ReviewSection.tsx
│   │   └── StarRating.tsx
│   ├── ui                                            # Radix / Shadcn UI primitive components
│   │   ├── alert-dialog.tsx
│   │   ├── alert.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── skeleton.tsx
│   │   └── textarea.tsx
│   ├── AddToCartButton.tsx
│   ├── FilterSidebar.tsx
│   ├── Footer.tsx
│   ├── ImageGallery.tsx
│   ├── Navbar.tsx
│   ├── Pagination.tsx
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   ├── RelatedProducts.tsx
│   ├── SearchBar.tsx
│   ├── SortDropdown.tsx
│   └── StockIndicator.tsx
├── hooks                                             # Custom React hooks
│   └── useDebounce.ts
├── lib                                               # API client instances and utility functions
│   ├── axios.ts
│   ├── cartApi.ts
│   ├── checkoutApi.ts
│   ├── paymentApi.ts
│   ├── reviewApi.ts
│   └── utils.ts
├── services                                          # API service integration layer
│   ├── category.service.ts
│   ├── home.service.ts
│   ├── order.service.ts
│   ├── product.service.ts
│   └── review.service.ts
├── store                                             # Client-side Zustand state stores
│   ├── auth.store.ts
│   └── cartStore.ts
├── types                                             # TypeScript type and interface definitions
│   ├── admin.ts
│   ├── auth.types.ts
│   ├── cart.types.ts
│   ├── checkout.types.ts
│   ├── home.types.ts
│   ├── order.types.ts
│   ├── product.types.ts
│   └── review.types.ts
├── .env.local                                        # Local environment variables configuration
├── .gitignore                                        # Git ignore rules
├── components.json                                   # Shadcn UI component configuration
├── eslint.config.mjs                                 # ESLint configuration
├── next-env.d.ts                                     # Next.js TypeScript declarations
├── next.config.ts                                    # Next.js configuration
├── package.json                                      # Project dependencies and scripts
├── postcss.config.mjs                                # PostCSS configuration
└── tsconfig.json                                     # TypeScript compiler options
```

## File: client/.env.local
```env
# NEXT_PUBLIC_API_URL=http://localhost:5000/api

NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

## File: client/.gitignore
```gitignore
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

## File: client/app/admin/dashboard/page.tsx
```typescript
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Package, Store } from 'lucide-react';

import api from '@/lib/axios';
import { buttonVariants } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import StatsCard from '@/components/admin/StatsCard';
import RevenueChart from '@/components/admin/RevenueChart';
import RecentOrdersTable from '@/components/admin/RecentOrdersTable';
import LowStockAlert from '@/components/admin/LowStockAlert';

export default function DashboardPage() {
  const [stats, setStats] = useState<any>();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get('/admin/stats');
      setStats(res.data.data);
    } catch (error) {
      console.error('Failed to fetch admin stats:', error);
    }
  };

  // Loading skeleton
  if (!stats) {
    return (
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 md:px-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-56" />
            <Skeleton className="h-4 w-72" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>

        <Skeleton className="h-80 w-full" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 md:px-6">
      {/* Header — Orders link on the right */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
            <LayoutDashboard className="size-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Admin Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Overview of your store&apos;s performance
            </p>
          </div>
        </div>

        <div className='flex items-center gap-6'>
        <Link
          href="/admin/orders"
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'gap-2 self-start sm:self-auto',
            'hover:bg-primary hover:text-primary-foreground'
          )}
        >
          <Package className="size-4" />
          View Orders
        </Link>
        <Link
          href="/admin/products"
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'gap-2 self-start sm:self-auto',
            'hover:bg-primary hover:text-primary-foreground'
          )}
        >
          <Store className="size-4" />
          View Products
        </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Sales" value={`₹${stats.totalSales}`} />
        <StatsCard title="Orders" value={stats.totalOrders} />
        <StatsCard title="Users" value={stats.totalUsers} />
        <StatsCard title="Products" value={stats.totalProducts} />
      </div>

      {/* Revenue chart */}
      <RevenueChart data={stats.revenueByMonth} />

      {/* Alerts + recent orders side by side */}
      <div className="grid items-start gap-6 lg:grid-cols-2">
        <LowStockAlert products={stats.lowStockProducts} />
        <RecentOrdersTable orders={stats.recentOrders} />
      </div>
    </div>
  );
}
```

## File: client/app/admin/orders/page.tsx
```typescript
// "use client";

// import { useEffect, useState } from "react";
// import api from "@/lib/axios";
// import { Order } from "@/types/order";
// import AdminOrderTable from "@/components/orders/AdminOrderTable";
// import EmptyState from "@/components/common/EmptyState";


// export default function AdminOrdersPage() {
//   const [orders, setOrders] = useState<Order[]>([]);

//   const fetchOrders = async () => {
//     const res = await api.get("/admin/orders");

//     setOrders(res.data.data);
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);


// if (!orders.length) {
//   return (
//     <EmptyState
//       title="No Orders"
//       description="No customer orders found."
//     />
//   );
// }


//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">
//         Order Management
//       </h1>

//       <AdminOrderTable
//         orders={orders}
//         refreshOrders={fetchOrders}
//       />
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { ClipboardList } from "lucide-react";
import toast from "react-hot-toast";

import api from "@/lib/axios";
import { Order } from "@/types/order.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import AdminOrderTable from "@/components/orders/AdminOrderTable";
import EmptyState from "@/components/common/EmptyState";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/admin/orders");
      setOrders(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Loading skeleton
  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <Skeleton className="mb-6 h-8 w-56" />
        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // No orders yet
  if (!orders.length) {
    return (
      <EmptyState
        title="No Orders"
        description="No customer orders found."
      />
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <ClipboardList className="size-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">Order Management</CardTitle>
              <CardDescription>
                View and manage customer orders
              </CardDescription>
            </div>
            <Badge variant="secondary" className="ml-1">
              {orders.length}
            </Badge>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6">
          <AdminOrderTable
            orders={orders}
            refreshOrders={fetchOrders}
          />
        </CardContent>
      </Card>
    </div>
  );
}
```

## File: client/app/admin/products/create/page.tsx
```typescript
// import ProductForm from "@/components/admin/ProductForm";

// export default function CreateProductPage() {
//   return (
//     <div className="max-w-4xl mx-auto px-6 py-10">
//       <h1 className="text-3xl font-bold mb-8">
//         Add Product
//       </h1>

//       <ProductForm />
//     </div>
//   );
// }





import Link from "next/link";
import { ArrowLeft, PackagePlus } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ProductForm from "@/components/admin/ProductForm";

export default function CreateProductPage() {
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
              <PackagePlus className="size-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">Add Product</CardTitle>
              <CardDescription>
                Create a new product for your store
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <ProductForm />
        </CardContent>
      </Card>
    </div>
  );
}
```

## File: client/app/admin/products/edit/[id]/page.tsx
```typescript
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
      const res = await api.get(`/admin/products/${id}`);
      const product: Product = res.data.data;

      setProductData({
        name: product.name,
        description: product.description || "",
        price: Number(product.price),
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
```

## File: client/app/admin/products/page.tsx
```typescript
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
```

## File: client/app/cart/page.tsx
```typescript
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, ArrowRight } from "lucide-react";

import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";
import { useCartStore } from "@/store/cartStore";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function CartPage() {
    const { cartItems, fetchCart, loading } = useCartStore();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            fetchCart();
        }
    }, [fetchCart]);

    // Loading skeleton
    if (loading) {
        return (
            <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 md:px-6">
                <div className="flex items-center gap-3">
                    <Skeleton className="size-10 rounded-lg" />
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-56" />
                        <Skeleton className="h-4 w-40" />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="space-y-4 lg:col-span-2">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton key={i} className="h-28 w-full" />
                        ))}
                    </div>
                    <Skeleton className="h-64 w-full" />
                </div>
            </div>
        );
    }

    // Empty cart
    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-4 text-center">
                <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
                    <ShoppingCart className="size-8 text-muted-foreground" />
                </div>

                <h1 className="mb-2 text-2xl font-bold tracking-tight md:text-3xl">
                    Your cart is empty
                </h1>

                <p className="mb-6 text-sm text-muted-foreground">
                    Looks like you haven&apos;t added anything yet.
                </p>

                <Link
                    href="/products"
                    className={cn(buttonVariants(), "gap-2")}
                >
                    Continue Shopping
                    <ArrowRight className="size-4" />
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
            {/* Header */}
            <div className="mb-8 flex items-center gap-3">
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                            Shopping Cart
                        </h1>
                        <Badge variant="secondary">
                            {cartItems.length}{" "}
                            {cartItems.length === 1 ? "item" : "items"}
                        </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Review your items before checkout
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Cart Items */}
                <div className="space-y-4 lg:col-span-2">
                    {cartItems.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </div>

                {/* Summary */}
                <aside className="lg:sticky lg:top-24 lg:self-start">
                    <OrderSummary />
                </aside>
            </div>
        </div>
    );
}
```

## File: client/app/checkout/cancel/page.tsx
```typescript
import Link from "next/link";

export default function CancelPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="bg-white border rounded-2xl p-10 shadow-sm text-center">
                <h1 className="text-4xl font-bold text-red-500 mb-4">
                    Payment Cancelled
                </h1>

                <p className="text-gray-600 mb-8">
                    Your payment was cancelled.
                    You can try again anytime.
                </p>

                <div className="flex gap-4 justify-center">
                    <Link
                        href="/cart"
                        className="bg-black text-white px-6 py-3 rounded-xl"
                    >
                        Back to Cart
                    </Link>

                    <Link
                        href="/checkout"
                        className="border px-6 py-3 rounded-xl"
                    >
                        Retry Payment
                    </Link>
                </div>
            </div>
        </div>
    );
}
```

## File: client/app/checkout/page.tsx
```typescript
"use client";

import ShippingForm from "@/components/checkout/ShippingForm";
import { useCartStore } from "@/store/cartStore";
import { useEffect } from "react";

export default function CheckoutPage() {
  const { cartItems, fetchCart, subtotal } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const shipping = subtotal() > 1000 ? 0 : 99;
  const total = subtotal() + shipping;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">
        Checkout
      </h1>

      <div className="grid lg:grid-cols-2 gap-10">
        <ShippingForm />

        <div className="bg-white rounded-2xl border p-6 shadow-sm h-fit">
          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between"
              >
                <span>
                  {item.product.name} × {item.quantity}
                </span>

                <span>
                  ₹
                  {Number(item.product.price) *
                    item.quantity}
                </span>
              </div>
            ))}

            <hr />

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal()}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>
                {shipping === 0
                  ? "FREE"
                  : `₹${shipping}`}
              </span>
            </div>

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## File: client/app/checkout/success/page.tsx
```typescript
// "use client";

// import { useEffect, useState } from "react";
// import { getLatestOrder } from "@/lib/paymentApi";
// import { useCartStore } from "@/store/cartStore";
// import Link from "next/link";

// export default function SuccessPage() {
//   const [order, setOrder] = useState<any>(null);
//   const fetchCart = useCartStore((state) => state.fetchCart);

//   const [loading, setLoading] =
//     useState(true);

//   useEffect(() => {
//     fetchCart();
//   }, [fetchCart]);

//   useEffect(() => {
//     pollOrder();
//   }, []);

//   async function pollOrder() {
//     let attempts = 0;

//     while (attempts < 10) {
//       try {
//         const data =
//           await getLatestOrder();

//         if (data) {
//           setOrder(data);
//           setLoading(false);
//           return;
//         }
//       } catch {}

//       attempts++;
//       await new Promise((resolve) =>
//         setTimeout(resolve, 2000)
//       );
//     }

//     setLoading(false);
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Confirming your payment...
//       </div>
//     );
//   }

//   if (!order) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center gap-4">
//         <p>Order confirmation delayed.</p>

//         <Link
//           href="/products"
//           className="bg-black text-white px-6 py-3 rounded-xl"
//         >
//           Continue Shopping
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-6 py-12">
//       <div className="bg-white border rounded-2xl p-8 shadow-sm">
//         <h1 className="text-4xl font-bold text-green-600 mb-4">
//           Payment Successful 🎉
//         </h1>

//         <p className="mb-8 text-gray-600">
//           Your order has been confirmed.
//         </p>

//         <div className="space-y-4">
//           <p>
//             <strong>Order ID:</strong>{" "}
//             {order.id}
//           </p>

//           <p>
//             <strong>Total:</strong> ₹
//             {order.totalAmount}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { getLatestOrder } from "@/lib/paymentApi";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";

interface Order {
  id: string;
  totalAmount: number | string;
}

export default function SuccessPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = useCartStore((state) => state.fetchCart);

  useEffect(() => {
    const confirmOrder = async () => {
      let attempts = 0;

      while (attempts < 10) {
        try {
          const data = await getLatestOrder();

          if (data) {
            // Webhook has created the order,
            // so the cart should already be cleared in DB.
            setOrder(data);

            // Refresh Zustand cart state
            await fetchCart();

            setLoading(false);
            return;
          }
        } catch (error) {
          console.error("Waiting for order confirmation:", error);
        }

        attempts++;

        await new Promise((resolve) =>
          setTimeout(resolve, 2000)
        );
      }

      setLoading(false);
    };

    confirmOrder();
  }, [fetchCart]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Confirming your payment...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p>Order confirmation delayed.</p>

        <Link
          href="/products"
          className="bg-black text-white px-6 py-3 rounded-xl"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="bg-white border rounded-2xl p-8 shadow-sm">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Payment Successful 🎉
        </h1>

        <p className="mb-8 text-gray-600">
          Your order has been confirmed.
        </p>

        <div className="space-y-4">
          <p>
            <strong>Order ID:</strong>{" "}
            {order.id}
          </p>

          <p>
            <strong>Total:</strong> ₹
            {order.totalAmount}
          </p>
        </div>
      </div>
    </div>
  );
}
```

## File: client/app/contact/page.tsx
```typescript

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-4 text-3xl font-bold">
        Contact Us
      </h1>

      <p className="mb-8 text-gray-600">
        Have a question about your order or a product?
        We are here to help.
      </p>

      <div className="space-y-6 rounded-lg border p-6">
        <div>
          <h2 className="font-semibold">Email Support</h2>
          <p className="mt-1 text-gray-600">
            Send us an email for assistance with your order.
          </p>
          <a
            href="mailto:support@yourstore.com"
            className="text-blue-600 hover:underline"
          >
            support@yourstore.com
          </a>
        </div>

        <div>
          <h2 className="font-semibold">Order Assistance</h2>
          <p className="mt-1 text-gray-600">
            Please include your order number when contacting
            us about an existing order.
          </p>
        </div>

        <div>
          <h2 className="font-semibold">Response Time</h2>
          <p className="mt-1 text-gray-600">
            We aim to respond to customer inquiries as soon
            as possible during business days.
          </p>
        </div>
      </div>
    </main>
  );
}
```

## File: client/app/dashboard/page.tsx
```typescript
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex items-center justify-center">
        Dashboard Protected Page
      </div>
    </ProtectedRoute>
  );
}
```

## File: client/app/error.tsx
```typescript
"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="flex min-h-[60vh] items-center justify-center px-6">
            <div className="max-w-md text-center">
                <h1 className="text-3xl font-bold text-gray-900">
                    Something went wrong
                </h1>

                <p className="mt-4 text-gray-600">
                    We couldn't load the store right now.
                    Please try again.
                </p>

                <button
                    type="button"
                    onClick={() => reset()}
                    className="mt-8 rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                    Try Again
                </button>
            </div>
        </main>
    );
}
```

## File: client/app/globals.css
```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

html,
body {
  min-height: 100%;
  background: #f8fafc;
  color: #0f172a;
}

* {
  box-sizing: border-box;
}

@theme inline {
  --font-heading: var(--font-sans);
  --font-sans: var(--font-sans);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --color-foreground: var(--foreground);
  --color-background: var(--background);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.87 0 0);
  --chart-2: oklch(0.556 0 0);
  --chart-3: oklch(0.439 0 0);
  --chart-4: oklch(0.371 0 0);
  --chart-5: oklch(0.269 0 0);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.87 0 0);
  --chart-2: oklch(0.556 0 0);
  --chart-3: oklch(0.439 0 0);
  --chart-4: oklch(0.371 0 0);
  --chart-5: oklch(0.269 0 0);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
  html {
    @apply font-sans;
  }
}
```

## File: client/app/layout.tsx
```typescript
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ShopHub",
    template: "%s | ShopHub",
  },

  description:
    "Modern e-commerce platform built with Next.js, Prisma, Redis, and Stripe.",
  
  keywords: [
    "ecommerce",
    "online shopping",
    "nextjs store",
    "shophub",
    "electronics",
    "fashion",
  ],

  metadataBase: new URL("https://yourdomain.com"),

  openGraph: {
    title: "ShopHub",
    description:
      "Modern e-commerce platform built with Next.js and Stripe.",
    url: "https://yourdomain.com",
    siteName: "ShopHub",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ShopHub",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "ShopHub",
    description:
      "Modern e-commerce platform built with Next.js and Stripe.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
          }}
        />
        
        <main className="flex-1">
          {children}
        </main>

        <Footer/>
      </body>

    </html>
  );
}
```

## File: client/app/loading.tsx
```typescript
export default function Loading() {
    return (
        <main>
            {/* Hero Skeleton */}
            <section className="animate-pulse bg-gray-100">
                <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
                    <div className="h-5 w-40 rounded bg-gray-300" />

                    <div className="mt-6 h-12 max-w-2xl rounded bg-gray-300" />

                    <div className="mt-4 h-6 max-w-xl rounded bg-gray-300" />

                    <div className="mt-8 h-12 w-32 rounded bg-gray-300" />
                </div>
            </section>

            {/* Categories Skeleton */}
            <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="mb-8">
                    <div className="h-8 w-52 animate-pulse rounded bg-gray-200" />
                    <div className="mt-3 h-5 w-72 animate-pulse rounded bg-gray-200" />
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-24 animate-pulse rounded-xl bg-gray-200"
                        />
                    ))}
                </div>
            </section>

            {/* Products Skeleton */}
            <section className="bg-gray-50">
                <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                    <div className="mb-8">
                        <div className="h-8 w-56 animate-pulse rounded bg-gray-200" />
                        <div className="mt-3 h-5 w-72 animate-pulse rounded bg-gray-200" />
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-80 animate-pulse rounded-xl bg-gray-200"
                            />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
```

## File: client/app/login/page.tsx
```typescript
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
```

## File: client/app/not-found.tsx
```typescript
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="text-center">
                <h1 className="text-8xl font-bold text-indigo-600">
                    404
                </h1>

                <h2 className="text-3xl font-bold mt-4">
                    Page Not Found
                </h2>

                <p className="text-slate-500 mt-4">
                    The page you're looking for doesn't exist.
                </p>

                <Link
                    href="/"
                    className="inline-block mt-8 bg-indigo-600 text-white px-6 py-3 rounded-xl"
                >
                    Back Home
                </Link>
            </div>
        </div>
    );
}
```

## File: client/app/orders/[id]/page.tsx
```typescript
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  MapPin,
  CreditCard,
  Package,
  AlertCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';

import api from '@/lib/axios';
import { Order } from '@/types/order.types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import OrderStatusBadge from '@/components/orders/OrderStatusBadge';

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const res = await api.get(`/orders/${orderId}`);
      setOrder(res.data.data);
    } catch (error) {
      console.error('Failed to fetch order:', error);
      toast.error('Failed to load order');
    } finally {
      setLoading(false);
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 md:px-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-28 w-full" />
        <div className="grid gap-6 lg:grid-cols-3">
          <Skeleton className="h-72 lg:col-span-2" />
          <Skeleton className="h-72" />
        </div>
      </div>
    );
  }

  // Order not found
  if (!order) {
    return (
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-20">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="size-4" />
          <AlertTitle>Order not found</AlertTitle>
          <AlertDescription>
            This order does not exist or could not be loaded.
          </AlertDescription>
        </Alert>

        <Link
          href="/orders"
          className={cn(buttonVariants({ variant: 'outline' }), 'gap-2')}
        >
          <ArrowLeft className="size-4" />
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      {/* Back link */}
      <Link
        href="/orders"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'mb-6 gap-2 pl-0 text-muted-foreground hover:text-foreground'
        )}
      >
        <ArrowLeft className="size-4" />
        Back to Orders
      </Link>

      {/* Order header */}
      <Card className="mb-6">
        <CardContent className="flex flex-wrap items-center justify-between gap-4 p-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <Package className="size-5 text-primary" />
            </div>
            <div>
              <p className="font-mono text-sm font-semibold tracking-wide">
                #{order.id.slice(-6).toUpperCase()}
              </p>
              <p className="text-sm text-muted-foreground">
                Placed on{' '}
                {new Date(order.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>

          <OrderStatusBadge status={order.status} />
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Items */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Items</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="divide-y">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    {item.productImage ? (
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-muted">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          loading="lazy"
                          className="size-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex size-16 shrink-0 items-center justify-center rounded-md bg-muted">
                        <Package className="size-6 text-muted-foreground" />
                      </div>
                    )}

                    <div className="flex-1">
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold tabular-nums">
                      ₹
                      {(
                        Number(item.price) * item.quantity
                      ).toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Shipping address */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-muted-foreground" />
                <CardTitle className="text-lg">Shipping Address</CardTitle>
              </div>
            </CardHeader>

            <CardContent className="space-y-1 text-sm">
              <p className="font-medium">Name: {order.shippingName}</p>
              <p className="text-muted-foreground">
                Mobile No: {order.shippingPhone}
              </p>
              <p className="pt-1">Address Line1: {order.shippingAddress1}</p>
              {order.shippingAddress2 && <p>Address Line2: {order.shippingAddress2}</p>}
              <p>Address: 
                {order.shippingCity}, {order.shippingState}{' '}
                {order.shippingPostalCode}
              </p>
              <p>Country: {order.shippingCountry}</p>
            </CardContent>
          </Card>
        </div>

        {/* Right column — payment summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CreditCard className="size-4 text-muted-foreground" />
                <CardTitle className="text-lg">Payment</CardTitle>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="secondary">
                  {order.paymentStatus}
                </Badge>
              </div>

              <Separator />

              <div className="flex items-baseline justify-between">
                <span className="font-medium">Total</span>
                <span className="text-xl font-bold tabular-nums">
                  ₹
                  {Number(order.totalAmount).toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
```

## File: client/app/orders/page.tsx
```typescript
'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import api from '@/lib/axios';
import { Order } from '@/types/order.types';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import OrderCard from '@/components/orders/OrderCard';
import EmptyState from '@/components/common/EmptyState';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders');
      setOrders(res.data.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-10 md:px-6">
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>

        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  // No orders yet
  if (!orders.length) {
    return (
      <EmptyState
        title="No Orders Yet"
        description="You haven't placed any orders."
        buttonText="Shop Now"
        buttonLink="/products"
      />
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Order History
            </h1>
            <Badge variant="secondary">
              {orders.length}{' '}
              {orders.length === 1 ? 'order' : 'orders'}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Track and review your past purchases
          </p>
        </div>
      </div>

      {/* Orders */}
      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
```

## File: client/app/page.tsx
```typescript
import { getHomeData } from "@/services/home.service";

import HeroSection from "@/components/home/HeroSection";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import NewArrivals from "@/components/home/NewArrivals";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import type { Metadata } from "next";
// import { useEffect, useState } from "react";
// import { getAllProducts } from "@/services/product.service";



export const metadata: Metadata = {
    title: "Your Store | Shop Quality Products",
    description:
        "Discover quality products, new arrivals, and great shopping experiences.",
};

// const [selectedCategory, setselectedCategory] = useState("");

// useEffect(() => {
//   fetchProducts();
// }, [selectedCategory])

// async function fetchProducts(){
//     const data = await getAllProducts({
//         category: selectedCategory,
//     })
// }


export default async function HomePage() {
    const homeData = await getHomeData();

    return (
        <main>
            <HeroSection />

            <FeaturedCategories
                categories={homeData.featuredCategories}
                // selectedCategory={selectedCategory}
            />

            <FeaturedProducts
                products={homeData.featuredProducts}
            />

            <NewArrivals
                products={homeData.newArrivals}
            />

            <WhyChooseUs />
        </main>
    );
}
```

## File: client/app/privacy/page.tsx
```typescript

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-4 text-3xl font-bold">
        Privacy Policy
      </h1>

      <p className="mb-8 text-sm text-gray-500">
        Last updated: October 29, 2026
      </p>

      <p className="mb-8 leading-7 text-gray-600">
        Your privacy matters to us. This Privacy Policy
        explains how our store collects, uses, stores,
        and protects your personal information when you
        visit our website or make a purchase.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="mb-3 text-xl font-semibold">
            1. Information We Collect
          </h2>
          <p className="leading-7 text-gray-600">
            We may collect information such as your name,
            email address, phone number, shipping address,
            order details, and account information when
            you register, place an order, or contact us.
            Basic technical information may also be
            collected when you use our website.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc space-y-2 pl-6 text-gray-600">
            <li>To process and deliver your orders.</li>
            <li>To manage your account and shopping cart.</li>
            <li>To provide customer support.</li>
            <li>To process payments and refunds.</li>
            <li>To improve website security and performance.</li>
            <li>To comply with applicable legal obligations.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            3. Payments
          </h2>
          <p className="leading-7 text-gray-600">
            Payments may be processed by third-party
            payment providers. Payment information is
            handled according to the provider's applicable
            privacy and security practices. We do not
            intentionally store complete payment card
            details on our own servers.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            4. Sharing of Information
          </h2>
          <p className="leading-7 text-gray-600">
            We may share necessary information with
            delivery partners, payment providers, hosting
            services, and other service providers to
            operate our store. We may also disclose
            information when required by applicable law.
            We do not sell personal information as a
            business practice.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            5. Data Security and Retention
          </h2>
          <p className="leading-7 text-gray-600">
            We use reasonable technical and organizational
            measures to protect personal information.
            However, no online system can guarantee
            absolute security. We retain information for
            as long as necessary for legitimate business,
            security, and legal purposes.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            6. Cookies and Similar Technologies
          </h2>
          <p className="leading-7 text-gray-600">
            Our website may use cookies or similar
            technologies to maintain sessions, support
            shopping cart functionality, improve security,
            and understand website usage. You can manage
            cookies through your browser settings, though
            some features may not work properly if they
            are disabled.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            7. Your Privacy Rights
          </h2>
          <p className="leading-7 text-gray-600">
            Depending on applicable law, you may have
            rights to request access to, correction of,
            or deletion of your personal information.
            You may also have other rights under applicable
            data protection laws.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            8. Contact Us
          </h2>
          <p className="leading-7 text-gray-600">
            If you have questions about this Privacy Policy
            or how we handle your information, contact us
            at{" "}
            <a
              href="mailto:privacy@yourstore.com"
              className="text-blue-600 hover:underline"
            >
              privacy@yourstore.com
            </a>.
          </p>
        </section>
      </div>
    </main>
  );
}
```

## File: client/app/products/[id]/page.tsx
```typescript
// 'use client';

import { Metadata } from 'next';
import ProductDetail from './ProductDetail';


interface Props {
    params: Promise<{
        id: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
        { cache: "no-store", }
    );

    if (!response.ok) {
        return {
            title: "Product Not Found",
        };
    }

    const result = await response.json();
    console.log("result: "+ result)

    const product = result.data;

    // console.log(product)
    // console.log(product.name)

    return {
        title: product.name,
        description: product.description ?? undefined,
        openGraph: {
            title: product.name,
            description: product.description ?? undefined,
            images: product.images?.[0]
                ? [product.images[0]]
                : [],
        },
    }
}


export default async function ProductPage({
    params,
}: Props) {
    const { id } = await params;

    return <ProductDetail id={id} />;
}
```

## File: client/app/products/[id]/ProductDetail.tsx
```typescript
"use client";


import { useEffect, useState } from 'react';
import { getProductById } from '@/services/product.service';
import { Product } from '@/types/product.types';
import ImageGallery from '@/components/ImageGallery';
import StockIndicator from '@/components/StockIndicator';
import AddToCartButton from '@/components/AddToCartButton';
import RelatedProducts from '@/components/RelatedProducts';
import ReviewSection from '@/components/reviews/ReviewSection';
import Link from 'next/link';

interface ProductDetailProps {
    id: string;
}

export default function ProductDetail({ id }: ProductDetailProps) {

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    async function fetchProduct() {
        try {
            setLoading(true);
            const data = await getProductById(id);

            setProduct(data);
        } catch (error) {
            console.error('Failed to fetch product:', error);
            setError('Product not found');
        } finally {
            setLoading(false);
        }
    }

    // Loading
    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="grid md:grid-cols-2 gap-10">
                    <div className="h-[500px] bg-slate-200 animate-pulse rounded-2xl" />
                    <div className="space-y-4">
                        <div className="h-6 w-32 bg-slate-200 rounded" />
                        <div className="h-10 w-full bg-slate-200 rounded" />
                        <div className="h-24 w-full bg-slate-200 rounded" />
                        <div className="h-10 w-40 bg-slate-200 rounded" />
                    </div>
                </div>
            </div>
        );
    }

    // Error
    if (error || !product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">
                    Product not found
                </h1>
                <Link
                    href="/products"
                    className="mt-4 text-indigo-600"
                >
                    Back to Products
                </Link>
            </div>
        );
    }


    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="grid md:grid-cols-2 gap-10">
                <ImageGallery images={product.images} productName={product.name} />

                <div className="space-y-6">
                    <p className="text-indigo-600 font-semibold uppercase">
                        {product.category.name}
                    </p>

                    <h1 className="text-4xl font-bold text-slate-900">{product.name}</h1>

                    <p className="text-slate-600 leading-relaxed">
                        {product.description}
                    </p>

                    <p className="text-4xl font-bold text-slate-900">₹{product.price}</p>

                    <StockIndicator stock={product.stock} />

                    <AddToCartButton stock={product.stock} product={product} />
                </div>
            </div>

            <RelatedProducts
                categoryId={product.categoryId}
                currentProductId={product.id}
            />

            <ReviewSection productId={product.id} />
        </div>
    );
}
```

## File: client/app/products/page.tsx
```typescript
"use client";

import { useEffect, useState } from "react";
import { Category, Product } from "@/types/product.types";
import { useDebounce } from "@/hooks/useDebounce";
import { getAllProducts } from "@/services/product.service";
import { getAllCategories } from "@/services/category.service";

import SearchBar from "@/components/SearchBar";
import SortDropdown from "@/components/SortDropdown";
import FilterSidebar from "@/components/FilterSidebar";
import ProductGrid from "@/components/ProductGrid";
import Pagination from "@/components/Pagination";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Sorting
  const [sort, setSort] = useState("createdAt-desc");

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  // Fetch all operational categories once on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Trigger query refetch whenever parameters change
  useEffect(() => {
    fetchProducts();
  }, [debouncedSearch, selectedCategory, sort, minPrice, maxPrice, page]);

  async function fetchCategories() {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }

  async function fetchProducts() {
    setIsLoading(true);
    try {
      const [sortBy, order] = sort.split("-");

      const data = await getAllProducts({
        search: debouncedSearch,
        category: selectedCategory,
        minPrice,
        maxPrice,
        sortBy,
        order: order as "asc" | "desc",
        page,
        limit: 9,
      });

      setProducts(data.products);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Explicit handler mapping for the SortDropdown structure
  const handleSortChange = (sortByField: string, orderDirection: 'asc' | 'desc') => {
    setSort(`${sortByField}-${orderDirection}`);
    setPage(1); // Reset to first page on sort change
  };

  // Explicit handler mapping for the FilterSidebar multi-variable price adjustments
  const handlePriceChange = (min: string, max: string) => {
    setMinPrice(min);
    setMaxPrice(max);
    setPage(1); // Reset to first page on boundary change
  };

  // Reset helper passing clean defaults through sub-components
  const handleClearFilters = () => {
    setSelectedCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSearch("");
    setSort("createdAt-desc");
    setPage(1);
  };

  // Parsing individual sort variables out of standard string state for sub-components
  const [currentSortBy, currentOrder] = sort.split("-");


  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="h-[500px] bg-slate-200 animate-pulse rounded-2xl" />

          <div className="space-y-4">
            <div className="h-6 w-32 bg-slate-200 rounded" />
            <div className="h-10 w-full bg-slate-200 rounded" />
            <div className="h-24 w-full bg-slate-200 rounded" />
            <div className="h-10 w-40 bg-slate-200 rounded" />
            <div className="h-12 w-full bg-slate-200 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-slate-900">
            Discover Products
          </h1>

          <p className="mt-3 text-lg text-slate-600">
            Browse our latest collection with filters and search.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-72">
            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onCategoryChange={(id) => {
                setSelectedCategory(id);
                setPage(1);
              }}
              onPriceChange={handlePriceChange}
              onClearFilters={handleClearFilters}
            />
          </aside>

          <main className="flex-1">
            <div className="bg-white rounded-2xl p-4 shadow-sm border mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <SearchBar
                  value={search}
                  onChange={(value) => {
                    setSearch(value);
                    setPage(1);
                  }}
                />

                <SortDropdown
                  sortBy={currentSortBy}
                  order={currentOrder as "asc" | "desc"}
                  onSortChange={handleSortChange}
                />
              </div>
            </div>

            <ProductGrid
              products={products}
              isLoading={isLoading}
            />

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </main>
        </div>
      </div>
    </div>
  );

}
```

## File: client/app/profile/page.tsx
```typescript
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Mail,
  ShieldCheck,
  CircleUserRound,
  LogOut,
  KeyRound,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth.store";

export default function ProfilePage() {
  const { storeUser, logout } = useAuthStore();

  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Prefill form once the user is available
  useEffect(() => {
    if (storeUser) {
      setName(storeUser.name);
    }
  }, [storeUser]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      // Wire your API here, e.g.:
      // await api.patch("/users/me", { name });
      //
      // Then update the store so the navbar reflects the new name:
      // useAuthStore.setState({ storeUser: { ...storeUser, name } });

      setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  // Not signed in
  if (!storeUser) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <Card className="w-full max-w-sm text-center">
          <CardHeader>
            <CardTitle>You are not signed in</CardTitle>
            <CardDescription>
              Please log in to view your profile.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/login" className={buttonVariants()}>
              Go to Login
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* Back link */}
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "mb-6 gap-2 pl-0 text-muted-foreground hover:text-foreground"
        )}
      >
        <ArrowLeft className="size-4" />
        Back to Home
      </Link>

      {/* Profile header */}
      <Card>
        <CardHeader className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <Avatar className="size-20">
            <AvatarFallback className="text-3xl">
              {storeUser.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <CardTitle className="text-2xl">{storeUser.name}</CardTitle>
              <Badge variant={storeUser.role === "ADMIN" ? "default" : "secondary"}>
                {storeUser.role}
              </Badge>
            </div>
            <CardDescription className="mt-1">
              {storeUser.email}
            </CardDescription>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6">
          <dl className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <CircleUserRound className="size-4 shrink-0 text-muted-foreground" />
              <dt className="w-28 shrink-0 text-muted-foreground">Full name</dt>
              <dd className="font-medium">{storeUser.name}</dd>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="size-4 shrink-0 text-muted-foreground" />
              <dt className="w-28 shrink-0 text-muted-foreground">Email</dt>
              <dd className="font-medium">{storeUser.email}</dd>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="size-4 shrink-0 text-muted-foreground" />
              <dt className="w-28 shrink-0 text-muted-foreground">Account type</dt>
              <dd className="font-medium">{storeUser.role}</dd>
            </div>

            {/* <div className="flex items-center gap-3">
              <KeyRound className="size-4 shrink-0 text-muted-foreground" />
              <dt className="w-28 shrink-0 text-muted-foreground">User ID</dt>
              <dd className="truncate font-mono text-xs">{storeUser.id}</dd>
            </div> */}
          </dl>
        </CardContent>
      </Card>

      {/* Edit profile */}
      {/* <Card className="mt-6">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>
            Update your display name. Email cannot be changed.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={storeUser.email} disabled />
            </div>

            <div className="flex items-center gap-3">
              <Button type="submit" disabled={saving || name === storeUser.name}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
              {saved && (
                <p className="text-sm text-green-600">Profile updated.</p>
              )}
            </div>
          </form>
        </CardContent>
      </Card> */}

      {/* Sign out */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Sign Out</CardTitle>
          <CardDescription>
            You will be logged out of your account on this device.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button
            variant="outline"
            className="gap-2 text-destructive hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="size-4" />
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

## File: client/app/register/page.tsx
```typescript
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  );
}
```

## File: client/app/returns/page.tsx
```typescript

export default function ReturnsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-4 text-3xl font-bold">
        Returns & Refunds
      </h1>

      <p className="mb-8 text-gray-600">
        We want you to have a positive shopping experience.
        Read our return guidelines below.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="mb-2 text-xl font-semibold">
            Return Eligibility
          </h2>
          <p className="leading-7 text-gray-600">
            Return eligibility depends on the product,
            its condition, and the applicable return policy.
            Please contact our support team to confirm
            whether your item qualifies.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">
            How to Request a Return
          </h2>
          <ol className="list-decimal space-y-2 pl-6 text-gray-600">
            <li>Contact our support team.</li>
            <li>Provide your order number and reason for return.</li>
            <li>Follow the instructions provided by our team.</li>
            <li>Keep the item and packaging ready if required.</li>
          </ol>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">
            Refunds
          </h2>
          <p className="leading-7 text-gray-600">
            Refund eligibility and processing times depend
            on the return outcome and payment method.
            Approved refunds are processed according to
            the applicable refund policy.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">
            Questions About a Return?
          </h2>
          <p className="leading-7 text-gray-600">
            Our support team can help you understand the
            return process and available options.
          </p>
          <a
            href="/contact"
            className="mt-3 inline-block text-blue-600 hover:underline"
          >
            Contact Support →
          </a>
        </section>
      </div>
    </main>
  );
}
```

## File: client/app/shipping/page.tsx
```typescript

export default function ShippingPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-4 text-3xl font-bold">
        Shipping Information
      </h1>

      <p className="mb-8 text-gray-600">
        Learn how we process and deliver your orders.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="mb-2 text-xl font-semibold">
            Order Processing
          </h2>
          <p className="leading-7 text-gray-600">
            After your order is placed, we prepare it for
            shipment. Processing times may vary depending
            on product availability and order volume.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">
            Delivery Time
          </h2>
          <p className="leading-7 text-gray-600">
            Delivery estimates depend on your location,
            shipping method, and courier service. Your
            tracking information can help you follow
            your shipment.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">
            Shipping Charges
          </h2>
          <p className="leading-7 text-gray-600">
            Applicable shipping charges are displayed
            during checkout before you complete your order.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">
            Need Help?
          </h2>
          <p className="leading-7 text-gray-600">
            If your order is delayed or you have questions
            about delivery, please contact our support team.
          </p>
          <a
            href="/contact"
            className="mt-3 inline-block text-blue-600 hover:underline"
          >
            Contact Support →
          </a>
        </section>
      </div>
    </main>
  );
}
```

## File: client/app/terms/page.tsx
```typescript

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-4 text-3xl font-bold">
        Terms & Conditions
      </h1>

      <p className="mb-8 text-sm text-gray-500">
        Last updated: October 29, 2026
      </p>

      <p className="mb-8 leading-7 text-gray-600">
        Welcome to our online store. By accessing or
        using this website, you agree to these Terms &
        Conditions. Please read them carefully before
        using our services or placing an order.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="mb-3 text-xl font-semibold">
            1. Use of Our Website
          </h2>
          <p className="leading-7 text-gray-600">
            You agree to use this website only for lawful
            purposes. You must not misuse our services,
            interfere with website operations, attempt
            unauthorized access, or submit false
            information.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            2. Accounts
          </h2>
          <p className="leading-7 text-gray-600">
            You are responsible for maintaining the
            confidentiality of your account credentials
            and for activity performed through your
            account. Please notify us if you suspect
            unauthorized access. We may restrict or
            suspend accounts when reasonably necessary
            for security, fraud prevention, or legal
            compliance.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            3. Products and Pricing
          </h2>
          <p className="leading-7 text-gray-600">
            We aim to display accurate product descriptions,
            images, prices, and availability. Errors may
            occasionally occur. Applicable prices, taxes,
            shipping charges, and other costs will be
            presented during checkout where required.
            We will handle pricing or listing errors in
            accordance with applicable law.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            4. Orders and Payments
          </h2>
          <p className="leading-7 text-gray-600">
            Placing an order constitutes an offer to
            purchase the selected products. Order
            acceptance and confirmation are subject to
            the checkout process and applicable law.
            Payments may be processed through third-party
            payment providers. Orders may be declined
            or cancelled for valid reasons, subject to
            applicable legal requirements.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            5. Shipping and Delivery
          </h2>
          <p className="leading-7 text-gray-600">
            Delivery estimates are provided for guidance
            and may vary based on location, courier
            availability, and other circumstances.
            Please review our shipping information for
            additional details.
          </p>
          <a
            href="/shipping"
            className="mt-2 inline-block text-blue-600 hover:underline"
          >
            View Shipping Information →
          </a>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            6. Returns and Refunds
          </h2>
          <p className="leading-7 text-gray-600">
            Returns, replacements, and refunds are handled
            according to our applicable return policy and
            consumer protection laws. Nothing in these
            terms removes any rights that cannot legally
            be excluded.
          </p>
          <a
            href="/returns"
            className="mt-2 inline-block text-blue-600 hover:underline"
          >
            View Returns Policy →
          </a>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            7. Intellectual Property
          </h2>
          <p className="leading-7 text-gray-600">
            Website content, including text, graphics,
            logos, and design elements, may be protected
            by intellectual property laws. You may not
            reproduce or commercially use protected
            content without authorization, except as
            permitted by law.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            8. Limitation of Liability
          </h2>
          <p className="leading-7 text-gray-600">
            To the extent permitted by applicable law,
            we are not responsible for losses arising
            from misuse of the website or circumstances
            beyond our reasonable control. These terms
            do not exclude liability that cannot legally
            be excluded or restricted.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            9. Changes to These Terms
          </h2>
          <p className="leading-7 text-gray-600">
            We may update these terms from time to time.
            Updated terms will be published on this page
            with a revised date. Changes will take effect
            as required by applicable law.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            10. Contact Us
          </h2>
          <p className="leading-7 text-gray-600">
            If you have questions about these terms,
            please contact our support team at{" "}
            <a
              href="mailto:support@yourstore.com"
              className="text-blue-600 hover:underline"
            >
              support@yourstore.com
            </a>.
          </p>
        </section>
      </div>
    </main>
  );
}
```

## File: client/app/test-products/page.tsx
```typescript
"use client";

import { useState } from "react";
import api from "@/lib/axios";

export default function TestProductsPage() {
    const [result, setResult] = useState("");

    async function testGetProducts() {
        try {
            const res = await api.get("/products");
            setResult(JSON.stringify(res.data, null, 2));
        } catch (err) {
            console.error(err);
        }
    }

    async function testGetSingleProduct() {
        try {
            const productId = prompt("Enter Product ID");

            if (!productId) return;

            const res = await api.get(
                `/products/${productId}`
            );

            setResult(JSON.stringify(res.data, null, 2));
        } catch (err) {
            console.error(err);
        }
    }

    async function testCreateProduct() {
        try {
            const payload = {
                name: "Test Product",
                description:
                    "Created from frontend API test",
                price: 999,
                stock: 10,
                categoryId: "PUT_REAL_CATEGORY_ID",
                images: [
                    "https://via.placeholder.com/400",
                ],
            };

            const res = await api.post(
                "/products",
                payload
            );

            setResult(JSON.stringify(res.data, null, 2));
        } catch (err) {
            console.error(err);
        }
    }

    async function testUpdateProduct() {
        try {
            const productId = prompt(
                "Enter Product ID"
            );

            if (!productId) return;

            const res = await api.put(
                `/products/${productId}`,
                {
                    name: "Updated Product",
                    price: 1999,
                }
            );

            setResult(JSON.stringify(res.data, null, 2));
        } catch (err) {
            console.error(err);
        }
    }

    async function testDeleteProduct() {
        try {
            const productId = prompt(
                "Enter Product ID"
            );

            if (!productId) return;

            const res = await api.delete(
                `/products/${productId}`
            );

            setResult(JSON.stringify(res.data, null, 2));
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-8">
                Product API Tester
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <button
                    onClick={testGetProducts}
                    className="bg-blue-600 text-white p-3 rounded-xl"
                >
                    GET Products
                </button>

                <button
                    onClick={testGetSingleProduct}
                    className="bg-green-600 text-white p-3 rounded-xl"
                >
                    GET Single
                </button>

                <button
                    onClick={testCreateProduct}
                    className="bg-indigo-600 text-white p-3 rounded-xl"
                >
                    CREATE
                </button>

                <button
                    onClick={testUpdateProduct}
                    className="bg-yellow-600 text-white p-3 rounded-xl"
                >
                    UPDATE
                </button>

                <button
                    onClick={testDeleteProduct}
                    className="bg-red-600 text-white p-3 rounded-xl"
                >
                    DELETE
                </button>
            </div>

            <pre className="bg-black text-green-400 p-6 rounded-2xl overflow-auto text-sm">
                {result}
            </pre>
        </div>
    );
}
```

## File: client/components.json
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "base-nova",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "rtl": false,
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "menuColor": "default",
  "menuAccent": "subtle",
  "registries": {}
}
```

## File: client/components/AddToCartButton.tsx
```typescript
"use client";

import { useCartStore } from "@/store/cartStore";
import { CartProduct } from "@/types/cart.types";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

interface AddToCartButtonProps {
    stock: number;
    product: CartProduct;
}

export default function AddToCartButton({
    stock,
    product
}: AddToCartButtonProps) {
    const { addToCart } = useCartStore();
    
    const handleAddToCart = async () => {
        // alert("Cart functionality coming in next day");
        try {
            await addToCart(product, 1);

            toast.success("Product added to cart");
        } catch (error) {
            console.error("Failed to add product:", error);

            toast.error("Failed to add product to cart");
        }
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={stock <= 0}
            className={`w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition ${stock <= 0
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
        >
            <ShoppingCart className="w-5 h-5" />
            {/* Add to Cart */}
            {stock <= 0 ? "Out of Stock" : "Add to Cart"}
        </button>
    );
}
```

## File: client/components/admin/LowStockAlert.tsx
```typescript
export default function LowStockAlert({ products }: { products: any[] }) {
  return (
    <div className="bg-red-50 border border-red-300 rounded-xl p-5">
      <h2 className="font-bold text-red-600 mb-4">Low Stock Alerts</h2>

      {products.length === 0 ? (
        <p>No low stock items.</p>
      ) : (
        <ul className="space-y-2">
          {products.map((product) => (
            <li key={product.id}>
              {product.name}
              {' - '}
              {product.stock} left
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

## File: client/components/admin/ProductForm.tsx
```typescript
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

/* =========================================================
   Types
========================================================= */

interface ProductFormProps {
  initialData?: ProductFormData;
  productId?: string;
  isEdit?: boolean;
}

interface UploadedImage {
  imageUrl: string;
  key: string;
}

/* =========================================================
   Constants
========================================================= */

const MAX_IMAGES = 8;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

/* =========================================================
   Empty Form
========================================================= */

const emptyForm: ProductFormData = {
  name: "",
  description: "",
  price: 0,
  stock: 0,
  categoryId: "",
  images: [],
};

/* =========================================================
   Component
========================================================= */

export default function ProductForm({
  initialData,
  productId,
  isEdit = false,
}: ProductFormProps) {
  const router = useRouter();

  /* =========================================================
     State
  ========================================================= */

  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);

  const [formData, setFormData] = useState<ProductFormData>(
    initialData || emptyForm
  );

  // Newly selected local files
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  // Preview URLs for newly selected files
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  /* =========================================================
     Fetch Categories
  ========================================================= */

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

  /* =========================================================
     Cleanup Object URLs
  ========================================================= */

  useEffect(() => {
    return () => {
      previewImages.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [previewImages]);

  /* =========================================================
     Handle Input Changes
  ========================================================= */

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

  /* =========================================================
     Handle Multiple Image Selection
  ========================================================= */

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) {
      return;
    }

    /*
     * Existing images + currently selected local images
     * + newly selected files
     */
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

    /* ---------------------------------------------------------
       Validate every file
    --------------------------------------------------------- */

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

    /* ---------------------------------------------------------
       Add files
    --------------------------------------------------------- */

    setSelectedImages((prev) => [
      ...prev,
      ...files,
    ]);

    /* ---------------------------------------------------------
       Create local previews
    --------------------------------------------------------- */

    const newPreviews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviewImages((prev) => [
      ...prev,
      ...newPreviews,
    ]);

    /*
     * Allow selecting the same file again
     */
    e.target.value = "";
  };

  /* =========================================================
     Remove Newly Selected Image
  ========================================================= */

  const handleRemoveSelectedImage = (
    index: number
  ) => {
    const previewUrl = previewImages[index];

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedImages((prev) =>
      prev.filter(
        (_, imageIndex) => imageIndex !== index
      )
    );

    setPreviewImages((prev) =>
      prev.filter(
        (_, imageIndex) => imageIndex !== index
      )
    );
  };

  /* =========================================================
     Remove Existing Product Image
     
     IMPORTANT:
     This only removes the image URL from the product
     payload. It does NOT delete the S3 object yet.
  ========================================================= */

  const handleRemoveExistingImage = (
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter(
        (_, imageIndex) => imageIndex !== index
      ),
    }));
  };

  /* =========================================================
     Upload Images to S3
  ========================================================= */

  const uploadImages = async (): Promise<
    UploadedImage[]
  > => {
    if (selectedImages.length === 0) {
      return [];
    }

    const form = new FormData();

    selectedImages.forEach((file) => {
      form.append("images", file);
    });

    setUploadingImages(true);

    try {
      const response = await api.post(
        "/upload/images",
        form
      );

      const uploadedImages =
        response.data.data.images;

      if (
        !uploadedImages ||
        !Array.isArray(uploadedImages)
      ) {
        throw new Error(
          "Invalid image upload response"
        );
      }

      return uploadedImages;
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

  /* =========================================================
     Submit
  ========================================================= */

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    /* ---------------------------------------------------------
       Basic validation
    --------------------------------------------------------- */

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

    setLoading(true);

    /*
     * Keep these outside try because we need them
     * inside catch for S3 cleanup.
     */
    let newlyUploadedImages: UploadedImage[] = [];

    try {
      /* -------------------------------------------------------
         1. Upload newly selected images to S3
      ------------------------------------------------------- */

      newlyUploadedImages =
        await uploadImages();

      /* -------------------------------------------------------
         2. Extract image URLs
         
         Product schema currently stores:
         images: string[]
      ------------------------------------------------------- */

      const uploadedImageUrls =
        newlyUploadedImages.map(
          (image) => image.imageUrl
        );

      /* -------------------------------------------------------
         3. Combine existing + newly uploaded images
      ------------------------------------------------------- */

      const finalImages = [
        ...formData.images,
        ...uploadedImageUrls,
      ];

      /* -------------------------------------------------------
         4. Prepare Product Data
      ------------------------------------------------------- */

      const productData: ProductFormData = {
        ...formData,
        images: finalImages,
      };

      /* -------------------------------------------------------
         5. Create / Update Product
      ------------------------------------------------------- */

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

      /* -------------------------------------------------------
         6. Cleanup Local Preview State
      ------------------------------------------------------- */

      previewImages.forEach((url) => {
        URL.revokeObjectURL(url);
      });

      setSelectedImages([]);
      setPreviewImages([]);

      /* -------------------------------------------------------
         7. Redirect
      ------------------------------------------------------- */

      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error(
        "Product operation failed:",
        error
      );

      /* -------------------------------------------------------
         IMPORTANT:
         If S3 upload succeeded but product creation/update
         failed, delete those newly uploaded S3 objects.
      ------------------------------------------------------- */

      if (newlyUploadedImages.length > 0) {
        try {
          await api.delete(
            "/upload/images",
            {
              data: {
                keys: newlyUploadedImages.map(
                  (image) => image.key
                ),
              },
            }
          );
        } catch (cleanupError) {
          console.error(
            "Failed to cleanup S3 images:",
            cleanupError
          );
        }
      }

      toast.error(
        isEdit
          ? "Failed to update product"
          : "Failed to create product"
      );
    } finally {
      setLoading(false);
      setUploadingImages(false);
    }
  };

  /* =========================================================
     Render
  ========================================================= */

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* =====================================================
          Product Name
      ===================================================== */}

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

      {/* =====================================================
          Description
      ===================================================== */}

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

      {/* =====================================================
          Price & Stock
      ===================================================== */}

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Price */}

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

        {/* Stock */}

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

      {/* =====================================================
          Category
      ===================================================== */}

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

      {/* =====================================================
          Image Upload
      ===================================================== */}

      <div className="space-y-3">
        {/* Header */}

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

        {/* File Input */}

        <div className="relative">
          <Upload
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />

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

        {/* Help text */}

        <p className="text-xs text-muted-foreground">
          JPG, PNG or WEBP • Maximum 5MB per image •
          Maximum {MAX_IMAGES} images
        </p>

        {/* Upload State */}

        {uploadingImages && (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            Uploading images...
          </p>
        )}
      </div>

      {/* =====================================================
          Existing Image Previews
      ===================================================== */}

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

                  {/* Remove */}

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

                  {/* Primary */}

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

      {/* =====================================================
          New Image Previews
      ===================================================== */}

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

                  {/* Remove */}

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

      {/* =====================================================
          Submit
      ===================================================== */}

      <Button
        type="submit"
        disabled={
          loading || uploadingImages
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


// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';
// import { Loader2, Upload, X } from 'lucide-react';

// import api from '@/lib/axios';
// import { Category, ProductFormData } from '@/types/product.types';

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';

// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';

// interface ProductFormProps {
//   initialData?: ProductFormData;
//   productId?: string;
//   isEdit?: boolean;
// }

// interface UploadedImage {
//   imageUrl: string;
//   key: string;
// }

// const MAX_IMAGES = 8;
// const MAX_FILE_SIZE = 5 * 1024 * 1024;

// const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// const emptyForm: ProductFormData = {
//   name: '',
//   description: '',
//   price: 0,
//   stock: 0,
//   categoryId: '',
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
//   const [uploadingImages, setUploadingImages] = useState(false);

//   const [formData, setFormData] = useState<ProductFormData>(
//     initialData || emptyForm
//   );

//   // Newly selected local files
//   const [selectedImages, setSelectedImages] = useState<File[]>([]);

//   // Local preview URLs for newly selected files
//   const [previewImages, setPreviewImages] = useState<string[]>([]);

//   // =========================================================
//   // Fetch Categories
//   // =========================================================

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await api.get('/categories');

//         setCategories(response.data.data);
//       } catch (error) {
//         console.error('Failed to fetch categories:', error);

//         toast.error('Failed to load categories');
//       }
//     };

//     fetchCategories();
//   }, []);

//   // =========================================================
//   // Cleanup Object URLs
//   // =========================================================

//   useEffect(() => {
//     return () => {
//       previewImages.forEach((url) => {
//         URL.revokeObjectURL(url);
//       });
//     };
//   }, [previewImages]);

//   // =========================================================
//   // Handle Input Changes
//   // =========================================================

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === 'price' || name === 'stock' ? Number(value) : value,
//     }));
//   };

//   // =========================================================
//   // Handle Multiple Image Selection
//   // =========================================================

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);

//     if (!files.length) {
//       return;
//     }

//     // Current existing images + newly selected images
//     const totalImages =
//       formData.images.length + selectedImages.length + files.length;

//     if (totalImages > MAX_IMAGES) {
//       toast.error(`You can upload maximum ${MAX_IMAGES} images`);

//       e.target.value = '';
//       return;
//     }

//     // Validate files
//     for (const file of files) {
//       if (!ALLOWED_TYPES.includes(file.type)) {
//         toast.error(
//           `${file.name}: Only JPG, JPEG, PNG and WEBP images are allowed`
//         );

//         e.target.value = '';
//         return;
//       }

//       if (file.size > MAX_FILE_SIZE) {
//         toast.error(`${file.name}: Image size must be less than 5MB`);

//         e.target.value = '';
//         return;
//       }
//     }

//     // Add files
//     setSelectedImages((prev) => [...prev, ...files]);

//     // Create previews
//     const newPreviews = files.map((file) => URL.createObjectURL(file));

//     setPreviewImages((prev) => [...prev, ...newPreviews]);

//     // Allow selecting the same file again
//     e.target.value = '';
//   };

//   // =========================================================
//   // Remove Newly Selected Image
//   // =========================================================

//   const handleRemoveSelectedImage = (index: number) => {
//     // Revoke object URL
//     URL.revokeObjectURL(previewImages[index]);

//     setSelectedImages((prev) =>
//       prev.filter((_, imageIndex) => imageIndex !== index)
//     );

//     setPreviewImages((prev) =>
//       prev.filter((_, imageIndex) => imageIndex !== index)
//     );
//   };

//   // =========================================================
//   // Remove Existing Product Image
//   // =========================================================

//   const handleRemoveExistingImage = (index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       images: prev.images.filter((_, imageIndex) => imageIndex !== index),
//     }));
//   };

//   // =========================================================
//   // Upload Images
//   // =========================================================

//   // const uploadImages = async (): Promise<string[]> => {
//   //   if (selectedImages.length === 0) {
//   //     return [];
//   //   }

//   //   const form = new FormData();

//   //   selectedImages.forEach((file) => {
//   //     form.append('images', file);
//   //   });

//   //   try {
//   //     setUploadingImages(true);

//   //     const response = await api.post('/upload/images', form);

//   //     const uploadedImages = response.data.data.images;

//   //     if (!uploadedImages || !Array.isArray(uploadedImages)) {
//   //       throw new Error('Invalid image upload response');
//   //     }

//   //     return uploadedImages.map(
//   //       (image: { imageUrl: string; publicId: string }) => image.imageUrl
//   //     );
//   //   } catch (error) {
//   //     console.error('Image upload failed:', error);

//   //     throw new Error('Failed to upload product images');
//   //   } finally {
//   //     setUploadingImages(false);
//   //   }
//   // };

//   const uploadImages = async (): Promise<UploadedImage[]> => {
//     if (selectedImages.length === 0) {
//       return [];
//     }

//     const form = new FormData();

//     selectedImages.forEach((file) => {
//       form.append('images', file);
//     });

//     setUploadingImages(true);

//     try {
//       const response = await api.post('/upload/images', form);

//       const uploadedImages = response.data.data.images;

//       if (!uploadedImages || !Array.isArray(uploadedImages)) {
//         throw new Error('Invalid image upload response');
//       }

//       return uploadedImages;
//     } finally {
//       setUploadingImages(false);
//     }
//   };

//   // =========================================================
//   // Submit
//   // =========================================================

//   // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//   //   e.preventDefault();

//     const handleSubmit = async (
//   e: React.FormEvent<HTMLFormElement>
// ) => {
//   e.preventDefault();

//   if (!formData.name.trim()) {
//     toast.error("Product name is required");
//     return;
//   }

//   if (formData.price <= 0) {
//     toast.error("Price must be greater than 0");
//     return;
//   }

//   if (formData.stock < 0) {
//     toast.error("Stock cannot be negative");
//     return;
//   }

//   if (!formData.categoryId) {
//     toast.error("Please select a category");
//     return;
//   }

//   if (
//     formData.images.length +
//       selectedImages.length >
//     MAX_IMAGES
//   ) {
//     toast.error(
//       `Maximum ${MAX_IMAGES} images are allowed`
//     );
//     return;
//   }

//   setLoading(true);

//   let newlyUploadedImages: UploadedImage[] = [];

//   try {
//     // Upload new images to S3
//     newlyUploadedImages = await uploadImages();

//     // Extract URLs for the current Product schema
//     const uploadedImageUrls =
//       newlyUploadedImages.map(
//         (image) => image.imageUrl
//       );

//     // Combine existing + new images
//     const finalImages = [
//       ...formData.images,
//       ...uploadedImageUrls,
//     ];

//     const productData: ProductFormData = {
//       ...formData,
//       images: finalImages,
//     };

//     if (isEdit && productId) {
//       await api.patch(
//         `/admin/products/${productId}`,
//         productData
//       );

//       toast.success(
//         "Product updated successfully"
//       );
//     } else {
//       await api.post(
//         "/admin/products/create",
//         productData
//       );

//       toast.success(
//         "Product created successfully"
//       );
//     }

//     // Cleanup local previews
//     previewImages.forEach((url) => {
//       URL.revokeObjectURL(url);
//     });

//     setSelectedImages([]);
//     setPreviewImages([]);

//     router.push("/admin/products");
//     router.refresh();

//   } catch (error) {
//     console.error(
//       "Product operation failed:",
//       error
//     );

//     // If S3 upload succeeded but product
//     // creation/update failed, remove those objects.
//     if (newlyUploadedImages.length > 0) {
//       try {
//         await api.delete(
//           "/upload/images",
//           {
//             data: {
//               keys: newlyUploadedImages.map(
//                 (image) => image.key
//               ),
//             },
//           }
//         );
//       } catch (cleanupError) {
//         console.error(
//           "Failed to cleanup S3 images:",
//           cleanupError
//         );
//       }
//     }

//     toast.error(
//       isEdit
//         ? "Failed to update product"
//         : "Failed to create product"
//     );
//   } finally {
//     setLoading(false);
//     setUploadingImages(false);
//   }
// };
//     // -----------------------------------------------
//     // Basic validation
//     // -----------------------------------------------

//     if (!formData.name.trim()) {
//       toast.error('Product name is required');
//       return;
//     }

//     if (formData.price <= 0) {
//       toast.error('Price must be greater than 0');
//       return;
//     }

//     if (formData.stock < 0) {
//       toast.error('Stock cannot be negative');
//       return;
//     }

//     if (!formData.categoryId) {
//       toast.error('Please select a category');
//       return;
//     }

//     if (formData.images.length + selectedImages.length > MAX_IMAGES) {
//       toast.error(`Maximum ${MAX_IMAGES} images are allowed`);

//       return;
//     }

//     try {
//       setLoading(true);

//       // -----------------------------------------------
//       // Upload newly selected images
//       // -----------------------------------------------

//       const uploadedImageUrls = await uploadImages();

//       // -----------------------------------------------
//       // Combine existing + newly uploaded images
//       // -----------------------------------------------

//       const finalImages = [...formData.images, ...uploadedImageUrls];

//       // -----------------------------------------------
//       // Final product data
//       // -----------------------------------------------

//       const productData: ProductFormData = {
//         ...formData,
//         images: finalImages,
//       };

//       // -----------------------------------------------
//       // Create / Update Product
//       // -----------------------------------------------

//       if (isEdit && productId) {
//         await api.patch(`/admin/products/${productId}`, productData);

//         toast.success('Product updated successfully');
//       } else {
//         await api.post('/admin/products/create', productData);

//         toast.success('Product created successfully');
//       }

//       // -----------------------------------------------
//       // Reset upload state
//       // -----------------------------------------------

//       setSelectedImages([]);
//       setPreviewImages([]);

//       // -----------------------------------------------
//       // Redirect
//       // -----------------------------------------------

//       router.push('/admin/products');
//       router.refresh();
//     } catch (error) {
//       console.error('Product operation failed:', error);

//       toast.error(
//         isEdit ? 'Failed to update product' : 'Failed to create product'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =========================================================
//   // Render
//   // =========================================================

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {/* =================================================
//           Product Name
//       ================================================= */}

//       <div className="space-y-2">
//         <Label htmlFor="name">Product Name</Label>

//         <Input
//           id="name"
//           type="text"
//           name="name"
//           placeholder="e.g. Wireless Headphones"
//           value={formData.name}
//           onChange={handleChange}
//           disabled={loading}
//         />
//       </div>

//       {/* =================================================
//           Description
//       ================================================= */}

//       <div className="space-y-2">
//         <Label htmlFor="description">Description</Label>

//         <Textarea
//           id="description"
//           name="description"
//           placeholder="Describe the product..."
//           value={formData.description}
//           onChange={handleChange}
//           rows={5}
//           disabled={loading}
//         />
//       </div>

//       {/* =================================================
//           Price & Stock
//       ================================================= */}

//       <div className="grid gap-6 sm:grid-cols-2">
//         <div className="space-y-2">
//           <Label htmlFor="price">Price (₹)</Label>

//           <Input
//             id="price"
//             type="number"
//             name="price"
//             min="0"
//             step="0.01"
//             placeholder="0.00"
//             value={formData.price}
//             onChange={handleChange}
//             disabled={loading}
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="stock">Stock</Label>

//           <Input
//             id="stock"
//             type="number"
//             name="stock"
//             min="0"
//             placeholder="0"
//             value={formData.stock}
//             onChange={handleChange}
//             disabled={loading}
//           />
//         </div>
//       </div>

//       {/* =================================================
//           Category
//       ================================================= */}

//       <div className="space-y-2">
//         <Label>Category</Label>

//         <Select
//           value={formData.categoryId}
//           onValueChange={(value) =>
//             setFormData((prev) => ({
//               ...prev,
//               categoryId: value ?? '',
//             }))
//           }
//           disabled={loading}
//         >
//           <SelectTrigger className="w-full">
//             <SelectValue placeholder="Select a category" />
//           </SelectTrigger>

//           <SelectContent>
//             <SelectGroup>
//               {categories.map((category) => (
//                 <SelectItem key={category.id} value={category.id}>
//                   {category.name}
//                 </SelectItem>
//               ))}
//             </SelectGroup>
//           </SelectContent>
//         </Select>
//       </div>

//       {/* =================================================
//           Image Upload
//       ================================================= */}

//       <div className="space-y-3">
//         <div className="flex items-center justify-between">
//           <Label htmlFor="images">Product Images</Label>

//           <span className="text-sm text-muted-foreground">
//             {formData.images.length + selectedImages.length}/{MAX_IMAGES}
//           </span>
//         </div>

//         <div className="relative">
//           <Upload className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

//           <Input
//             id="images"
//             type="file"
//             accept="image/jpeg,image/png,image/webp"
//             multiple
//             onChange={handleFileChange}
//             disabled={
//               loading ||
//               uploadingImages ||
//               formData.images.length + selectedImages.length >= MAX_IMAGES
//             }
//             className="pl-9"
//           />
//         </div>

//         <p className="text-xs text-muted-foreground">
//           JPG, PNG or WEBP • Maximum 5MB per image • Maximum {MAX_IMAGES} images
//         </p>

//         {uploadingImages && (
//           <p className="flex items-center gap-2 text-sm text-muted-foreground">
//             <Loader2 className="size-4 animate-spin" />
//             Uploading images...
//           </p>
//         )}
//       </div>

//       {/* =================================================
//           Existing Image Previews
//       ================================================= */}

//       {formData.images.length > 0 && (
//         <div className="space-y-2">
//           <p className="text-sm font-medium">Existing Images</p>

//           <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
//             {formData.images.map((image, index) => (
//               <div
//                 key={`${image}-${index}`}
//                 className="group relative aspect-square overflow-hidden rounded-lg border"
//               >
//                 {/* eslint-disable-next-line @next/next/no-img-element */}
//                 <img
//                   src={image}
//                   alt={`Product image ${index + 1}`}
//                   className="size-full object-cover"
//                 />

//                 <button
//                   type="button"
//                   onClick={() => handleRemoveExistingImage(index)}
//                   disabled={loading}
//                   aria-label="Remove image"
//                   className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-destructive text-white opacity-90 transition-opacity hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-50"
//                 >
//                   <X className="size-4" />
//                 </button>

//                 {index === 0 && (
//                   <span className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
//                     Primary
//                   </span>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* =================================================
//           New Image Previews
//       ================================================= */}

//       {previewImages.length > 0 && (
//         <div className="space-y-2">
//           <p className="text-sm font-medium">New Images</p>

//           <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
//             {previewImages.map((preview, index) => (
//               <div
//                 key={`${preview}-${index}`}
//                 className="group relative aspect-square overflow-hidden rounded-lg border"
//               >
//                 {/* eslint-disable-next-line @next/next/no-img-element */}
//                 <img
//                   src={preview}
//                   alt={`Selected image ${index + 1}`}
//                   className="size-full object-cover"
//                 />

//                 <button
//                   type="button"
//                   onClick={() => handleRemoveSelectedImage(index)}
//                   disabled={loading}
//                   aria-label="Remove selected image"
//                   className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-destructive text-white opacity-90 transition-opacity hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-50"
//                 >
//                   <X className="size-4" />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* =================================================
//           Submit
//       ================================================= */}

//       <Button
//         type="submit"
//         disabled={loading || uploadingImages}
//         className="w-full sm:w-auto"
//       >
//         {(loading || uploadingImages) && (
//           <Loader2 className="size-4 animate-spin" />
//         )}

//         {uploadingImages
//           ? 'Uploading Images...'
//           : loading
//             ? 'Saving...'
//             : isEdit
//               ? 'Update Product'
//               : 'Create Product'}
//       </Button>
//     </form>
//   );
// }
```

## File: client/components/admin/ProductTable.tsx
```typescript
"use client";

import Link from "next/link";
import { Product } from "@/types/product.types";

interface ProductTableProps {
  products: Product[];
  onDelete: (id: string) => void;
}

export default function ProductTable({
  products,
  onDelete,
}: ProductTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow border overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="text-left px-6 py-4">Name</th>
            <th className="text-left px-6 py-4">Category</th>
            <th className="text-left px-6 py-4">Price</th>
            <th className="text-left px-6 py-4">Stock</th>
            <th className="text-left px-6 py-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-t"
            >
              <td className="px-6 py-4">
                {product.name}
              </td>

              <td className="px-6 py-4">
                {product.category?.name}
              </td>

              <td className="px-6 py-4">
                ₹{product.price}
              </td>

              <td className="px-6 py-4">
                {product.stock}
              </td>

              <td className="px-6 py-4 flex gap-3">
                <Link
                  href={`/admin/products/edit/${product.id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Edit
                </Link>

                <button
                  onClick={() =>
                    onDelete(product.id)
                  }
                  className="px-4 py-2 bg-red-600 text-white rounded-lg"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

## File: client/components/admin/RecentOrdersTable.tsx
```typescript
export default function RecentOrdersTable({ orders }: { orders: any[] }) {
    return (
        <div className="bg-white rounded-xl shadow p-5">
            <h2 className="font-bold text-lg mb-4">Recent Orders</h2>

            <table className="w-full">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Total</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {orders?.map((order) => (
                        // <tr key={order.id}>
                        <tr key={order?.id}>
                            {/* <td>{order?.id?.slice(0, 8)}</td> */}
                            <td>{order?.id ? order.id.slice(0, 8) : 'N/A'}</td>

                            <td>{order?.user?.name || 'Unknown User'}</td>

                            <td>₹{ order?.totalAmount || 0 }</td>

                            <td>{order?.status || 'UNKNOWN'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
```

## File: client/components/admin/RevenueChart.tsx
```typescript
// 'use client';

// import {
//     ResponsiveContainer,
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     Tooltip,
// } from 'recharts';

// export default function RevenueChart({ data }: { data: any[] }) {
//     const chartData = data.map((item) => ({
//         date: new Date(item.createdAt).toLocaleDateString(),
//         revenue: item._sum.totalAmount,
//     }));

//     return (
//         <div className="bg-white rounded-xl shadow p-5">
//             <h2 className="font-bold text-lg mb-4">Revenue</h2>

//             <ResponsiveContainer width="100%" height={350}>
//                 <LineChart data={chartData}>
//                     <XAxis dataKey="date" />
//                     <YAxis />

//                     <Tooltip />

//                     <Line type="monotone" dataKey="revenue" stroke="#2563eb" />
//                 </LineChart>
//             </ResponsiveContainer>
//         </div>
//     );
// }





"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface RevenueData {
  month: string;
  revenue: number;
}

interface RevenueChartProps {
  data: RevenueData[];
}

export default function RevenueChart({
  data,
}: RevenueChartProps) {
  const chartData = (data ?? []).map((item) => ({
    month: item.month,
    revenue: Number(item.revenue ?? 0),
  }));

  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <h2 className="mb-4 text-lg font-bold text-gray-900">
        Monthly Revenue
      </h2>

      {chartData.length === 0 ? (
        <p className="py-10 text-center text-gray-500">
          No revenue data available yet.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <LineChart
            data={chartData}
            margin={{
              top: 10,
              right: 20,
              left: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis
              tickFormatter={(value) =>
                `₹${Number(value).toLocaleString("en-IN")}`
              }
            />

            <Tooltip
              formatter={(value) => [
                `₹${Number(value).toLocaleString("en-IN")}`,
                "Revenue",
              ]}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              strokeWidth={2}
              dot
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
```

## File: client/components/admin/StatsCard.tsx
```typescript
interface Props {
    title: string;
    value: string | number;
}

export default function StatsCard({
    title,
    value,
}: Props) {
    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500 text-sm">
                {title}
            </h3>

            <p className="text-3xl font-bold mt-2">
                {value}
            </p>
        </div>
    );
}
```

## File: client/components/auth/LoginForm.tsx
```typescript
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Mail, Lock, Eye, EyeOff, Loader2, LogIn } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/store/auth.store';
import { useCartStore } from '@/store/cartStore';

export default function LoginForm() {
  const router = useRouter();
  const { login, loading } = useAuthStore();
  // const

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [cartWarning, setCartWarning] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoginError(null);
      setCartWarning(null);
      await login({ email, password });

      const cartResult = await useCartStore.getState().syncCartAfterLogin();
      if (!cartResult.success) {
        setCartWarning(
          cartResult.message || 'Some cart items could not be synchronized.'
        );
      } else {
        toast.success('Welcome back!');
      }
      router.push('/');
    } catch {
      toast.error('Login failed');
      setLoginError('Login failed. Please check your email and password.');
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-muted/40 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10">
            <LogIn className="size-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to sign in to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-9"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-muted-foreground transition-colors hover:text-primary"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="pl-9 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label="Toggle password visibility"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Error */}
            {loginError && (
              <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                <p className="font-medium">Login failed</p>

                <p className="mt-1">{loginError}</p>
              </div>
            )}

            {/* Cart Warning */}
            {cartWarning && (
              <div className="rounded-md border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800">
                <p className="font-medium">Cart synchronization warning</p>

                <p className="mt-1">{cartWarning}</p>
              </div>
            )}

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="size-4 animate-spin" />}
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="font-medium text-primary hover:underline"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
```

## File: client/components/auth/ProtectedRoute.tsx
```typescript
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { token } = useAuthStore();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  
  if (!token) return null;

  return <>{children}</>;
}
```

## File: client/components/auth/RegisterForm.tsx
```typescript
// "use client";

// import { useState } from "react";
// import { useAuthStore } from "@/store/auth.store";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast"

// export default function RegisterForm() {
//   const router = useRouter();
//   const { register, loading } = useAuthStore();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (
//     e: React.FormEvent
//   ) => {
//     e.preventDefault();

//     try {
//       await register({
//         name,
//         email,
//         password,
//       });

//       router.push("/login");
//     } catch {
//       toast.error("Registration failed");
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="space-y-4 bg-white p-8 rounded-xl shadow-lg"
//     >
//       <h2 className="text-3xl font-bold text-center">
//         Register
//       </h2>

//       <input
//         type="text"
//         placeholder="Name"
//         className="w-full border p-3 rounded-lg"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />

//       <input
//         type="email"
//         placeholder="Email"
//         className="w-full border p-3 rounded-lg"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         className="w-full border p-3 rounded-lg"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button
//         disabled={loading}
//         className="w-full bg-black text-white py-3 rounded-lg"
//       >
//         {loading ? "Loading..." : "Register"}
//       </button>
//     </form>
//   );
// }


"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  UserPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/auth.store";

export default function RegisterForm() {
  const router = useRouter();
  const { register, loading } = useAuthStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register({
        name,
        email,
        password,
      });

      toast.success("Account created! Please log in.");
      router.push("/login");
    } catch {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-muted/40 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10">
            <UserPlus className="size-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Fill in your details to get started
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="pl-9"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-9"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-9 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label="Toggle password visibility"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Use at least 6 characters.
              </p>
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="size-4 animate-spin" />}
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
```

## File: client/components/cart/CartItem.tsx
```typescript
// components/cart/CartItem.tsx

'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import type { CartItem as CartItemType } from '@/types/cart.types';

// interface CartItemProps {
//   item: {
//     id: string;
//     quantity: number;
//     product: {
//       id: string;
//       name: string;
//       // price: number;
//       price: string;
//       images: string[];
//     };
//   };
// }

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { increaseQty, decreaseQty, removeItem } = useCartStore();

  return (
    <div className="flex gap-4 rounded-xl border bg-white p-4 shadow-sm">
      <div className="relative h-24 w-24 overflow-hidden rounded-lg">
        <Image
          src={item.product.images[0]}
          alt={item.product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold">{item.product.name}</h3>
          <p className="text-gray-600">₹{item.product.price}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 rounded-lg border px-3 py-2">
            <button
              onClick={() => decreaseQty(item.id)}
              className="rounded p-1 hover:bg-gray-100"
            >
              <Minus size={18} />
            </button>

            <span className="min-w-[20px] text-center">{item.quantity}</span>

            <button
              onClick={() => increaseQty(item.id)}
              className="rounded p-1 hover:bg-gray-100"
            >
              <Plus size={18} />
            </button>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            className="flex items-center gap-2 text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
```

## File: client/components/cart/OrderSummary.tsx
```typescript
"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function OrderSummary() {
  const { subtotal, totalItems } =
    useCartStore();

  const shipping =
    subtotal() > 1000 ? 0 : 99;

  const total = subtotal() + shipping;

  return (
    <div className="sticky top-24 rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">
        Order Summary
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span>
            Items ({totalItems()})
          </span>
          <span>₹{subtotal()}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>
            {shipping === 0
              ? "FREE"
              : `₹${shipping}`}
          </span>
        </div>

        <hr />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <Link
          href="/checkout"
          className="block w-full rounded-lg bg-black py-3 text-center text-white hover:opacity-90"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
```

## File: client/components/checkout/ShippingForm.tsx
```typescript
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
```

## File: client/components/common/EmptyState.tsx
```typescript
// import Link from "next/link";

// interface Props {
//   title: string;
//   description: string;
//   buttonText?: string;
//   buttonLink?: string;
// }

// export default function EmptyState({
//   title,
//   description,
//   buttonText,
//   buttonLink,
// }: Props) {
//   return (
//     <div className="bg-white rounded-2xl border p-10 text-center">
//       <h2 className="text-2xl font-bold">
//         {title}
//       </h2>

//       <p className="text-slate-500 mt-3">
//         {description}
//       </p>

//       {buttonText && buttonLink && (
//         <Link
//           href={buttonLink}
//           className="inline-block mt-6 bg-indigo-600 text-white px-6 py-3 rounded-xl"
//         >
//           {buttonText}
//         </Link>
//       )}
//     </div>
//   );
// }


import Link from "next/link";
import { Inbox, ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  icon?: React.ReactNode;
}

export default function EmptyState({
  title,
  description,
  buttonText,
  buttonLink,
  icon,
}: Props) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="items-center space-y-4">
          <div className="flex size-14 items-center justify-center rounded-full bg-muted">
            {icon ?? <Inbox className="size-7 text-muted-foreground" />}
          </div>

          <div className="space-y-1.5">
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </CardHeader>

        {buttonText && buttonLink && (
          <CardContent>
            <Link
              href={buttonLink}
              className={cn(buttonVariants(), "gap-2")}
            >
              {buttonText}
              <ArrowRight className="size-4" />
            </Link>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
```

## File: client/components/FilterSidebar.tsx
```typescript
'use client';

import { Category } from '@/types/product.types';

interface FilterSidebarProps {
  categories: Category[];
  selectedCategory: string;
  minPrice: string;
  maxPrice: string;
  onCategoryChange: (id: string) => void;
  onPriceChange: (
    min: string,
    max: string
  ) => void;
  onClearFilters: () => void;
}

export default function FilterSidebar({
  categories,
  selectedCategory,
  minPrice,
  
  maxPrice,
  onCategoryChange,
  onPriceChange,
  onClearFilters,
}: FilterSidebarProps) {
  return (
    <aside className="w-full md:w-72 bg-white rounded-2xl border border-slate-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">
          Filters
        </h3>

        <button
          onClick={onClearFilters}
          className="text-sm text-indigo-600"
        >
          Reset
        </button>
      </div>

      <div className="mb-8">
        <h4 className="font-semibold mb-3">
          Categories
        </h4>

        <div className="space-y-2">
          <button
            onClick={() => onCategoryChange('')}
            className={`block w-full text-left px-3 py-2 rounded-lg ${
              selectedCategory === ''
                ? 'bg-indigo-50 text-indigo-600'
                : 'hover:bg-slate-50'
            }`}
          >
            All Categories
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() =>
                onCategoryChange(category.id)
              }
              className={`block w-full text-left px-3 py-2 rounded-lg ${
                selectedCategory === category.id
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'hover:bg-slate-50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-3">
          Price Range
        </h4>

        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) =>
              onPriceChange(
                e.target.value,
                maxPrice
              )
            }
            className="w-full border border-slate-200 rounded-lg p-2"
          />

          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) =>
              onPriceChange(
                minPrice,
                e.target.value
              )
            }
            className="w-full border border-slate-200 rounded-lg p-2"
          />
        </div>
      </div>
    </aside>
  );
}
```

## File: client/components/Footer.tsx
```typescript
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t bg-white">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}
                    <div>
                        <Link
                            href="/"
                            className="text-xl font-bold text-gray-900"
                        >
                            Your Store
                        </Link>

                        <p className="mt-4 max-w-xs text-sm leading-6 text-gray-600">
                            Discover quality products and enjoy a simple,
                            secure, and convenient shopping experience.
                        </p>
                    </div>

                    {/* Shop */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                            Shop
                        </h3>

                        <ul className="mt-4 space-y-3 text-sm">
                            <li>
                                <Link
                                    href="/products"
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    All Products
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/products"
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    New Arrivals
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/cart"
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    Cart
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Account */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                            Account
                        </h3>

                        <ul className="mt-4 space-y-3 text-sm">
                            <li>
                                <Link
                                    href="/login"
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    Login
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/register"
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    Create Account
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/orders"
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    My Orders
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                            Support
                        </h3>

                        <ul className="mt-4 space-y-3 text-sm">
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    Contact Us
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/shipping"
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    Shipping Information
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/returns"
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    Returns
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 border-t pt-8">
                    <div className="flex flex-col gap-4 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
                        <p>
                            © {new Date().getFullYear()} Your Store. All
                            rights reserved.
                        </p>

                        <div className="flex gap-6">
                            <Link
                                href="/privacy"
                                className="hover:text-gray-900"
                            >
                                Privacy Policy
                            </Link>

                            <Link
                                href="/terms"
                                className="hover:text-gray-900"
                            >
                                Terms & Conditions
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
```

## File: client/components/home/FeaturedCategories.tsx
```typescript
import Link from "next/link";
import { HomeCategory } from "@/types/home.types";
// import { useEffect, useState } from "react";
// import { getAllProducts } from "@/services/product.service";

interface FeaturedCategoriesProps {
    categories: HomeCategory[];
}


// const [selectedCategory, setSelectedCategory] = useState("");

// useEffect(() => {
//   fetchProducts();
// }, [selectedCategory])

// async function fetchProducts(){
//     const data = await getAllProducts({
//         category: selectedCategory,
//     })
// }

export default function FeaturedCategories({
    categories,
}: FeaturedCategoriesProps) {

    if (categories.length === 0) {
        return null;
    }

    return (
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                    Shop by Category
                </h2>

                <p className="mt-2 text-gray-600">
                    Explore our popular categories.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/products?category=${category.id}`}
                        // onClick={setSelectedCategory(category.id)}
                        className="rounded-xl border bg-white p-6 text-center transition hover:-translate-y-1 hover:shadow-md"
                    >
                        <h3 className="font-semibold text-gray-900">
                            {category.name}
                        </h3>
                    </Link>
                ))}
            </div>
        </section>
    );
}
```

## File: client/components/home/FeaturedProducts.tsx
```typescript
import { HomeProduct } from '@/types/home.types';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

interface FeaturedProductsProps {
    products: HomeProduct[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
    if (products.length === 0) {
        return null;
    }

    return (
        <section className="bg-gray-50">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="mb-8 flex items-end justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                            Our selection
                        </p>

                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                            Featured Products
                        </h2>

                        <p className="mt-2 text-gray-600">
                            Explore some of our most recent products.
                        </p>
                    </div>

                    <Link
                        href="/products"
                        className="hidden shrink-0 text-sm font-semibold text-gray-900 hover:underline sm:block"
                    >
                        View all →
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
```

## File: client/components/home/HeroSection.tsx
```typescript
// import Link from "next/link";

// export default function HeroSection() {
//     return (
//         <section className="bg-gray-100">
//             <div className="mx-auto flex min-h-[500px] max-w-7xl items-center px-6 py-16 lg:px-8">
//                 <div className="max-w-2xl">
//                     <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-600">
//                         Welcome to our store
//                     </p>

//                     <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
//                         Discover products you’ll love.
//                     </h1>

//                     <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
//                         Explore our collection of quality products,
//                         discover new arrivals, and find something
//                         perfect for you.
//                     </p>

//                     <div className="mt-8">
//                         <Link
//                             href="/products"
//                             className="inline-flex rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
//                         >
//                             Shop Now
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }

import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="overflow-hidden bg-gray-100">
            <div className="mx-auto flex min-h-[520px] max-w-7xl items-center px-6 py-20 lg:px-8">
                <div className="max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                        Welcome to our store
                    </p>

                    <h1 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl">
                        Find something
                        <br />
                        you'll love.
                    </h1>

                    <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
                        Discover quality products, explore our latest
                        arrivals, and enjoy a simple shopping experience.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link
                            href="/products"
                            className="rounded-lg bg-black px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
                        >
                            Shop Now
                        </Link>

                        {/* <Link
                            href="/products"
                            className="rounded-lg border border-gray-300 bg-white px-7 py-3.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
                        >
                            Explore Products
                        </Link> */}
                    </div>
                </div>
            </div>
        </section>
    );
}
```

## File: client/components/home/NewArrivals.tsx
```typescript
import Link from "next/link";
import { HomeProduct } from "@/types/home.types";
import ProductCard from "@/components/ProductCard";

interface NewArrivalsProps {
    products: HomeProduct[];
}

export default function NewArrivals({
    products,
}: NewArrivalsProps) {
    if (products.length === 0) {
        return null;
    }

    return (
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            {/* <div className="mb-8 flex items-end justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        New Arrivals
                    </h2>

                    <p className="mt-2 text-gray-600">
                        Discover the newest products in our store.
                    </p>
                </div>

                <Link
                    href="/products"
                    className="text-sm font-semibold text-gray-900 hover:underline"
                >
                    View all
                </Link>
            </div> */}

            <div className="mb-8 flex items-end justify-between gap-4">
    <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Just added
        </p>

        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            New Arrivals
        </h2>

        <p className="mt-2 text-gray-600">
            Discover the latest additions to our store.
        </p>
    </div>

    <Link
        href="/products"
        className="hidden shrink-0 text-sm font-semibold text-gray-900 hover:underline sm:block"
    >
        View all →
    </Link>
</div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </section>
    );
}
```

## File: client/components/home/WhyChooseUs.tsx
```typescript
const features = [
    {
        title: "Secure Payment",
        description: "Your payments are securely processed.",
    },
    {
        title: "Fast Delivery",
        description: "Get your orders delivered quickly.",
    },
    {
        title: "Quality Products",
        description: "We offer carefully selected products.",
    },
    {
        title: "Easy Shopping",
        description: "Simple and convenient shopping experience.",
    },
];


export default function WhyChooseUs() {
    return (
        <section className="border-t bg-gray-50">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                        Our promise
                    </p>

                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                        Shopping made simple
                    </h2>

                    <p className="mt-4 text-gray-600">
                        Everything you need for a smooth and convenient
                        shopping experience.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="rounded-2xl border bg-white p-7 transition hover:-translate-y-1 hover:shadow-md"
                        >

                            <h3 className="mt-5 font-semibold text-gray-900">
                                {feature.title}
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
```

## File: client/components/ImageGallery.tsx
```typescript
'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ImageGallery({
  images,
  productName,
}: ImageGalleryProps) {
  const fallbackImage = 'https://via.placeholder.com/600';

  const productImages = images.length > 0 ? images : [fallbackImage];

  const [selectedImage, setSelectedImage] = useState(productImages[0]);

  return (
    <div className="space-y-4">
      {/* Main Image */}

      <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-slate-200 bg-white">
        <Image
          src={selectedImage}
          alt={productName}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* Thumbnails */}

      {productImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {productImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setSelectedImage(image)}
              className={`relative aspect-square rounded-xl overflow-hidden border-2 ${
                selectedImage === image
                  ? 'border-indigo-600'
                  : 'border-slate-200'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} image ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

## File: client/components/Navbar.tsx
```typescript
'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ShoppingCart,
  Store,
  Package,
  LayoutDashboard,
  LogOut,
  CircleUserRound,
  Menu,
} from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth.store';
import { useCartStore } from '@/store/cartStore';


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { storeUser, logout } = useAuthStore();


  // useee

  const handleLogout = async () => {
    await logout();
    useCartStore.getState().clearCart();
    setOpen(false);
    window.location.href = '/';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-primary"
        >
          ECOM
        </Link>

        {/* Desktop Navigation */}
        <nav className="ml-4 hidden items-center md:flex">
          <Link
            href="/products"
            className={cn(buttonVariants({ variant: 'ghost' }), "gap-2 hover:bg-primary/10 hover:text-primary")}
          >
            <Store className="size-4" />
            Products
          </Link>

          <Link
            href="/orders"
            className={cn(buttonVariants({ variant: 'ghost' }), "gap-2 hover:bg-primary/10 hover:text-primary")}
          >
            <Package className="size-4" />
            Orders
          </Link>

          {/* {storeUser?.role === 'ADMIN' && (
            <Link
              href="/admin/dashboard"
              className={cn(buttonVariants({ variant: 'ghost' }), 'gap-2')}
            >
              <LayoutDashboard className="size-4" />
              Admin Dashboard
            </Link>
          )} */}
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-1">
          {/* Cart */}
          <Link
            href="/cart"
            aria-label="Cart"
            className={buttonVariants({ variant: 'ghost', size: 'icon' })}
          >
            <ShoppingCart className="size-5" />
          </Link>

          {/* Desktop auth */}
          {!storeUser ? (
            <div className="hidden items-center gap-2 md:flex">
              <Link
                href="/login"
                className={buttonVariants({ variant: 'ghost' })}
              >
                Login
              </Link>
              <Link href="/register" className={buttonVariants()}>
                Sign Up
              </Link>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" className="hidden gap-2 px-2 md:flex">
                    <Avatar className="size-8">
                      <AvatarFallback>
                        {storeUser.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="max-w-24 truncate">{storeUser.name}</span>
                  </Button>
                }
              />

              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <p className="truncate">{storeUser.name}</p>
                    <p className="truncate text-xs font-normal text-muted-foreground">
                      {storeUser.email}
                    </p>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    render={<Link href="/profile" />}
                    className="cursor-pointer gap-2"
                  >
                    <CircleUserRound className="size-4" />
                    Profile
                  </DropdownMenuItem>

                  {storeUser.role === 'ADMIN' && (
                    <DropdownMenuItem
                      render={<Link href="/admin/dashboard" />}
                      className="cursor-pointer gap-2"
                    >
                      <LayoutDashboard className="size-4" />
                      Admin Dashboard
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                {/* Logout */}
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer gap-2 text-destructive"
                  >
                    <LogOut className="size-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Menu"
                >
                  <Menu className="size-5" />
                </Button>
              }
            />

            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="text-xl font-bold text-primary"
                  >
                    ECOM
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-1">
                <Link
                  href="/products"
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'justify-start gap-2'
                  )}
                >
                  <Store className="size-4" /> Products
                </Link>

                <Link
                  href="/cart"
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'justify-start gap-2'
                  )}
                >
                  <ShoppingCart className="size-4" /> Cart
                </Link>

                <Link
                  href="/orders"
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'justify-start gap-2'
                  )}
                >
                  <Package className="size-4" /> Orders
                </Link>

                {storeUser?.role === 'ADMIN' && (
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setOpen(false)}
                    className={cn(
                      buttonVariants({ variant: 'ghost' }),
                      'justify-start gap-2'
                    )}
                  >
                    <LayoutDashboard className="size-4" /> Admin Dashboard
                  </Link>
                )}

                <div className="my-3 border-t" />

                {!storeUser ? (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setOpen(false)}
                      className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'w-full'
                      )}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setOpen(false)}
                      className={cn(buttonVariants(), 'w-full')}
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/profile"
                      onClick={() => setOpen(false)}
                      className={cn(
                        buttonVariants({ variant: 'ghost' }),
                        'justify-start gap-2'
                      )}
                    >
                      <CircleUserRound className="size-4" /> {storeUser.name}
                    </Link>
                    <Button
                      variant="ghost"
                      className="justify-start gap-2 text-destructive hover:text-destructive"
                      onClick={handleLogout}
                    >
                      <LogOut className="size-4" /> Logout
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
```

## File: client/components/orders/AdminOrderTable.tsx
```typescript
'use client';

import api from '@/lib/axios';
import { Order } from '@/types/order.types';

interface Props {
  orders: Order[];
  refreshOrders: () => void;
}

export default function AdminOrderTable({ orders, refreshOrders }: Props) {
  const updateStatus = async (orderId: string, status: string) => {
    try {
      await api.patch(`admin/orders/${orderId}/status`, {
        status,
      });

      refreshOrders();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-3">Order</th>
          <th>Status</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td className="p-3">{order.id.slice(-6)}</td>

            <td>{order.status}</td>

            <td>₹{order.totalAmount}</td>

            <td>
              <select
                value={order.status}
                onChange={(e) => updateStatus(order.id, e.target.value)}
                className="border p-2 rounded"
              >
                <option value="PENDING">Pending</option>

                <option value="SHIPPED">Shipped</option>

                <option value="DELIVERED">Delivered</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

## File: client/components/orders/OrderCard.tsx
```typescript
'use client';

import Link from 'next/link';
import { CalendarDays, CreditCard, ChevronRight } from 'lucide-react';

import { Order } from '@/types/order.types';
import { Card, CardContent } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import OrderStatusBadge from './OrderStatusBadge';

interface Props {
  order: Order;
}

export default function OrderCard({ order }: Props) {
  return (
    <Card className="transition-colors hover:border-primary/40">
      <CardContent className="space-y-4 p-5">
        {/* Order number + status */}
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-sm font-semibold tracking-wide">
            #{order.id.slice(-6).toUpperCase()}
          </span>
          <OrderStatusBadge status={order.status} />
        </div>

        {/* Date + payment */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-3.5" />
            {new Date(order.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>

          <span className="flex items-center gap-1.5">
            <CreditCard className="size-3.5" />
            Payment: {order.paymentStatus}
          </span>
        </div>

        {/* Total + details link */}
        <div className="flex items-center justify-between border-t pt-4">
          <div>
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-lg font-bold">
              ₹
              {Number(order.totalAmount).toLocaleString('en-IN', {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>

          <Link
            href={`/orders/${order.id}`}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'gap-1 pr-1 text-primary'
            )}
          >
            View Details
            <ChevronRight className="size-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
```

## File: client/components/orders/OrderItem.tsx
```typescript
import { OrderItem as Item } from "@/types/order.types";

interface Props {
  item: Item;
}

export default function OrderItem({ item }: Props) {
  return (
    <div className="flex gap-4 border-b pb-4">
      <img
        src={item.image}
        alt={item.productName}
        className="w-20 h-20 object-cover rounded"
      />

      <div>
        <h4 className="font-semibold">
          {item.productName}
        </h4>

        <p>Qty: {item.quantity}</p>

        <p>₹{item.price}</p>
      </div>
    </div>
  );
}
```

## File: client/components/orders/OrderStatusBadge.tsx
```typescript
import { OrderStatus } from '@/types/order.types';

interface Props {
  status: OrderStatus;
}

const styles: Record<OrderStatus, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  CONFIRMED: 'bg-indigo-100 text-indigo-700',
  PROCESSING: 'bg-purple-100 text-purple-700',
  SHIPPED: 'bg-blue-100 text-blue-700',
  DELIVERED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
};

export default function OrderStatusBadge({ status }: Props) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}
```

## File: client/components/Pagination.tsx
```typescript
'use client';

import {
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-3 mt-10">
            <button
                disabled={currentPage === 1}
                onClick={() =>
                    onPageChange(currentPage - 1)
                }
                className="p-2 border rounded-lg disabled:opacity-50"
            >
                <ChevronLeft />
            </button>

            {Array.from(
                { length: totalPages },
                (_, i) => i + 1
            ).map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-4 py-2 rounded-lg ${currentPage === page
                            ? 'bg-indigo-600 text-white'
                            : 'border'
                        }`}
                >
                    {page}
                </button>
            ))}

            <button
                disabled={currentPage === totalPages}
                onClick={() =>
                    onPageChange(currentPage + 1)
                }
                className="p-2 border rounded-lg disabled:opacity-50"
            >
                <ChevronRight />
            </button>
        </div>
    );
}
```

## File: client/components/ProductCard.tsx
```typescript
"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";
import { Product } from "@/types/product.types";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const productImage =
        product.images?.[0] || "https://via.placeholder.com/400";

    const { addToCart } = useCartStore();

    const handleAddToCart = async () => {
        try {
            await addToCart(product, 1);
            toast.success(`${product.name} added to cart`);
        } catch (error) {
            console.error("Failed to add product to cart:", error);
            toast.error("Failed to add product to cart");
        }
    };

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            
            {/* Product Image */}
            <Link href={`/products/${product.id}`}>
                <div className="relative w-full aspect-square">
                    <Image
                        src={productImage}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>
            </Link>

            {/* Product Information */}
            <div className="p-5">

                {/* Category */}
                <p className="text-sm text-indigo-600 uppercase font-medium">
                    {product.category?.name}
                </p>

                {/* Product Name */}
                <Link href={`/products/${product.id}`}>
                    <h3 className="mt-2 text-xl font-semibold hover:text-indigo-600">
                        {product.name}
                    </h3>
                </Link>

                {/* Description */}
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {product.description || "No description available"}
                </p>

                {/* Price + Add */}
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold">
                        ₹{product.price}
                    </span>

                    <button
                        type="button"
                        onClick={handleAddToCart}
                        disabled={product.stock <= 0}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white ${
                            product.stock <= 0
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-700"
                        }`}
                    >
                        <ShoppingBag size={18} />

                        {product.stock <= 0
                            ? "Out of Stock"
                            : "Add"}
                    </button>
                </div>
            </div>
        </div>
    );
}
```

## File: client/components/ProductGrid.tsx
```typescript
'use client';

import ProductCard from './ProductCard';
import { Product } from '@/types/product.types';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
}

export default function ProductGrid({
  products,
  isLoading,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map(
          (_, index) => (
            <div
              key={index}
              className="h-96 bg-slate-200 rounded-2xl animate-pulse"
            />
          )
        )}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
        <h3 className="text-xl font-bold">
          No products found
        </h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}
```

## File: client/components/RelatedProducts.tsx
```typescript
"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product.types";
import { getRelatedProducts } from "@/services/product.service";
import ProductGrid from "./ProductGrid";

interface RelatedProductsProps {
    categoryId: string;
    currentProductId: string;
}

export default function RelatedProducts({
    categoryId,
    currentProductId,
}: RelatedProductsProps) {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetchRelatedProducts();
    }, [categoryId, currentProductId]);

    async function fetchRelatedProducts() {
        try {
            const products = await getRelatedProducts(categoryId, 5);

            const filtered = products.filter(
                (product: Product) => product.id !== currentProductId
            );
            setProducts(filtered.slice(0, 4));
        } catch (error) {
            console.error("Failed to fetch related products:", error);
        }
    }

    if (!products.length) return null;

    return (
        <section className="mt-16">
            <h2 className="text-3xl font-bold mb-8">
                Related Products
            </h2>

            <ProductGrid
                products={products}
                isLoading={false}
            />
        </section>
    );
}
```

## File: client/components/reviews/ReviewCard.tsx
```typescript
'use client';

import { useState } from 'react';
import StarRating from './StarRating';
import { deleteReview, updateReview } from '@/services/review.service';

import { Review } from '@/types/review.types';

interface ReviewCardProps {
  review: Review;
  currentUserId?: string;
  refresh: () => Promise<void>;
}

export default function ReviewCard({
  review,
  currentUserId,
  refresh,
}: ReviewCardProps) {
  const isOwner = currentUserId === review.userId;

  const [editing, setEditing] = useState(false);
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      setError(null);

      await updateReview(review.id, {
        rating,
        comment: comment.trim() || undefined,
      });

      setEditing(false);

      await refresh();
    } catch (error: any) {
      console.error('Failed to update review:', error);

      setError(error?.response?.data?.message || 'Failed to update review');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this review?'
    );

    if (!confirmed) return;

    try {
      setLoading(true);
      setError(null);

      await deleteReview(review.id);

      await refresh();
    } catch (error: any) {
      console.error('Failed to delete review:', error);

      setError(error?.response?.data?.message || 'Failed to delete review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-xl p-4">
      <div className="flex justify-between gap-4">
        <div>
          <h4 className="font-semibold">{review.user.name}</h4>

          <StarRating rating={editing ? rating : review.rating} />
        </div>

        {!editing && (
          <p className="text-sm text-gray-400">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        )}
      </div>

      {error && (
        <div className="mt-3 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {editing ? (
        <div className="mt-4">
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            disabled={loading}
            className="border p-2 rounded"
          >
            <option value={5}>5 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={2}>2 Stars</option>
            <option value={1}>1 Star</option>
          </select>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={loading}
            className="w-full border p-3 rounded mt-3 min-h-[100px]"
          />

          <div className="flex gap-2 mt-3">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>

            <button
              onClick={() => {
                setEditing(false);
                setRating(review.rating);
                setComment(review.comment || '');
                setError(null);
              }}
              disabled={loading}
              className="border px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          {review.comment && (
            <p className="mt-2 text-gray-600">{review.comment}</p>
          )}

          {isOwner && (
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setEditing(true)}
                disabled={loading}
                className="text-sm text-indigo-600 hover:underline"
              >
                Edit
              </button>

              <button
                onClick={handleDelete}
                disabled={loading}
                className="text-sm text-red-600 hover:underline disabled:opacity-50"
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
```

## File: client/components/reviews/ReviewForm.tsx
```typescript
// 'use client';

// import { useState } from 'react';

// import { createReview } from '@/lib/reviewApi';

// export default function ReviewForm({ productId, refresh }: any) {
//     const [rating, setRating] = useState(5);

//     const [comment, setComment] = useState('');

//     const submit = async () => {
//         await createReview({
//             productId,
//             rating,
//             comment,
//         });

//         setComment('');

//         refresh();
//     };

//     return (
//         <div className="border rounded-xl p-5">
//             <h3 className="font-bold mb-3">Write Review</h3>

//             <select
//                 value={rating}
//                 onChange={(e) => setRating(Number(e.target.value))}
//                 className="border p-2 rounded"
//             >
//                 <option value={5}>5 Stars</option>
//                 <option value={4}>4 Stars</option>
//                 <option value={3}>3 Stars</option>
//                 <option value={2}>2 Stars</option>
//                 <option value={1}>1 Star</option>
//             </select>

//             <textarea
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//                 className="w-full border p-3 rounded mt-3"
//             />

//             <button
//                 onClick={submit}
//                 className="bg-indigo-600 text-white px-5 py-2 rounded mt-3"
//             >
//                 Submit Review
//             </button>
//         </div>
//     );
// }

'use client';

import { useState } from 'react';
import { createReview } from '@/services/review.service';

interface ReviewFormProps {
    productId: string;
    refresh: () => Promise<void>;
}

export default function ReviewForm({ productId, refresh }: ReviewFormProps) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submit = async () => {
        try {
            setLoading(true);
            setError(null);

            await createReview({
                productId,
                rating,
                comment: comment.trim() || undefined,
            });

            setComment('');
            setRating(5);

            await refresh();
        } catch (error: any) {
            console.error('Failed to create review:', error);

            setError(error?.response?.data?.message || 'Failed to submit review');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border rounded-xl p-5">
            <h3 className="font-bold mb-3">Write Review</h3>

            {error && (
                <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600">
                    {error}
                </div>
            )}

            <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                disabled={loading}
                className="border p-2 rounded"
            >
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
            </select>

            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={loading}
                placeholder="Share your experience..."
                className="w-full border p-3 rounded mt-3 min-h-[120px]"
            />

            <button
                onClick={submit}
                disabled={loading}
                className="bg-indigo-600 text-white px-5 py-2 rounded mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? 'Submitting...' : 'Submit Review'}
            </button>
        </div>
    );
}
```

## File: client/components/reviews/ReviewSection.tsx
```typescript
'use client';

import { useCallback, useEffect, useState } from 'react';

import { getReviews } from '@/services/review.service';

import StarRating from './StarRating';
import ReviewForm from './ReviewForm';
import ReviewCard from './ReviewCard';

import { ReviewResponse } from '@/types/review.types';
import { useAuthStore } from '@/store/auth.store';

interface ReviewSectionProps {
  productId: string;
}

export default function ReviewSection({ productId }: ReviewSectionProps) {

  const [data, setData] = useState<ReviewResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const user = useAuthStore((state) => state.storeUser);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const reviews = await getReviews(productId);

      setData(reviews);
    } catch (error) {
      console.error('Failed to load reviews:', error);

      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-6">Reviews</h2>

        <div className="space-y-4">
          <div className="h-24 bg-slate-200 animate-pulse rounded-xl" />
          <div className="h-24 bg-slate-200 animate-pulse rounded-xl" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-6">Reviews</h2>

        <div className="border border-red-200 bg-red-50 rounded-xl p-5">
          <p className="text-red-600">{error}</p>

          <button
            onClick={load}
            className="mt-3 text-sm text-indigo-600 hover:underline"
          >
            Try again
          </button>
        </div>
      </section>
    );
  }

  if (!data) return null;

  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold mb-6">Reviews</h2>

      {/* Rating Summary */}
      <div className="mb-8">
        <div className="text-4xl font-bold">{data.avgRating.toFixed(1)}</div>

        <StarRating rating={Math.round(data.avgRating)} />

        <p className="text-gray-500">
          {data.totalReviews} {data.totalReviews === 1 ? 'Review' : 'Reviews'}
        </p>
      </div>

      {/* Review Form */}
      {user ? (
        <ReviewForm productId={productId} refresh={load} />
      ) : (
        <div className="border rounded-xl p-5 mb-8">
          <p className="text-gray-600">Please login to write a review.</p>
        </div>
      )}

      {/* Reviews */}
      <div className="mt-8 space-y-4">
        {data.reviews.length === 0 ? (
          <div className="text-center py-10 border rounded-xl">
            <p className="text-gray-500">No reviews yet.</p>

            <p className="text-sm text-gray-400 mt-1">
              Be the first to review this product.
            </p>
          </div>
        ) : (
          data.reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              currentUserId={user?.id}
              refresh={load}
            />
          ))
        )}
      </div>
    </section>
  );
}
```

## File: client/components/reviews/StarRating.tsx
```typescript
"use client";

interface Props {
  rating: number;
}

export default function StarRating({
  rating,
}: Props) {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(
        (star) => (
          <span
            key={star}
            className={
              star <= rating
                ? "text-yellow-500"
                : "text-gray-300"
            }
          >
            ★
          </span>
        )
      )}
    </div>
  );
}
```

## File: client/components/SearchBar.tsx
```typescript
'use client';

import { Search, X } from 'lucide-react';

interface SearchBarProps {
    value: string;
    onChange: (query: string) => void;
}

export default function SearchBar({
    value,
    onChange,
}: SearchBarProps) {
    return (
        <div className="relative w-full max-w-lg">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />

            <input
                type="text"
                placeholder="Search products..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {value && (
                <button
                    onClick={() => onChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                    <X className="w-4 h-4 text-slate-500" />
                </button>
            )}
        </div>
    );
}
```

## File: client/components/SortDropdown.tsx
```typescript
'use client';

import { ArrowUpDown } from 'lucide-react';

interface SortDropdownProps {
  sortBy: string;
  order: 'asc' | 'desc';
  onSortChange: (
    sortBy: string,
    order: 'asc' | 'desc'
  ) => void;
}

export default function SortDropdown({
  sortBy,
  order,
  onSortChange,
}: SortDropdownProps) {
  const currentValue = `${sortBy}-${order}`;

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const [field, direction] =
      e.target.value.split('-');

    onSortChange(
      field,
      direction as 'asc' | 'desc'
    );
  };

  return (
    <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl border border-slate-200">
      <ArrowUpDown className="w-4 h-4 text-slate-400" />

      <select
        value={currentValue}
        onChange={handleChange}
        className="bg-transparent focus:outline-none"
      >
        <option value="createdAt-desc">
          Newest
        </option>
        <option value="price-asc">
          Price Low → High
        </option>
        <option value="price-desc">
          Price High → Low
        </option>
        <option value="name-asc">
          Name A → Z
        </option>
      </select>
    </div>
  );
}
```

## File: client/components/StockIndicator.tsx
```typescript
interface StockIndicatorProps {
    stock: number;
}

export default function StockIndicator({
    stock,
}: StockIndicatorProps) {
    if (stock <= 0) {
        return (
            <span className="inline-block px-4 py-2 rounded-full bg-red-100 text-red-600 font-medium">
                Out of Stock
            </span>
        );
    }

    if (stock <= 5) {
        return (
            <span className="inline-block px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-medium">
                Only {stock} left
            </span>
        );
    }

    return (
        <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium">
            In Stock
        </span>
    );
}
```

## File: client/components/ui/alert-dialog.tsx
```typescript
"use client"

import * as React from "react"
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog"
import { cn } from "cn"

import { Button } from "@/components/ui/button"

function AlertDialog({ ...props }: AlertDialogPrimitive.Root.Props) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

function AlertDialogTrigger({ ...props }: AlertDialogPrimitive.Trigger.Props) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  )
}

function AlertDialogPortal({ ...props }: AlertDialogPrimitive.Portal.Props) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  )
}

function AlertDialogOverlay({
  className,
  ...props
}: AlertDialogPrimitive.Backdrop.Props) {
  return (
    <AlertDialogPrimitive.Backdrop
      data-slot="alert-dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogContent({
  className,
  size = "default",
  ...props
}: AlertDialogPrimitive.Popup.Props & {
  size?: "default" | "sm"
}) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Popup
        data-slot="alert-dialog-content"
        data-size={size}
        className={cn(
          "group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(
        "grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogMedia({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-media"
      className={cn(
        "mb-2 inline-flex size-10 items-center justify-center rounded-md bg-muted sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-6",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn(
        "font-heading text-base font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn(
        "text-sm text-balance text-muted-foreground md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="alert-dialog-action"
      className={cn(className)}
      {...props}
    />
  )
}

function AlertDialogCancel({
  className,
  variant = "outline",
  size = "default",
  ...props
}: AlertDialogPrimitive.Close.Props &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-cancel"
      className={cn(className)}
      render={<Button variant={variant} size={size} />}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
}
```

## File: client/components/ui/alert.tsx
```typescript
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const alertVariants = cva(
  "group/alert relative grid w-full gap-0.5 rounded-lg border px-2.5 py-2 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-sm text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
        className
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-2 right-2", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction }
```

## File: client/components/ui/avatar.tsx
```typescript
"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"
import { cn } from "cn"

function Avatar({
  className,
  size = "default",
  ...props
}: AvatarPrimitive.Root.Props & {
  size?: "default" | "sm" | "lg"
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full rounded-full object-cover",
        className
      )}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs",
        className
      )}
      {...props}
    />
  )
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none",
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
        className
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
}
```

## File: client/components/ui/badge.tsx
```typescript
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
```

## File: client/components/ui/button.tsx
```typescript
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
```

## File: client/components/ui/card.tsx
```typescript
import * as React from "react"
import { cn } from "cn"

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
```

## File: client/components/ui/dropdown-menu.tsx
```typescript
"use client"

import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { cn } from "cn"
import { ChevronRightIcon, CheckIcon } from "lucide-react"

function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
}

function DropdownMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn("z-50 max-h-(--available-height) w-(--anchor-width) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95", className )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: MenuPrimitive.GroupLabel.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: MenuPrimitive.Item.Props & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-popup-open:bg-accent data-popup-open:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </MenuPrimitive.SubmenuTrigger>
  )
}

function DropdownMenuSubContent({
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 0,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={cn("w-auto min-w-[96px] rounded-lg bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className )}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <MenuPrimitive.CheckboxItemIndicator>
          <CheckIcon
          />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <MenuPrimitive.RadioItemIndicator>
          <CheckIcon
          />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
```

## File: client/components/ui/input.tsx
```typescript
import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }
```

## File: client/components/ui/label.tsx
```typescript
"use client"

import * as React from "react"
import { cn } from "cn"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
```

## File: client/components/ui/select.tsx
```typescript
"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"
import { cn } from "cn"
import { ChevronDownIcon, CheckIcon, ChevronUpIcon } from "lucide-react"

const Select = SelectPrimitive.Root

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-1", className)}
      {...props}
    />
  )
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex flex-1 text-left", className)}
      {...props}
    />
  )
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "flex w-fit items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        render={
          <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />
        }
      />
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn("relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn("px-1.5 py-1 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 shrink-0 gap-2 whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
        }
      >
        <CheckIcon className="pointer-events-none" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronUpIcon
      />
    </SelectPrimitive.ScrollUpArrow>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronDownIcon
      />
    </SelectPrimitive.ScrollDownArrow>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
```

## File: client/components/ui/separator.tsx
```typescript
"use client"

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"
import { cn } from "cn"

function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
```

## File: client/components/ui/sheet.tsx
```typescript
"use client"

import * as React from "react"
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

function Sheet({ ...props }: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({ ...props }: SheetPrimitive.Portal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({ className, ...props }: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: SheetPrimitive.Popup.Props & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=bottom]:data-ending-style:translate-y-[2.5rem] data-[side=bottom]:data-starting-style:translate-y-[2.5rem] data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:data-ending-style:translate-x-[-2.5rem] data-[side=left]:data-starting-style:translate-x-[-2.5rem] data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:data-ending-style:translate-x-[2.5rem] data-[side=right]:data-starting-style:translate-x-[2.5rem] data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:data-ending-style:translate-y-[-2.5rem] data-[side=top]:data-starting-style:translate-y-[-2.5rem] data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-3 right-3"
                size="icon-sm"
              />
            }
          >
            <XIcon
            />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Popup>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-0.5 p-4", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "font-heading text-base font-medium text-foreground",
        className
      )}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: SheetPrimitive.Description.Props) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
```

## File: client/components/ui/skeleton.tsx
```typescript
import { cn } from "cn"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
```

## File: client/components/ui/textarea.tsx
```typescript
import * as React from "react"
import { cn } from "cn"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
```

## File: client/eslint.config.mjs
```javascript
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
```

## File: client/hooks/useDebounce.ts
```typescript
"use client";

import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}
```

## File: client/lib/axios.ts
```typescript
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if(typeof window !== "undefined"){
    const authStorage = localStorage.getItem("auth-storage");

    if(authStorage){
      try {
        const parsedAuth = JSON.parse(authStorage);

        // console.log(parsedAuth?.state)
        // console.log(parsedAuth?.state?.token)

        const token = parsedAuth?.state?.token;
        if(token){
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Failed to parse auth storage:", error);
      }
    }
  }

  return config;
});

export default api;




// import axios from 'axios';
// import { useAuthStore } from '../store/auth.store';

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   withCredentials: true,
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = useAuthStore.getState().token;

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// let isRefreshing = false;
// let failedQueue: Array<any> = [];

// const processQueue = (error: any, token: string | null = null) => {
//   failedQueue.forEach((promise) => {
//     if (error) {
//       promise.reject(error);
//     } else {
//       promise.resolve(token);
//     }
//   });

//   failedQueue = [];
// };

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then((token) => {
//           originalRequest.headers.Authorization = `Bearer ${token}`;
//           return api(originalRequest);
//         });
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const res = await axios.post(
//           `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
//           {},
//           { withCredentials: true }
//         );

//         const newToken = res.data.accessToken;

//         useAuthStore.getState().setToken(newToken);

//         processQueue(null, newToken); // call processQueue

//         originalRequest.headers.Authorization = `Bearer ${newToken}`;

//         return api(originalRequest);
//       } catch (err) {
//         processQueue(err, null);
//         useAuthStore.getState().logout();
//         return Promise.reject(err);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;
```

## File: client/lib/cartApi.ts
```typescript
import {
  AddToCartPayload,
  SyncCartItem,
  UpdateCartItemPayload,
} from '@/types/cart.types';
import api from './axios';

export const getCart = async () => {
  const res = await api.get('/cart');
  return res.data;
};

export const addToCartApi = async (productId: string, quantity: number) => {
  const payload: AddToCartPayload = {
    productId,
    quantity,
  };

  const res = await api.post('/cart', payload);

  return res.data;
};

export const updateCartItemApi = async (itemId: string, quantity: number) => {
  const payload: UpdateCartItemPayload = {
    quantity,
  };
  const res = await api.put(`/cart/${itemId}`, payload);

  return res.data;
};

export const removeCartItemApi = async (itemId: string) => {
  const res = await api.delete(`/cart/${itemId}`);
  return res.data;
};

export const clearCartApi = async () => {
  const response = await api.delete('/cart/clear');

  return response.data;
};

export const syncCartApi = async (items: SyncCartItem[]) => {
  const res = await api.post('/cart/sync', {
    items,
  });

  return res.data;
};
```

## File: client/lib/checkoutApi.ts
```typescript
import api from "./axios";
import {
  ShippingAddress,
  CheckoutResponse,
} from "@/types/checkout.types";



export const createCheckout = async (
    shippingAddress: ShippingAddress
): Promise<CheckoutResponse> => {
    const res = await api.post("/checkout", {
        shippingAddress,
    });

    return res.data.data;
};
```

## File: client/lib/paymentApi.ts
```typescript
import api from "./axios";


// export const createCheckoutSession =
//   async (shippingAddress: any) => {
//     const res = await api.post(
//       "/payments/checkout",
//       {
//         shippingAddress,
//       }
//     );

//     return res.data.data;
//   };

export const getLatestOrder =
  async () => {
    const res = await api.get(
      "/payments/latest-order"
    );

    return res.data.data;
  };
```

## File: client/lib/reviewApi.ts
```typescript
import api from './axios';

export const getReviews = async (productId: string) => {
  const res = await api.get(`/reviews/${productId}`);

  return res.data.data;
};

export const createReview = async (payload: {
  productId: string;
  rating: number;
  comment: string;
}) => {
  const res = await api.post('/reviews', payload);

  return res.data.data;
};
```

## File: client/lib/utils.ts
```typescript
export { cn } from "cn"
```

## File: client/next-env.d.ts
```typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "./.next/dev/types/routes.d.ts";

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.
```

## File: client/next.config.ts
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        // hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
```

## File: client/package.json
```json
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@base-ui/react": "^1.8.0",
    "@hookform/resolvers": "^5.4.0",
    "@stripe/stripe-js": "^9.6.0",
    "axios": "^1.16.0",
    "class-variance-authority": "^0.7.1",
    "cn": "^0.2.6",
    "lucide-react": "^1.16.0",
    "next": "16.2.4",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "react-hook-form": "^7.76.1",
    "react-hot-toast": "^2.6.0",
    "recharts": "^3.8.1",
    "shadcn": "^4.21.0",
    "tw-animate-css": "^1.4.0",
    "zod": "^4.4.3",
    "zustand": "^5.0.13"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.4",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

## File: client/postcss.config.mjs
```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

## File: client/services/category.service.ts
```typescript
import api from "@/lib/axios";
import { Category } from "@/types/product.types";

export const getAllCategories = async (): Promise<Category[]> => {
    const response = await api.get<{data: Category[]}>("/categories");

    return response.data.data;
}
```

## File: client/services/home.service.ts
```typescript
import api from "@/lib/axios";
import {
    HomeApiResponse,
    HomeData,
} from "@/types/home.types";

const getHomeData = async (): Promise<HomeData> => {
    const response = await api.get<HomeApiResponse>("/home");

    return response.data.data;
};

export { getHomeData };
```

## File: client/services/order.service.ts
```typescript
import api from "@/lib/axios";
import {} from "@/types/order.types"
```

## File: client/services/product.service.ts
```typescript
import api from "@/lib/axios";
import {
    Product,
    ProductFormData,
    ProductsResponse,
    SingleProductResponse,
} from "@/types/product.types";


// private -------------------
export const adminProductsService = async (): Promise<ProductsResponse> => {
    const product = await api.get("/admin/products");
    return product.data.data;
}

export const createProductService = async (data: ProductFormData): Promise<Product> => {
  const response = await api.post<{ data: Product }>("/admin/products/create", data);
  return response.data.data;
};

export const updateProductService = async (id: string, data: Partial<ProductFormData>): Promise<Product> => {
  const response = await api.patch<{ data: Product }>(`/admin/products/${id}`,data);
  return response.data.data;
};

export const deleteProductService = async (id: string):Promise<void> => {
    await api.delete(`/admin/products/${id}`);
}



// Public ------------------
export const getAllProducts = async (
    params: {
        search?: string;
        category?: string;
        minPrice?: string;
        maxPrice?: string;
        sortBy?: string;
        order?: "asc" | "desc";
        page?: number;
        limit?: number;
    }
): Promise<ProductsResponse> => {

    const response = await api.get<{ data: ProductsResponse }>("/products", {
        params,
    });

    return response.data.data;
};

export const getProductById = async (id:string): Promise<Product> => {
    const response  = await api.get<SingleProductResponse>(`/products/${id}`);

    return response.data.data;
}

export const getRelatedProducts = async (
    categoryId: string,
    limit: number = 4
): Promise<Product[]> => {

    const response = await api.get<{
        data: ProductsResponse;
    }>("/products", {
        params: {
            category: categoryId,
            limit,
        },
    });

    return response.data.data.products;
};
```

## File: client/services/review.service.ts
```typescript
// import api from "@/lib/axios";

// export const getReviews = async (productId: string) => {
//   const res = await api.get(`/reviews/${productId}`);

//   return res.data.data;
// };

// export const createReview = async (payload: {
//   productId: string;
//   rating: number;
//   comment: string;
// }) => {
//   const res = await api.post('/reviews', payload);

//   return res.data.data;
// };





import api from "@/lib/axios";

export interface CreateReviewPayload {
  productId: string;
  rating: number;
  comment?: string;
}

export interface UpdateReviewPayload {
  rating: number;
  comment?: string;
}

export const getReviews = async (productId: string) => {
  const response = await api.get(`/reviews/${productId}`);

  return response.data.data;
};

export const createReview = async (
  payload: CreateReviewPayload
) => {
  const response = await api.post("/reviews", payload);

  return response.data.data;
};

export const updateReview = async (
  reviewId: string,
  payload: UpdateReviewPayload
) => {
  const response = await api.put(
    `/reviews/${reviewId}`,
    payload
  );

  return response.data.data;
};

export const deleteReview = async (
  reviewId: string
) => {
  const response = await api.delete(
    `/reviews/${reviewId}`
  );

  return response.data.data;
};
```

## File: client/store/auth.store.ts
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '@/lib/axios';
import { LoginPayload, RegisterPayload, User } from '@/types/auth.types';

interface AuthState {
  storeUser: User | null;
  token: string | null;
  loading: boolean;

  setToken: (token: string) => void;
  login: (data: LoginPayload) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      storeUser: null,
      token: null,
      loading: false,

      setToken: (token) => {
        set({ token });
      },

      login: async (data) => {
        set({ loading: true });

        try {
          const res = await api.post('/auth/login', data);

          set({
            storeUser: res.data.data.user || null,
            token: res.data.data.accessToken || null,
          });
        } finally {
          set({ loading: false });
        }
      },

      register: async (data) => {
        set({ loading: true });

        try {
          await api.post('/auth/register', data);
        } finally {
          set({ loading: false });
        }
      },

      logout: async () => {
        try {
          await api.post('/auth/logout');
        } catch {
          // Even if the backend logout fails,
          // clear the local authentication state.
        }

        set({
          storeUser: null,
          token: null,
        });
      },
    }),
    {
      name: 'auth-storage',

      partialize: (state) => ({
        storeUser: state.storeUser,
        token: state.token,
      }),
    }
  )
);
```

## File: client/store/cartStore.ts
```typescript
// store/cartStore.ts

'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  addToCartApi,
  getCart,
  removeCartItemApi,
  syncCartApi,
  updateCartItemApi,
  clearCartApi,
} from '@/lib/cartApi';
import type { CartItem, CartProduct, SyncCartItem } from '@/types/cart.types';
import { useAuthStore } from './auth.store';
import axios from 'axios';

interface CartState {
  cartItems: CartItem[];
  loading: boolean;

  fetchCart: () => Promise<void>;
  addToCart: (product: CartProduct, quantity?: number) => Promise<void>;
  increaseQty: (itemId: string) => Promise<void>;
  decreaseQty: (itemId: string) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  syncCartAfterLogin: () => Promise<{success: boolean; message: string | null; }>;

  subtotal: () => number;
  totalItems: () => number;
}

// const { token } = useAuthStore.getState();

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      loading: false,

      fetchCart: async () => {
        try {
          set({ loading: true });
          const data = await getCart();

          set({
            cartItems: data.data?.items || [],
          });
        } catch (error) {
          console.error('Failed to fetch cart:', error);
        } finally {
          set({ loading: false });
        }
      },

      addToCart: async (product, quantity = 1) => {
        try {
          // const token = localStorage.getItem('token');
          const { token } = useAuthStore.getState();

          if (!token) {
            const existing = get().cartItems.find(
              (item) => item.productId === product.id
            );

            if (existing) {
              set({
                cartItems: get().cartItems.map((item) =>
                  item.productId === product.id
                    ? {
                      ...item,
                      quantity: item.quantity + quantity,
                    }
                    : item
                ),
              });
            } else {
              set({
                cartItems: [
                  ...get().cartItems,
                  {
                    id: crypto.randomUUID(),
                    cartId: '',
                    productId: product.id,
                    quantity,
                    product,
                  },
                ],
              });
            }

            return;
          }

          await addToCartApi(product.id, quantity);
          await get().fetchCart();
        } catch (error) {
          console.error('Failed to add item:', error);
        }
      },

      increaseQty: async (itemId) => {
        const item = get().cartItems.find((item) => item.id === itemId);

        if (!item) return;

        try {
          // const token = localStorage.getItem('token');
          const { token } = useAuthStore.getState();

          if (!token) {
            set({
              cartItems: get().cartItems.map((cartItem) =>
                cartItem.id === itemId
                  ? {
                    ...cartItem,
                    quantity: cartItem.quantity + 1,
                  }
                  : cartItem
              ),
            });

            return;
          }

          await updateCartItemApi(itemId, item.quantity + 1);

          await get().fetchCart();
        } catch (error) {
          console.error(error);
        }
      },

      decreaseQty: async (itemId) => {
        const item = get().cartItems.find((item) => item.id === itemId);

        if (!item) return;

        try {
          // const token = localStorage.getItem('token');
          const { token } = useAuthStore.getState();

          if (!token) {
            if (item.quantity <= 1) {
              set({
                cartItems: get().cartItems.filter(
                  (cartItem) => cartItem.id !== itemId
                ),
              });
            } else {
              set({
                cartItems: get().cartItems.map((cartItem) =>
                  cartItem.id === itemId
                    ? {
                      ...cartItem,
                      quantity: cartItem.quantity - 1,
                    }
                    : cartItem
                ),
              });
            }

            return;
          }

          if (item.quantity <= 1) {
            await removeCartItemApi(itemId);
          } else {
            await updateCartItemApi(itemId, item.quantity - 1);
          }

          await get().fetchCart();
        } catch (error) {
          console.error(error);
        }
      },

      removeItem: async (itemId) => {
        try {
          // const token = localStorage.getItem('token');
          const { token } = useAuthStore.getState();

          if (!token) {
            set({
              cartItems: get().cartItems.filter((item) => item.id !== itemId),
            });
            return;
          }

          await removeCartItemApi(itemId);
          await get().fetchCart();
        } catch (error) {
          console.error('Failed to remove item:', error);
        }
      },

      clearCart: async () => {
        try {
          set({ loading: true });
          const { token } = useAuthStore.getState();
          if (!token) {
            set({
              cartItems: [],
              loading: false,
            });
            return;
          }
          await clearCartApi();

          set({
            cartItems: [],
          });
        } catch (error) {
          console.error(error);
        } finally {
          set({ loading: false });
        }
      },

      syncCartAfterLogin: async () => {
        // const token = localStorage.getItem('token');
        const { token } = useAuthStore.getState();

        if (!token) return{
            success: false,
            message: "You are not authenticated.",
          };

        const localItems = get().cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        }));

        // Nothing to sync
        if (localItems.length === 0) {
          await get().fetchCart();
          return {
            success: true,
            message: null,
          };
        }

        try {
          set({ loading: true });

          // Send guest cart to backend
          await syncCartApi(localItems);

          // Clear local guest cart
          set({
            cartItems: [],
          });

          // Fetch merged database cart
          await get().fetchCart();
          
          return {
            success: true,
            message: null,
          };
        } catch (error) {
          console.error('Cart synchronization failed:', error);
          let message = "We couldn't synchronize your cart.";
          if (axios.isAxiosError(error)) {
            message =
              error.response?.data?.message ||
              'Some items could not be added to your cart.';
          }

          return {
            success: false,
            message,
          };
        } finally {
          set({ loading: false });
        }
      },

      subtotal: () => {
        //TODO: CHEK HERE item.product.price
        return get().cartItems.reduce(
          (sum, item) => sum + Number(item.product.price) * item.quantity,
          0
        );
      },

      totalItems: () => {
        return get().cartItems.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'guest-cart',
    }
  )
);
```

## File: client/tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}
```

## File: client/types/admin.ts
```typescript
export interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalSales: number;
  revenueByMonth: {
    createdAt: string;
    _sum: {
      totalAmount: number;
    };
  }[];
  lowStockProducts: {
    id: string;
    name: string;
    stock: number;
  }[];
  recentOrders: any[];
}
```

## File: client/types/auth.types.ts
```typescript
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
}
```

## File: client/types/cart.types.ts
```typescript
// export interface CartProduct {
//     id: string;
//     name: string;
//     price: string;
//     // price: number;
//     images: string[];
//     stock: number;
// }

// export interface CartItem {
//     id: string;
//     cartId?: string;
//     productId: string;
//     quantity: number;
//     product: CartProduct;
// }

// export interface Cart {
//     id?: string;
//     userId?: string;
//     items: CartItem[];
//     createdAt?: string;
//     updatedAt?: string;
// }

// export interface AddToCartPayload {
//     productId: string;
//     quantity: number;
// }

// export interface UpdateCartItemPayload {
//     quantity: number;
// }

// export interface SyncCartItem {
//     productId: string;
//     quantity: number;
// }

// export interface CartApiResponse<T> {
//     statusCode: number;
//     message: string;
//     data: T;
//     success: boolean;
// }


export interface CartProduct {
    id: string;
    name: string;
    price: string;
    images: string[];
    stock: number;
}

export interface CartItem {
    id: string;
    cartId: string;
    productId: string;
    quantity: number;
    product: CartProduct;
}

export interface Cart {
    id: string;
    userId: string;
    items: CartItem[];
    createdAt?: string;
    updatedAt?: string;
}

export interface AddToCartPayload {
    productId: string;
    quantity: number;
}

export interface UpdateCartItemPayload {
    quantity: number;
}

export interface SyncCartItem {
    productId: string;
    quantity: number;
}

export interface CartApiResponse<T> {
    statusCode: number;
    message: string;
    data: T;
    success: boolean;
}
```

## File: client/types/checkout.types.ts
```typescript
export interface ShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface CheckoutResponse {
  url: string;
  sessionId: string;
  subtotal: number;
  shipping: number;
  total: number;
}
```

## File: client/types/home.types.ts
```typescript
export interface HomeCategory {
    id: string;
    name: string;
}

export interface HomeProduct {
    // id: string;
    // name: string;
    // price: string;
    // images: string[];
    // stock: number;
    // categoryId: string;

    id: string;
      name: string;
      description?: string | null;
      price: string; // ← change this
      stock: number;
      images: string[];
      isActive: boolean;
      categoryId: string;
      adminId: string;
      createdAt: string;
      updatedAt: string;
      category: HomeCategory;
}

export interface HomeData {
    featuredCategories: HomeCategory[];
    featuredProducts: HomeProduct[];
    newArrivals: HomeProduct[];
}

export interface HomeApiResponse {
    statusCode: number;
    data: HomeData;
    message: string;
    success: boolean;
}
```

## File: client/types/order.types.ts
```typescript
export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";


export type PaymentStatus =
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "REFUNDED";


export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productImage?: string | null;
  quantity: number;
  price: number | string;
  createdAt: string;
}


export interface Order {
  id: string;
  userId: string;
  totalAmount: number | string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentIntentId?: string | null;
  shippingName: string;
  shippingPhone: string;
  shippingAddress1: string;
  shippingAddress2?: string | null;
  shippingCity: string;
  shippingState: string;
  shippingPostalCode: string;
  shippingCountry: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}


// export interface OrderItem {
//   id: string;
//   productId: string;
//   productName: string;
//   image: string;
//   price: number;
//   quantity: number;
// }

// export interface ShippingAddress {
//   fullName: string;
//   phone: string;
//   address: string;
//   city: string;
//   state: string;
//   zipCode: string;
// }

// type orderStatus = "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";

// export interface Order {
//   id: string;
//   totalAmount: number;
//   status: orderStatus;
//   createdAt: string;
//   shippingAddress: ShippingAddress;
//   orderItems: OrderItem[];
// }
```

## File: client/types/product.types.ts
```typescript
export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string | null;
  price: string; // ← change this
  stock: number;
  images: string[];
  isActive: boolean;
  categoryId: string;
  adminId: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
}

export interface ProductPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ProductsResponse {
  products: Product[];
  pagination: ProductPagination;
}

export interface SingleProductResponse {
  data: Product;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  images: string[];
}
```

## File: client/types/review.types.ts
```typescript
// export interface ReviewUser {
//     id: string;
//     name: string;
// }

// export interface Review {
//     id: string;
//     rating: number;
//     comment: string | null;
//     user: ReviewUser;
// }

// export interface ReviewResponse {
//     avgRating: number;
//     totalReviews: number;
//     reviews: Review[];
// }

export interface ReviewUser {
  name: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string | null;
  userId: string;
  productId: string;
  createdAt: string;
  user: ReviewUser;
}

export interface ReviewResponse {
  reviews: Review[];
  avgRating: number;
  totalReviews: number;
}
```

