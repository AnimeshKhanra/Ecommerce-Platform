// 'use client';

// import { useState } from 'react';

// import { createReview } from '@/lib/reviewApi';

// export default function ReviewForm({ productId, refresh }: any) {
//     const [rating, setRating] = useState(5);

//     const [comment, setComment] = useState('');

//     const submit = async () => {
//         await createReview({
//             productId,
//             rating,
//             comment,
//         });

//         setComment('');

//         refresh();
//     };

//     return (
//         <div className="border rounded-xl p-5">
//             <h3 className="font-bold mb-3">Write Review</h3>

//             <select
//                 value={rating}
//                 onChange={(e) => setRating(Number(e.target.value))}
//                 className="border p-2 rounded"
//             >
//                 <option value={5}>5 Stars</option>
//                 <option value={4}>4 Stars</option>
//                 <option value={3}>3 Stars</option>
//                 <option value={2}>2 Stars</option>
//                 <option value={1}>1 Star</option>
//             </select>

//             <textarea
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//                 className="w-full border p-3 rounded mt-3"
//             />

//             <button
//                 onClick={submit}
//                 className="bg-indigo-600 text-white px-5 py-2 rounded mt-3"
//             >
//                 Submit Review
//             </button>
//         </div>
//     );
// }

'use client';

import { useState } from 'react';
import { createReview } from '@/services/review.service';

interface ReviewFormProps {
    productId: string;
    refresh: () => Promise<void>;
}

export default function ReviewForm({ productId, refresh }: ReviewFormProps) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submit = async () => {
        try {
            setLoading(true);
            setError(null);

            await createReview({
                productId,
                rating,
                comment: comment.trim() || undefined,
            });

            setComment('');
            setRating(5);

            await refresh();
        } catch (error: any) {
            console.error('Failed to create review:', error);

            setError(error?.response?.data?.message || 'Failed to submit review');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border rounded-xl p-5">
            <h3 className="font-bold mb-3">Write Review</h3>

            {error && (
                <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600">
                    {error}
                </div>
            )}

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
                placeholder="Share your experience..."
                className="w-full border p-3 rounded mt-3 min-h-[120px]"
            />

            <button
                onClick={submit}
                disabled={loading}
                className="bg-indigo-600 text-white px-5 py-2 rounded mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? 'Submitting...' : 'Submit Review'}
            </button>
        </div>
    );
}
