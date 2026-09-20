'use client';

import { useEffect, useState, useCallback } from 'react';
import { getReviews } from "@/services/review.service";
import StarRating from './StarRating';
import ReviewForm from './ReviewForm';
import { ReviewResponse } from '@/types/review.types';

interface ReviewSectionProps {
  productId: string;
}

export default function ReviewSection({ productId }: ReviewSectionProps) {
  const [data, setData] = useState<ReviewResponse | null>(null);

  const load = useCallback(async () => {
    try {
      const reviews = await getReviews(productId);
      setData(reviews);
    } catch (error) {
      console.error('Failed to load reviews:', error);
    }
  }, [productId]);

  useEffect(() => {
    load();
  }, [load]);

  if (!data) return null;

  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold mb-6">Reviews</h2>

      {/* Rating Summary */}
      <div className="mb-6">
        <div className="text-4xl font-bold">{data.avgRating.toFixed(1)}</div>
        <StarRating rating={Math.round(data.avgRating)} />
        <p>{data.totalReviews} Reviews</p>
      </div>

      {/* Review Form */}
      <ReviewForm productId={productId} refresh={load} />

      {/* Reviews */}
      <div className="mt-8 space-y-4">
        {data.reviews.map((review) => (
          <div key={review.id} className="border rounded-xl p-4">
            <div className="flex justify-between">
              <h4 className="font-semibold">{review.user.name}</h4>
              <StarRating rating={review.rating} />
            </div>
            <p className="mt-2 text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
