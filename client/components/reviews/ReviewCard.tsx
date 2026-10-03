'use client';

import { useState } from 'react';
import StarRating from './StarRating';
import { deleteReview, updateReview } from '@/services/review.service';

import { Review } from '@/types/review.types';

interface ReviewCardProps {
  review: Review;
  currentUserId?: string;
  refresh: () => Promise<void>;
}

export default function ReviewCard({
  review,
  currentUserId,
  refresh,
}: ReviewCardProps) {
  const isOwner = currentUserId === review.userId;

  const [editing, setEditing] = useState(false);
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      setError(null);

      await updateReview(review.id, {
        rating,
        comment: comment.trim() || undefined,
      });

      setEditing(false);

      await refresh();
    } catch (error: any) {
      console.error('Failed to update review:', error);

      setError(error?.response?.data?.message || 'Failed to update review');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this review?'
    );

    if (!confirmed) return;

    try {
      setLoading(true);
      setError(null);

      await deleteReview(review.id);

      await refresh();
    } catch (error: any) {
      console.error('Failed to delete review:', error);

      setError(error?.response?.data?.message || 'Failed to delete review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-xl p-4">
      <div className="flex justify-between gap-4">
        <div>
          <h4 className="font-semibold">{review.user.name}</h4>

          <StarRating rating={editing ? rating : review.rating} />
        </div>

        {!editing && (
          <p className="text-sm text-gray-400">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        )}
      </div>

      {error && (
        <div className="mt-3 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {editing ? (
        <div className="mt-4">
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            disabled={loading}
            className="border p-2 rounded"
          >
            <option value={5}>5 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={2}>2 Stars</option>
            <option value={1}>1 Star</option>
          </select>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={loading}
            className="w-full border p-3 rounded mt-3 min-h-[100px]"
          />

          <div className="flex gap-2 mt-3">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>

            <button
              onClick={() => {
                setEditing(false);
                setRating(review.rating);
                setComment(review.comment || '');
                setError(null);
              }}
              disabled={loading}
              className="border px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          {review.comment && (
            <p className="mt-2 text-gray-600">{review.comment}</p>
          )}

          {isOwner && (
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setEditing(true)}
                disabled={loading}
                className="text-sm text-indigo-600 hover:underline"
              >
                Edit
              </button>

              <button
                onClick={handleDelete}
                disabled={loading}
                className="text-sm text-red-600 hover:underline disabled:opacity-50"
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
