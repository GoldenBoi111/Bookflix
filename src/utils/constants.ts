export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  rating: number;
  description: string;
  longDescription?: string; // Optional longer description
  cover?: string; // Optional cover image URL
  status?: 'to-read' | 'already-read'; // Reading status
}

export const genres = [
  "All",
  "Fiction",
  "Non-Fiction",
  "Science",
  "Fantasy",
  "History",
  "Finance",
  "Self-Help",
  "Science Fiction",
  "Romance",
  "Dystopian",
  "Mystery",
  "Biography",
  "Adventure",
] as const;
