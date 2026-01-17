# Bookflix

Bookflix is a high-performance book discovery and organization platform inspired by modern streaming interfaces. Built with React 19, TypeScript, and Tailwind CSS, it provides a cinematic browsing experience for digital libraries, leveraging horizontal scrolling architectures and a command-palette driven navigation system.

## How it works

The platform is designed to move beyond the traditional list-based library interface. It treats books as visual media, using high-fidelity cover art and dynamic metadata to drive engagement.

Upon entry, the user is presented with a **Featured Hero** section that highlights trending or high-rated titles. Below this, the application organizes the collection into **CinemaShelves**—fluid, horizontal scrolling rows categorized by genre, author, or reading status.

The interaction model is built for speed. Users can trigger the **Command Palette** from anywhere in the app to search for titles or jump to specific library views without lifting their hands from the keyboard. When a book is selected, a rich modal provides a deep dive into the title's metadata, including progress tracking and status management.

---

## Installation

### Prerequisites

- Node.js 18.0 or higher
- npm, yarn, or pnpm

### Setup

1. **Clone the repository**

```bash
git clone https://github.com/username/bookflix.git
cd bookflix

```

2. **Install dependencies**

```bash
npm install

```

3. **Start the development environment**

```bash
npm run dev

```

4. **Verify Installation**
   Navigate to `http://localhost:5173`. Ensure the library fetches the initial dataset and that the horizontal shelves are scrollable via touch or mouse-drag.

---

## The Reading Workflow

Bookflix follows a structured lifecycle for content management, ensuring that discovery leads directly to organization:

1. **Discovery**: Users browse curated shelves or use the global search (`Ctrl+K`) to find titles.
2. **Evaluation**: The **BookModal** provides extended descriptions, ratings, and genre tags to aid decision-making.
3. **Classification**: Users assign a status to the book—either "To Read" or "Already Read"—which triggers a state update in the global Zustand store.
4. **Tracking**: Visual progress indicators provide feedback on the user's current reading status across the Library view.
5. **Refinement**: The Library view allows for bulk organization and quick filtering of the user's personal collection.

---

## Technical Architecture

The application is built on a modular "Organism-based" architecture, separating complex data-fetching components from atomic UI elements.

### Tech Stack

| Category       | Tools                               |
| -------------- | ----------------------------------- |
| **Framework**  | React 19, TypeScript, Vite          |
| **Styling**    | Tailwind CSS v4, Framer Motion      |
| **Routing**    | React Router v7                     |
| **State**      | Zustand, TanStack Query             |
| **Components** | Radix UI, Headless UI, Lucide React |

### Key Modules

**Navigation & Search**

- **NavSticky**: A fixed header that manages scroll-spy and global navigation.
- **Command Palette**: A keyboard-accessible interface for site-wide search and navigation.

**Visual Engine**

- **CinemaShelf**: A high-performance horizontal scroller optimized for large image sets.
- **FeaturedCarousel**: An animated hero section utilizing Framer Motion for hardware-accelerated transitions.
- **Skeleton Screens**: Intelligent loading states that mirror the final UI layout to reduce perceived latency.

**Data & State**

- **Zustand Store**: Manages persistent local state for reading lists and user preferences.
- **TanStack Query**: Handles asynchronous data fetching, caching, and optimistic UI updates.

---

## Navigation & Shortcuts

Bookflix is designed for efficiency, offering full keyboard support for power users:

- **Global Search**: `Ctrl + K` or `/`
- **Home View**: `Ctrl + G`
- **Discover View**: `Ctrl + D`
- **Personal Library**: `Ctrl + L`

---

## Data Model

All book entities follow a strict TypeScript interface to ensure consistency across the data-fetching and rendering layers:

```typescript
interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  rating: number; // 0-5
  description: string;
  longDescription: string;
  cover: string; // URL
  status: "to-read" | "already-read" | "none";
}
```

---

## Contributing

The project follows a standard open-source contribution workflow:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/improvement-name`.
3. Implement changes following the established design tokens in `tailwind.config.ts`.
4. Ensure all UI components maintain ARIA compliance.
5. Submit a Pull Request for review.

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For technical issues or feature requests, please open a ticket on the GitHub [issue tracker](https://github.com/GoldenBoi111/Bookflix/issues).
