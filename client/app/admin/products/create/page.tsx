import ProductForm from "@/components/admin/ProductForm";

export default function CreateProductPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">
        Add Product
      </h1>

      <ProductForm />
    </div>
  );
}