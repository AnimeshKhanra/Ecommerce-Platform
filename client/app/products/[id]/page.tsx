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