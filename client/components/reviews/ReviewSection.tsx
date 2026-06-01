'use client';

import { useEffect, useState } from 'react';

import { getReviews } from '@/lib/reviewApi';

import StarRating from './StarRating';

import ReviewForm from './ReviewForm';

export default function ReviewSection({ productId }: { productId: string }) {
  const [data, setData] = useState<any>(null);

  const load = async () => {
    const reviews = await getReviews(productId);

    setData(reviews);
  };

  useEffect(() => {
    load();
  }, []);

  if (!data) return null;

  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold mb-6">Reviews</h2>

      <div className="mb-6">
        <div className="text-4xl font-bold">{data.avgRating.toFixed(1)}</div>

        <StarRating rating={Math.round(data.avgRating)} />

        <p>{data.totalReviews} Reviews</p>
      </div>

      <ReviewForm productId={productId} refresh={load} />

      <div className="mt-8 space-y-4">
        {data.reviews.map((review: any) => (
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
