export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="animate-pulse space-y-6">
        <div className="h-10 w-64 bg-slate-200 rounded" />

        <div className="grid md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-80 bg-slate-200 rounded-2xl"
            />
          ))}
        </div>
      </div>
    </div>
  );
}