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
