import { Star } from "lucide-react";

export default function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          className={
            i <= Math.round(rating)
              ? "fill-[#FF9500] text-[#FF9500]"
              : "text-orange-200"
          }
        />
      ))}
      <span className="ml-1 text-xs text-gray-600">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}
