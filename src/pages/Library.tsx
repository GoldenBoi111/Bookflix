import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { useReadingList } from "@/hooks/useReadingList";
import { Button } from "@/components/ui/button";
import { CinemaShelf } from "@/organisms/CinemaShelf";
import { useState } from "react";
import { BookModal } from "@/components/BookModal";
import type { Book } from "@/utils/constants";

export default function Library() {
  const {
    toReadList,
    alreadyReadList,
    removeFromToRead,
    removeFromAlreadyRead,
    addToToRead,
    addToAlreadyRead,
  } = useReadingList();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Calculate statistics
  const totalBooks = toReadList.length + alreadyReadList.length;
  const completedPercentage =
    totalBooks > 0
      ? Math.round((alreadyReadList.length / totalBooks) * 100)
      : 0;

  return (
    <div className="px-0 sm:px-4 md:px-8 lg:px-12 py-8 pt-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-4">
          <BookOpen className="w-10 h-10 text-netflix-accent" />
          <div>
            <h1 className="text-3xl md:text-5xl font-black">My Reading List</h1>
            <p className="text-[#808080] mt-1">
              {totalBooks} {totalBooks === 1 ? "book" : "books"} in your library
            </p>
          </div>
        </div>

        {/* Progress indicator */}
        {totalBooks > 0 && (
          <div className="bg-[#181818] rounded-xl p-4 border border-[#808080]/20">
            <div className="flex justify-between text-sm mb-1">
              <span>Reading Progress</span>
              <span className="px-2">{completedPercentage}%</span>
            </div>
            <div className="w-full bg-[#222222] rounded-full h-2">
              <div
                className="bg-netflix-accent h-2 rounded-full"
                style={{ width: `${completedPercentage}%` }}></div>
            </div>
            <div className="flex justify-between text-xs text-[#808080] mt-2">
              <span>{alreadyReadList.length} read</span>
              <span>{toReadList.length} to read</span>
            </div>
          </div>
        )}
      </div>

      {toReadList.length > 0 || alreadyReadList.length > 0 ? (
        <div className="pb-16">
          {/* To Read Section */}
          {toReadList.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white">
                  To Read
                </h2>
                <span className="text-[#808080]">
                  {toReadList.length}{" "}
                  {toReadList.length === 1 ? "book" : "books"}
                </span>
              </div>
              <CinemaShelf
                books={toReadList}
                onSelectBook={setSelectedBook}
                onToggleStatus={(book) => {
                  // Move from To Read to Already Read
                  removeFromToRead(book.id);
                  addToAlreadyRead(book);
                }}
                onRemove={(book) => removeFromToRead(book.id)}
                isLibraryView={true}
              />
            </div>
          )}

          {/* Already Read Section */}
          {alreadyReadList.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white">
                  Already Read
                </h2>
                <span className="text-[#808080]">
                  {alreadyReadList.length}{" "}
                  {alreadyReadList.length === 1 ? "book" : "books"}
                </span>
              </div>
              <CinemaShelf
                books={alreadyReadList}
                onSelectBook={setSelectedBook}
                onToggleStatus={(book) => {
                  // Move from Already Read to To Read
                  removeFromAlreadyRead(book.id);
                  addToToRead(book);
                }}
                onRemove={(book) => removeFromAlreadyRead(book.id)}
                isLibraryView={true}
              />
            </div>
          )}
        </div>
      ) : (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <div className="text-[#808080] text-6xl mb-6">📚</div>
          <h2 className="text-3xl font-bold mb-4">
            Your reading lists are empty
          </h2>
          <p className="text-[#808080] text-lg mb-8 max-w-md mx-auto">
            Go discover some books to add to your reading lists!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              variant="netflixAccent"
              size="xl"
              className="font-bold">
              <a href="/discover">Discover Books</a>
            </Button>
            <Button
              asChild
              variant="netflixSecondary"
              size="xl"
              className="font-bold">
              <a href="/">Browse Home</a>
            </Button>
          </div>
        </motion.div>
      )}

      {/* Book Modal Overlay */}
      {selectedBook && (
        <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
}
