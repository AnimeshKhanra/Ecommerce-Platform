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