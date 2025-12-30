import { CinemaShelf } from "@/organisms/CinemaShelf";
import booksData from "@/data/books";
import { useState, useEffect } from "react";
import { BookModal } from "@/components/BookModal";
import type { Book } from "@/utils/constants";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";
import { ShelfSkeleton } from "@/components/BookSkeleton";

export default function Home() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Select 10 books for the featured carousel
  const featuredBooks = booksData.slice(0, 10);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pb-8 md:pb-16">
      {/* Featured Carousel Section */}
      <FeaturedCarousel books={featuredBooks} onSelectBook={setSelectedBook} />

      {/* Content Shelves */}
      <div className="mt-8 md:mt-16">
        {isLoading ? (
          <>
            <ShelfSkeleton />
            <ShelfSkeleton />
            <ShelfSkeleton />
            <ShelfSkeleton />
            <ShelfSkeleton />
          </>
        ) : (
          <>
            <CinemaShelf
              title="Trending Now"
              books={booksData.slice(10, 20)}
              onSelectBook={setSelectedBook}
            />
            <CinemaShelf
              title="New & Noteworthy"
              books={booksData.slice(5, 15)}
              onSelectBook={setSelectedBook}
            />
            <CinemaShelf
              title="Continue Reading"
              books={booksData.slice(0, 10)}
              onSelectBook={setSelectedBook}
            />
            <CinemaShelf
              title="Popular Fiction"
              books={booksData.filter((b) => b.genre === "Fiction")}
              onSelectBook={setSelectedBook}
            />
            <CinemaShelf
              title="Science & Tech"
              books={booksData.filter((b) => b.genre.includes("Science"))}
              onSelectBook={setSelectedBook}
            />
          </>
        )}
      </div>

      {/* Book Modal Overlay */}
      {selectedBook && (
        <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
}
