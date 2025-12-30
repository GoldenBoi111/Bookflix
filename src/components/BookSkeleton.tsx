import { Skeleton } from "@/components/ui/skeleton";

export function BookSkeleton() {
  return (
    <div className="snap-start shrink-0 w-36 md:w-44 lg:w-52 relative">
      <div className="relative rounded-xl overflow-hidden shadow-2xl border border-[#808080]/20">
        <Skeleton className="aspect-[2/3] w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-4 pb-6">
          <div className="flex gap-2 mb-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="w-10 h-10 rounded-full" />
          </div>
          <div className="text-center w-full">
            <Skeleton className="h-3 w-1/2 mx-auto mb-1" />
            <Skeleton className="h-3 w-3/4 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ShelfSkeleton() {
  return (
    <div className="mb-8 px-0 sm:px-4 md:px-6 lg:px-8">
      <Skeleton className="h-8 w-1/4 mb-6" />
      <div className="flex gap-2 md:gap-4 lg:gap-6 overflow-x-auto pb-4 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <BookSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}