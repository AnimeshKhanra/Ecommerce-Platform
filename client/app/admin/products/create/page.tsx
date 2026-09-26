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