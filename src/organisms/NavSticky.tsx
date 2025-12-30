import { useReadingList } from "@/hooks/useReadingList";
import { Menu, X, BookOpen, Home, Search } from "lucide-react";
import { useState } from "react";
import { Transition } from "@headlessui/react";

export function NavSticky() {
  const { toReadList, alreadyReadList } = useReadingList();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Total count of books in both lists
  const totalCount = toReadList.length + alreadyReadList.length;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-[#141414]/90 backdrop-blur-md border-b border-[#808080]/20"
      role="banner">
      <div className="w-full max-w-none md:max-w-screen-2xl mx-auto px-6 h-16 flex items-center">
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="text-3xl font-black tracking-tighter text-white flex items-center gap-2"
            aria-label="Bookflix Home">
            <span
              className="bg-netflix-accent w-10 h-10 rounded flex items-center justify-center font-bold"
              aria-hidden="true">
              B
            </span>
            <span className="text-white hover:text-white no-underline">
              BOOKFLIX
            </span>
          </a>
        </div>

        {/* Main Navigation - Centered */}
        <nav
          className="hidden md:flex items-center justify-center gap-1 text-base flex-grow"
          role="navigation"
          aria-label="Main navigation">
          <a
            href="/"
            className="text-[#b3b3b3] hover:text-white transition duration-200 font-medium py-3 px-4 rounded-lg hover:bg-[#808080]/20">
            <span className="flex items-center gap-2">
              <Home className="w-5 h-5" aria-hidden="true" />
              Home
            </span>
          </a>
          <a
            href="/discover"
            className="text-[#b3b3b3] hover:text-white transition duration-200 font-medium py-3 px-4 rounded-lg hover:bg-[#808080]/20">
            <span className="flex items-center gap-2">
              <Search className="w-5 h-5" aria-hidden="true" />
              Discover
            </span>
          </a>
          <a
            href="/library"
            className="text-[#b3b3b3] hover:text-white transition duration-200 font-medium relative py-3 px-4 rounded-lg hover:bg-[#808080]/20">
            <span className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" aria-hidden="true" />
              My List
              {totalCount > 0 && (
                <span
                  className="absolute -top-1 -right-4 bg-netflix-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                  aria-label={`${totalCount} books in reading list`}>
                  {totalCount}
                </span>
              )}
            </span>
          </a>
        </nav>

        {/* Auth Navigation - Pushed to the right */}
        <div
          className="hidden md:flex items-center gap-4 ml-auto"
          role="navigation"
          aria-label="Authentication navigation">
          <a
            href="/login"
            className="text-[#b3b3b3] hover:text-white transition duration-200 font-medium py-3 px-4 rounded-lg hover:bg-[#808080]/20">
            Sign In
          </a>
          <a
            href="/signup"
            className="text-white bg-netflix-accent hover:bg-[#f40612] transition duration-200 font-medium py-3 px-4 rounded-lg">
            Sign Up
          </a>
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-4 ml-auto md:hiddent">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[#b3b3b3] hover:text-white hover:bg-[#808080]/20 rounded-full p-3 border border-[#808080]/30 md:hidden shadow-lg hover:shadow-xl"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            title={isMenuOpen ? "Close menu" : "Open menu"}>
            {isMenuOpen ? (
              <X className="w-5 h-5 text-right" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5 text-right" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <Transition
        show={isMenuOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <div
          className="md:hidden bg-[#141414] border-t border-[#808080]/20"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu">
          <div className="px-4 py-3 space-y-1">
            <a
              href="/"
              className="block px-3 py-3 rounded-lg text-base font-medium text-[#b3b3b3] hover:text-white hover:bg-[#808080]/20 flex items-center gap-3"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Home page">
              <Home className="w-5 h-5" aria-hidden="true" />
              Home
            </a>
            <a
              href="/discover"
              className="block px-3 py-3 rounded-lg text-base font-medium text-[#b3b3b3] hover:text-white hover:bg-[#808080]/20 flex items-center gap-3"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Discover books">
              <Search className="w-5 h-5" aria-hidden="true" />
              Discover
            </a>
            <a
              href="/library"
              className="block px-3 py-3 rounded-lg text-base font-medium text-[#b3b3b3] hover:text-white hover:bg-[#808080]/20 flex items-center gap-3"
              onClick={() => setIsMenuOpen(false)}
              aria-label={`My Library (${totalCount} items)`}>
              <BookOpen className="w-5 h-5" aria-hidden="true" />
              My List
              {totalCount > 0 && (
                <span
                  className="ml-2 bg-netflix-accent text-white text-xs rounded-full h-6 w-6 flex items-center justify-center"
                  aria-label={`${totalCount} books in reading list`}>
                  {totalCount}
                </span>
              )}
            </a>
            <div className="pt-4 border-t border-[#808080]/20">
              <a
                href="/login"
                className="block px-3 py-3 rounded-lg text-base font-medium text-[#b3b3b3] hover:text-white hover:bg-[#808080]/20"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Sign in to your account">
                Sign In
              </a>
              <a
                href="/signup"
                className="block px-3 py-3 rounded-lg text-base font-medium text-white bg-netflix-accent hover:bg-[#f40612]"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Create a new account">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </Transition>
    </header>
  );
}
