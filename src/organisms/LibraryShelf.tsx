import { motion } from "framer-motion";
import { useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Play,
  Info,
  BookOpen,
  X,
} from "lucide-react";
import { useReadingList } from "@/hooks/useReadingList";
import type { Book } from "@/utils/constants";

interface Props {
  title?: string;
  books: Book[];
  onSelectBook?: (book: Book) => void;
  onMoveToRead?: (book: Book) => void;
  onMoveToReadLater?: (book: Book) => void;
  onRemove?: (book: Book) => void;
}

export function LibraryShelf({ title, books, onSelectBook, onRemove }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [can, setCan] = useState({ left: false, right: true });
  const {
    addToToRead,
    removeFromToRead,
    addToAlreadyRead,
    removeFromAlreadyRead,
    isInToRead,
    isInAlreadyRead,
  } = useReadingList();

  const check = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCan({
      left: el.scrollLeft > 0,
      right: el.scrollWidth - el.scrollLeft - el.clientWidth > 1,
    });
  };

  const scroll = (dir: number) =>
    scrollRef.current?.scrollBy({ left: dir * 400, behavior: "smooth" });

  return (
    <div className="mb-8 px-4 md:px-6">
      {title && (
        <h2 className="text-2xl md:text-4xl font-black mb-6 tracking-tight text-white">
          {title}
        </h2>
      )}
      <div className="relative group">
        <div
          ref={scrollRef}
          onScroll={check}
          className="flex gap-2 md:gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide pb-4">
          {books.map((b) => (
            <motion.div
              key={b.id}
              whileHover={{ scale: 1.1, zIndex: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="snap-start shrink-0 w-36 md:w-44 relative group/item">
              <div
                className="relative rounded-xl overflow-hidden shadow-2xl cursor-pointer transform transition duration-300 border border-[#808080]/20"
                onClick={() => onSelectBook && onSelectBook(b)}>
                {b.cover ? (
                  <div className="aspect-2/3 relative">
                    <img
                      src={b.cover}
                      alt={b.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; // Prevent infinite loop
                        target.src = `https://placehold.co/300x450/333333/FFFFFF?text=${encodeURIComponent(b.title)}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
                  </div>
                ) : (
                  <div className="aspect-2/3 bg-linear-to-b from-gray-700 to-gray-900 flex items-center justify-center">
                    <div className="text-center p-3">
                      <h3 className="font-bold text-sm md:text-base line-clamp-2 mb-1 text-white">
                        {b.title}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-300 line-clamp-1">
                        {b.author}
                      </p>
                    </div>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-4 pb-6">
                  <div className="flex gap-2 mb-3">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="bg-white text-black rounded-full p-3 hover:bg-gray-200 transition shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the parent click
                        // Open book modal
                        if (onSelectBook) {
                          onSelectBook(b);
                        }
                      }}>
                      <Play className="w-4 h-4" />
                    </motion.button>

                    {/* Toggle Status Button - switches between To Read and Already Read */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the parent click
                        // Toggle status between To Read and Already Read
                        if (isInToRead(b.id)) {
                          // Move from To Read to Already Read
                          removeFromToRead(b.id);
                          addToAlreadyRead(b);
                        } else if (isInAlreadyRead(b.id)) {
                          // Move from Already Read to To Read
                          removeFromAlreadyRead(b.id);
                          addToToRead(b);
                        } else {
                          // Add to To Read by default
                          addToToRead(b);
                        }
                      }}
                      className={`rounded-full p-3 transition shadow-lg ${
                        isInToRead(b.id)
                          ? "bg-green-600/70 text-white hover:bg-green-500/70"
                          : isInAlreadyRead(b.id)
                            ? "bg-gray-600/70 text-white hover:bg-gray-500/70"
                            : "bg-gray-700/70 text-white hover:bg-gray-600/70"
                      }`}>
                      {isInToRead(b.id) ? (
                        <BookOpen className="w-4 h-4" />
                      ) : isInAlreadyRead(b.id) ? (
                        <Plus className="w-4 h-4" />
                      ) : (
                        <BookOpen className="w-4 h-4" />
                      )}
                    </motion.button>

                    {/* Remove Button */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the parent click
                        if (onRemove) {
                          onRemove(b);
                        }
                      }}
                      className="rounded-full p-3 bg-red-600/70 text-white hover:bg-red-500/70 transition shadow-lg">
                      <X className="w-4 h-4" />
                    </motion.button>
                  </div>
                  <div className="text-center w-full">
                    <p className="text-xs font-medium mb-1">
                      {b.rating} <span className="text-yellow-400">★</span>
                    </p>
                    <p className="text-xs text-white truncate">{b.genre}</p>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the parent click
                    // Open book modal when clicking the info button
                    if (onSelectBook) {
                      onSelectBook(b);
                    }
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 backdrop-blur z-20 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                  <Info className="w-4 h-4 text-white" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {can.left && (
          <button
            onClick={() => scroll(-1)}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/70 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity shadow-lg hover:bg-black/90 border border-[#808080]/30">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        )}
        {can.right && (
          <button
            onClick={() => scroll(1)}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/70 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity shadow-lg hover:bg-black/90 border border-[#808080]/30">
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        )}
      </div>
    </div>
  );
}
