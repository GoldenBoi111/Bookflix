import { useState } from "react";
import { Search, BookOpen } from "lucide-react";
import { useBookSearch } from "@/hooks/useBookSearch";
import { CinemaShelf } from "@/organisms/CinemaShelf";
import booksData from "@/data/books";
import { Input } from "@/components/ui/input";
import { BookModal } from "@/components/BookModal";
import type { Book } from "@/utils/constants";

export default function Discover() {
  const [query, setQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const results = useBookSearch(booksData, query);

  return (
    <div className="px-0 sm:px-4 md:px-8 lg:px-12 py-8 pt-24">
      <div className="flex items-center gap-4 mb-10">
        <BookOpen className="w-10 h-10 text-netflix-accent" />
        <h1 className="text-3xl md:text-5xl font-black">Discover</h1>
      </div>

      <div className="relative max-w-2xl mb-12">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#808080]" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search books, authors, genres..."
            className="w-full pl-10 pr-4 py-6 text-lg bg-[#222222] text-white placeholder-[#808080] border border-[#808080]/30 focus-visible:ring-2 focus-visible:ring-[#e50914] rounded-lg"
          />
        </div>
      </div>

      <div>
        <CinemaShelf
          title={query ? `Results for "${query}"` : "All Books"}
          books={results}
          onSelectBook={setSelectedBook}
        />
      </div>

      {/* Book Modal Overlay */}
      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
}
