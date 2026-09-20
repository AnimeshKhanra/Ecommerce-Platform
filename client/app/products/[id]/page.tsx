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



// export default function ProductDetailPage() {
//     const params = useParams();
//     const id = params.id as string;

//     const [product, setProduct] = useState<Product | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         fetchProduct();
//     }, [id]);

//     async function fetchProduct() {
//         try {
//             setLoading(true);
//             const data = await getProductById(id);
//             // await api.get<SingleProductResponse>(
//             //     `/products/${id}`
//             // );

//             setProduct(data);
//         } catch (error) {
//             console.error('Failed to fetch product:', error);
//             setError('Product not found');
//         } finally {
//             setLoading(false);
//         }
//     }

//     // Loading
//     if (loading) {
//         return (
//             <div className="max-w-7xl mx-auto px-6 py-10">
//                 <div className="grid md:grid-cols-2 gap-10">
//                     <div className="h-[500px] bg-slate-200 animate-pulse rounded-2xl" />
//                     <div className="space-y-4">
//                         <div className="h-6 w-32 bg-slate-200 rounded" />
//                         <div className="h-10 w-full bg-slate-200 rounded" />
//                         <div className="h-24 w-full bg-slate-200 rounded" />
//                         <div className="h-10 w-40 bg-slate-200 rounded" />
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     // Error
//     if (error || !product) {
//         return (
//             <div className="min-h-screen flex flex-col items-center justify-center">
//                 <h1 className="text-2xl font-bold">
//                     Product not found
//                 </h1>
//                 <Link
//                     href="/products"
//                     className="mt-4 text-indigo-600"
//                 >
//                     Back to Products
//                 </Link>
//             </div>
//         );
//     }


//     return (
//         <div className="max-w-7xl mx-auto px-6 py-10">
//             <div className="grid md:grid-cols-2 gap-10">
//                 <ImageGallery images={product.images} productName={product.name} />

//                 <div className="space-y-6">
//                     <p className="text-indigo-600 font-semibold uppercase">
//                         {product.category.name}
//                     </p>

//                     <h1 className="text-4xl font-bold text-slate-900">{product.name}</h1>

//                     <p className="text-slate-600 leading-relaxed">
//                         {product.description}
//                     </p>

//                     <p className="text-4xl font-bold text-slate-900">₹{product.price}</p>

//                     <StockIndicator stock={product.stock} />

//                     <AddToCartButton stock={product.stock} />
//                 </div>
//             </div>

//             <RelatedProducts
//                 categoryId={product.categoryId}
//                 currentProductId={product.id}
//             />

//             <ReviewSection productId={product.id} />
//         </div>
//     );
// }
