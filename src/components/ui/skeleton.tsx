import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-[#222222] border border-[#808080]/30", className)}
      {...props}
    />
  );
}

export { Skeleton };