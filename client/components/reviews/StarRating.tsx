"use client";

interface Props {
  rating: number;
}

export default function StarRating({
  rating,
}: Props) {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(
        (star) => (
          <span
            key={star}
            className={
              star <= rating
                ? "text-yellow-500"
                : "text-gray-300"
            }
          >
            ★
          </span>
        )
      )}
    </div>
  );
}