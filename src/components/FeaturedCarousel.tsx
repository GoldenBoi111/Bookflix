import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Book } from "@/utils/constants";

interface FeaturedCarouselProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
}

export function FeaturedCarousel({ books, onSelectBook }: FeaturedCarouselProps) {
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentFeaturedBook = books[currentFeaturedIndex];

  // Auto-rotate the featured books every 20 seconds
  useEffect(() => {
    // Reset progress when index changes
    setProgress(0);

    // Clear existing intervals
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

    // Set up progress bar interval (updates every 100ms for a 20s cycle)
    progressIntervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 0; // Reset progress
        }
        return prev + (100 / (20000 / 100)); // 20 seconds total
      });
    }, 100);

    // Set up book rotation interval
    intervalRef.current = setInterval(() => {
      setCurrentFeaturedIndex(prevIndex => (prevIndex + 1) % books.length);
    }, 20000); // 20 seconds

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [books.length, currentFeaturedIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentFeaturedIndex, books.length]);

  const handleNext = () => {
    setCurrentFeaturedIndex(prevIndex => (prevIndex + 1) % books.length);
    resetIntervals();
  };

  const handlePrev = () => {
    setCurrentFeaturedIndex(prevIndex =>
      prevIndex === 0 ? books.length - 1 : prevIndex - 1
    );
    resetIntervals();
  };

  const resetIntervals = () => {
    setProgress(0); // Reset progress when manually selecting

    // Clear existing intervals
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

    // Restart intervals
    progressIntervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 0;
        }
        return prev + (100 / (20000 / 100));
      });
    }, 100);

    intervalRef.current = setInterval(() => {
      setCurrentFeaturedIndex(prevIndex => (prevIndex + 1) % books.length);
    }, 20000);
  };

  const handleDotClick = (index: number) => {
    setCurrentFeaturedIndex(index);
    resetIntervals();
  };

  return (
    <div
      className="relative h-[50vh] md:h-[70vh] min-h-[400px] flex items-end pb-16 px-0 sm:px-6 lg:px-8"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') {
          handlePrev();
        } else if (e.key === 'ArrowRight') {
          handleNext();
        }
      }}
    >
      {/* Progress bar at the top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#808080]/20 z-30">
        <motion.div
          className="h-full bg-netflix-accent"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/80 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent z-10" />

      <div className="relative z-20 max-w-2xl px-4 sm:px-0 lg:px-8">
        <motion.h1
          key={currentFeaturedBook.id}
          className="text-4xl md:text-6xl font-black mb-4 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {currentFeaturedBook.title}
        </motion.h1>
        <div className="flex items-center gap-4 mb-4">
          <span className="flex items-center gap-1 text-green-500 font-semibold">
            {currentFeaturedBook.rating} <span className="text-yellow-400">★</span>
          </span>
          <span className="text-[#808080]">{currentFeaturedBook.genre}</span>
        </div>
        <p className="text-[#b3b3b3] text-sm md:text-base mb-8 line-clamp-3">
          {currentFeaturedBook.description}
        </p>
        <div className="flex gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="netflixPrimary"
              size="xl"
              className="flex items-center gap-2 font-bold"
              onClick={() => onSelectBook(currentFeaturedBook)}
            >
              <Play className="w-5 h-5" />
              Read Now
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="netflixSecondary"
              size="xl"
              className="flex items-center gap-2 font-bold"
              onClick={() => onSelectBook(currentFeaturedBook)}
            >
              <Info className="w-5 h-5" />
              More Info
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 h-12 w-12 rounded-full bg-black/70 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity shadow-lg hover:bg-black/90 border border-[#808080]/30 lg:left-6"
        aria-label="Previous book"
        title="Previous book">
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 h-12 w-12 rounded-full bg-black/70 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity shadow-lg hover:bg-black/90 border border-[#808080]/30 lg:right-6"
        aria-label="Next book"
        title="Next book">
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Indicator dots for the carousel */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {books.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentFeaturedIndex ? 'bg-white' : 'bg-gray-500'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            title={`Go to slide ${books[index]?.title || `Slide ${index + 1}`}`}
          />
        ))}
      </div>
    </div>
  );
}