'use client';

import { useState } from 'react';

import { createReview } from '@/lib/reviewApi';

export default function ReviewForm({ productId, refresh }: any) {
    const [rating, setRating] = useState(5);

    const [comment, setComment] = useState('');

    const submit = async () => {
        await createReview({
            productId,
            rating,
            comment,
        });

        setComment('');

        refresh();
    };

    return (
        <div className="border rounded-xl p-5">
            <h3 className="font-bold mb-3">Write Review</h3>

            <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
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
                className="w-full border p-3 rounded mt-3"
            />

            <button
                onClick={submit}
                className="bg-indigo-600 text-white px-5 py-2 rounded mt-3"
            >
                Submit Review
            </button>
        </div>
    );
}
