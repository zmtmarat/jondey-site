export default function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span className="text-accent" aria-label={`${rating} из 5`}>
      {'★'.repeat(full)}
      <span className="text-slate-300">{'★'.repeat(5 - full)}</span>
    </span>
  );
}
