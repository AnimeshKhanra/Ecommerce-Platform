"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ImageGallery({
  images,
  productName,
}: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(
    images?.[0] || "https://via.placeholder.com/600"
  );

  return (
    <div className="space-y-4">
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-slate-200 bg-white">
        <Image
          src={selectedImage}
          alt={productName}
          fill
          className="object-cover"
        />
      </div>

      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`relative aspect-square rounded-xl overflow-hidden border-2 ${
              selectedImage === image
                ? "border-indigo-600"
                : "border-slate-200"
            }`}
          >
            <Image
              src={image}
              alt={`${productName}-${index}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}