import { motion } from "framer-motion";
import { useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Check,
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
  onToggleStatus?: (book: Book) => void;
  onRemove?: (book: Book) => void;
  isLibraryView?: boolean; // Flag to indicate if this is being used in the Library page
}

export function CinemaShelf({ title, books, onSelectBook, onToggleStatus, onRemove, isLibraryView = false }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [can, setCan] = useState({ left: false, right: true });
  const {
    addToToRead,
    removeFromToRead,
    addToAlreadyRead,
    removeFromAlreadyRead,
    isInToRead,
    isInAlreadyRead,
    toggleStatus,
  } = useReadingList();

  // Helper function to toggle book status
  const toggleBook = (book: Book) => {
    toggleStatus(book);
  };

  // Helper function to check if book is in reading list
  const isBookInList = (id: number) => {
    return isInToRead(id) || isInAlreadyRead(id);
  };

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
    <div className="mb-8 px-0 sm:px-4 md:px-6 lg:px-8">
      {title && (
        <h2 className="text-2xl md:text-4xl font-black mb-6 tracking-tight text-white" id={`shelf-${title?.toLowerCase().replace(/\s+/g, '-')}`}>
          {title}
        </h2>
      )}
      <div className="relative group overflow-hidden">
        <div
          ref={scrollRef}
          onScroll={check}
          className="flex gap-2 md:gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide pb-4"
          role="region"
          aria-labelledby={title ? `shelf-${title?.toLowerCase().replace(/\s+/g, '-')}` : undefined}
          tabIndex={0}>
          {books.map((b) => (
            <motion.div
              key={b.id}
              whileHover={{ scale: 1.1, zIndex: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="snap-start shrink-0 w-36 md:w-44 lg:w-52 relative group/item">
              <div
                className="relative rounded-xl overflow-hidden shadow-2xl cursor-pointer transform transition duration-300 border border-[#808080]/20"
                onClick={() => {
                  if (onSelectBook) {
                    onSelectBook(b);
                  } else {
                    // Navigate to the book detail page which will show the modal
                    window.location.href = `/book/${b.id}`;
                  }
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (onSelectBook) {
                      onSelectBook(b);
                    } else {
                      window.location.href = `/book/${b.id}`;
                    }
                  }
                }}
                aria-label={`${b.title} by ${b.author}. Rating: ${b.rating} stars. Genre: ${b.genre}`}>
                {b.cover ? (
                  <div className="aspect-2/3 relative">
                    <img
                      src={b.cover}
                      alt={b.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; // Prevent infinite loop
                        target.src = `https://placehold.co/300x450/333333/FFFFFF?text=${encodeURIComponent(b.title)}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>
                ) : (
                  <div className="aspect-[2/3] bg-gradient-to-b from-gray-700 to-gray-900 flex items-center justify-center">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-4 pb-6">
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
                      }}
                      aria-label={`Play ${b.title}`}
                      title={`Play ${b.title}`}>
                      <Play className="w-4 h-4" aria-hidden="true" />
                    </motion.button>

                    {isLibraryView ? (
                      // Library page buttons: Toggle Status and Remove
                      <>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering the parent click
                            // Toggle status between To Read and Already Read
                            if (onToggleStatus) {
                              onToggleStatus(b);
                            } else {
                              // Fallback to default behavior if no custom handler provided
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
                            }
                          }}
                          className={`rounded-full p-3 transition shadow-lg ${
                            isInToRead(b.id)
                              ? "bg-netflix-accent/70 text-white hover:bg-netflix-accent/60"
                              : isInAlreadyRead(b.id)
                                ? "bg-gray-600/70 text-white hover:bg-gray-500/70"
                                : "bg-gray-700/70 text-white hover:bg-gray-600/70"
                          }`}
                          aria-label={isInToRead(b.id) ? `Move ${b.title} to Already Read` :
                                    isInAlreadyRead(b.id) ? `Move ${b.title} to To Read` :
                                    `Add ${b.title} to To Read`}
                          title={isInToRead(b.id) ? `Move ${b.title} to Already Read` :
                                isInAlreadyRead(b.id) ? `Move ${b.title} to To Read` :
                                `Add ${b.title} to To Read`}>
                          {isInToRead(b.id) ? (
                            <BookOpen className="w-4 h-4" aria-hidden="true" />
                          ) : isInAlreadyRead(b.id) ? (
                            <Plus className="w-4 h-4" aria-hidden="true" />
                          ) : (
                            <BookOpen className="w-4 h-4" aria-hidden="true" />
                          )}
                        </motion.button>

                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering the parent click
                            // Remove book from the current list
                            if (onRemove) {
                              onRemove(b);
                            } else {
                              // Fallback to default behavior if no custom handler provided
                              if (isInToRead(b.id)) {
                                removeFromToRead(b.id);
                              } else if (isInAlreadyRead(b.id)) {
                                removeFromAlreadyRead(b.id);
                              }
                            }
                          }}
                          className="rounded-full p-3 bg-red-600/70 text-white hover:bg-red-500/70 transition shadow-lg"
                          aria-label={`Remove ${b.title} from list`}
                          title={`Remove ${b.title} from list`}>
                          <X className="w-4 h-4" aria-hidden="true" />
                        </motion.button>
                      </>
                    ) : (
                      // Regular page buttons: To Read and Already Read
                      <>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering the parent click
                            // Toggle To Read status
                            if (isInToRead(b.id)) {
                              removeFromToRead(b.id);
                            } else {
                              // Remove from Already Read if it's there before adding to To Read
                              if (isInAlreadyRead(b.id)) {
                                removeFromAlreadyRead(b.id);
                              }
                              addToToRead(b);
                            }
                          }}
                          className={`rounded-full p-3 transition shadow-lg ${
                            isInToRead(b.id)
                              ? "bg-gray-600/70 text-white hover:bg-gray-500/70"
                              : "bg-gray-700/70 text-white hover:bg-gray-600/70"
                          }`}
                          aria-label={isInToRead(b.id) ? `Remove ${b.title} from To Read` : `Add ${b.title} to To Read`}
                          title={isInToRead(b.id) ? `Remove ${b.title} from To Read` : `Add ${b.title} to To Read`}>
                          {isInToRead(b.id) ? (
                            <Check className="w-4 h-4" aria-hidden="true" />
                          ) : (
                            <Plus className="w-4 h-4" aria-hidden="true" />
                          )}
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering the parent click
                            // Toggle Already Read status
                            if (isInAlreadyRead(b.id)) {
                              removeFromAlreadyRead(b.id);
                            } else {
                              // Remove from To Read if it's there before adding to Already Read
                              if (isInToRead(b.id)) {
                                removeFromToRead(b.id);
                              }
                              addToAlreadyRead(b);
                            }
                          }}
                          className={`rounded-full p-3 transition shadow-lg ${
                            isInAlreadyRead(b.id)
                              ? "bg-netflix-accent/70 text-white hover:bg-netflix-accent/60"
                              : "bg-gray-700/70 text-white hover:bg-gray-600/70"
                          }`}
                          aria-label={isInAlreadyRead(b.id) ? `Remove ${b.title} from Already Read` : `Add ${b.title} to Already Read`}
                          title={isInAlreadyRead(b.id) ? `Remove ${b.title} from Already Read` : `Add ${b.title} to Already Read`}>
                          <BookOpen className={`w-4 h-4 ${isInAlreadyRead(b.id) ? 'text-blue-400' : ''}`} aria-hidden="true" />
                        </motion.button>
                      </>
                    )}
                  </div>
                  <div className="text-center w-full">
                    <p className="text-xs font-medium mb-1">
                      {b.rating} <span className="text-yellow-400">★</span>
                    </p>
                    <p className="text-xs text-white truncate">{b.genre}</p>
                  </div>
                </div>

                {/* Single button in the top-right corner to open modal */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the parent click
                    // Open book modal when clicking the info button
                    if (onSelectBook) {
                      onSelectBook(b);
                    }
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 backdrop-blur z-20 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"
                  aria-label={`More info about ${b.title}`}
                  title={`More info about ${b.title}`}>
                  <Info className="w-4 h-4 text-white" aria-hidden="true" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {can.left && (
          <button
            onClick={() => scroll(-1)}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-black/70 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity shadow-lg hover:bg-black/90 border border-[#808080]/30 lg:-left-6"
            aria-label="Scroll left"
            title="Scroll left">
            <ChevronLeft className="w-6 h-6 text-white" aria-hidden="true" />
          </button>
        )}
        {can.right && (
          <button
            onClick={() => scroll(1)}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-black/70 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity shadow-lg hover:bg-black/90 border border-[#808080]/30 lg:-right-6"
            aria-label="Scroll right"
            title="Scroll right">
            <ChevronRight className="w-6 h-6 text-white" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
