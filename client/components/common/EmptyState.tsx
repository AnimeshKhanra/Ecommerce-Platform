import Link from "next/link";

interface Props {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function EmptyState({
  title,
  description,
  buttonText,
  buttonLink,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border p-10 text-center">
      <h2 className="text-2xl font-bold">
        {title}
      </h2>

      <p className="text-slate-500 mt-3">
        {description}
      </p>

      {buttonText && buttonLink && (
        <Link
          href={buttonLink}
          className="inline-block mt-6 bg-indigo-600 text-white px-6 py-3 rounded-xl"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
}