import { motion } from "framer-motion";
import { Star, X, Play, Check, BookOpen, Plus } from "lucide-react";
import { useReadingList } from "@/hooks/useReadingList";
import type { Book } from "@/utils/constants";
import { Button } from "@/components/ui/button";
import { ExpandableDescription } from "@/components/ExpandableDescription";
import { useEffect } from "react";

interface Props {
  book: Book | null;
  onClose: () => void;
}

export function BookModal({ book, onClose }: Props) {
  const {
    addToToRead,
    removeFromToRead,
    addToAlreadyRead,
    removeFromAlreadyRead,
    isInToRead,
    isInAlreadyRead,
  } = useReadingList();
  if (!book) return null;

  const isInList = isInToRead(book.id) || isInAlreadyRead(book.id);

  // Handle keyboard events for closing modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/90 backdrop-blur z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#181818] rounded-xl w-full max-w-4xl overflow-hidden max-h-[90vh] overflow-y-auto border border-[#808080]/20 focus:outline-none"
        tabIndex={-1}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-[#808080]/20 hover:bg-[#808080]/40 transition border border-[#808080]/30 cursor-pointer"
          aria-label="Close modal"
          title="Close modal (Esc)">
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Book header with gradient */}
        <div className="relative">
          <div className="h-80 bg-gradient-to-r from-[#141414] via-[#141414]/80 to-transparent absolute inset-0 z-0" />
          <div className="h-80 bg-gradient-to-t from-[#141414] to-transparent absolute bottom-0 left-0 right-0 z-0" />

          <div className="relative z-10 p-8 pt-12 flex flex-col md:flex-row gap-8">
            {/* Book cover */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              {book.cover ? (
                <div className="w-48 h-72 rounded-xl overflow-hidden shadow-2xl border border-[#808080]/20 transform transition-transform hover:scale-105">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null; // Prevent infinite loop
                      target.src = `https://placehold.co/300x450/333333/FFFFFF?text=${encodeURIComponent(book.title)}`;
                    }}
                  />
                </div>
              ) : (
                <div className="w-48 h-72 rounded-xl overflow-hidden shadow-2xl bg-gradient-to-b from-gray-700 to-gray-900 flex items-center justify-center border border-[#808080]/20">
                  <div className="text-center p-4">
                    <h3 className="font-bold text-lg mb-2">{book.title}</h3>
                    <p className="text-sm text-gray-300">{book.author}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Book info */}
            <div className="flex-grow">
              <h2 className="text-3xl md:text-4xl font-black mb-2">
                {book.title}
              </h2>
              <p className="text-xl text-[#808080] mb-4">{book.author}</p>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="flex items-center gap-1 text-yellow-400 font-semibold">
                  <Star size={18} fill="currentColor" /> {book.rating}
                </span>
                <span className="text-[#808080]">{book.genre}</span>
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="netflixPrimary"
                    size="xl"
                    className="flex items-center gap-2 font-bold">
                    <Play className="w-5 h-5" />
                    Read Now
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => {
                      // If book is in To Read list, move to Already Read
                      // If book is in Already Read list, remove from both
                      // If book is in neither list, add to To Read
                      if (isInToRead(book.id)) {
                        removeFromToRead(book.id);
                        addToAlreadyRead(book);
                      } else if (isInAlreadyRead(book.id)) {
                        removeFromAlreadyRead(book.id);
                      } else {
                        addToToRead(book);
                      }
                    }}
                    variant={isInList ? "netflixSecondary" : "netflixAccent"}
                    size="xl"
                    className={`flex items-center gap-2 font-bold transition-all duration-200 ${
                      isInToRead(book.id)
                        ? "bg-gray-600 text-white hover:bg-gray-500 border border-gray-500/50"
                        : isInAlreadyRead(book.id)
                          ? "bg-netflix-accent text-white hover:bg-netflix-accent/80 border border-netflix-accent/50"
                          : "bg-netflix-accent text-white hover:bg-[#f40612]"
                    }`}>
                    {isInToRead(book.id) ? (
                      <>
                        <Check className="w-5 h-5" /> In To Read
                      </>
                    ) : isInAlreadyRead(book.id) ? (
                      <>
                        <BookOpen className="w-5 h-5" /> Already Read
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5" /> Add to List
                      </>
                    )}
                  </Button>
                </motion.div>
              </div>

              <div className="text-[#b3b3b3] text-lg leading-relaxed max-w-2xl">
                {book.longDescription ? (
                  <ExpandableDescription text={book.longDescription} />
                ) : (
                  <p>{book.description}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
