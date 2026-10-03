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
