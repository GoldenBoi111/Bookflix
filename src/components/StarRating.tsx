import { Star } from "lucide-react";

interface Props {
  value: number;
}

export function StarRating({ value }: Props) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`w-4 h-4 ${n <= value ? "text-yellow-400 fill-current" : "text-gray-600"}`}
        />
      ))}
    </div>
  );
}
