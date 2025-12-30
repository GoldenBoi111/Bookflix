import type { Book } from "@/utils/constants";
import booksData from "@/data/books";

// Mock API service using local data
export const fetchTrending = (): Promise<Book[]> => 
  new Promise((resolve) => {
    setTimeout(() => resolve(booksData.slice(0, 6)), 300);
  });

export const fetchNewNoteworthy = (): Promise<Book[]> => 
  new Promise((resolve) => {
    setTimeout(() => resolve(booksData.slice(6, 12)), 300);
  });

export const fetchBook = (id: string): Promise<Book> => 
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const book = booksData.find(b => b.id === parseInt(id, 10));
      if (book) {
        resolve(book);
      } else {
        reject(new Error('Book not found'));
      }
    }, 300);
  });

export const searchBooks = (
  q: string,
  page = 1
): Promise<{ items: Book[]; hasMore: boolean }> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const query = q.toLowerCase();
      const results = booksData.filter(b => 
        b.title.toLowerCase().includes(query) || 
        b.author.toLowerCase().includes(query) || 
        b.genre.toLowerCase().includes(query)
      );
      const start = (page - 1) * 20;
      const end = start + 20;
      const items = results.slice(start, end);
      resolve({
        items,
        hasMore: end < results.length
      });
    }, 300);
  });