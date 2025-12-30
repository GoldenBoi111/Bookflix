# Bookflix - Your Netflix for Books

Bookflix is a modern, Netflix-inspired book discovery and reading platform built with React, TypeScript, and Tailwind CSS. The application provides users with an immersive experience for browsing, discovering, and organizing their favorite books.

## 🚀 Features

- **Netflix-style UI/UX**: Familiar interface with horizontal scrolling shelves and featured content
- **Book Discovery**: Browse and search through a curated collection of books
- **Reading Lists**: Organize books into "To Read" and "Already Read" lists
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Keyboard Navigation**: Full keyboard support for efficient browsing
- **Search Functionality**: Command palette and search bar for quick access
- **Book Details**: Rich modals with detailed book information
- **Progress Tracking**: Visual indicators for reading progress
- **Accessibility**: Full ARIA support and keyboard navigation

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion for animations
- **Routing**: React Router v7
- **State Management**: Zustand
- **UI Components**: Radix UI, Headless UI
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Data Fetching**: TanStack Query

## 📁 Project Structure

```
bookflix/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   ├── data/              # Static data files
│   ├── hooks/             # Custom React hooks
│   ├── layouts/           # Page layouts
│   ├── organisms/         # Complex UI components
│   ├── pages/             # Route components
│   ├── providers/         # React context providers
│   ├── styles/            # Custom CSS files
│   ├── utils/             # Utility functions
│   └── lib/               # Shared libraries
├── components.json        # Shadcn/ui configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── vite.config.ts         # Vite build configuration
└── package.json           # Dependencies and scripts
```

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bookflix
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design System

- **Color Palette**: Netflix-inspired dark theme with red accents
- **Typography**: Inter font family
- **Spacing**: Consistent 4px grid system
- **Components**: Reusable, accessible UI components

## 📱 Responsive Features

- **Mobile**: Full-width content, touch-optimized interactions
- **Tablet**: Optimized for iPad with appropriate spacing and sizing
- **Desktop**: Netflix-style layout with multiple content shelves

## 🔐 Authentication

The application includes login and signup pages with:
- Form validation
- Password visibility toggle
- Social login options (Google)

## 🗂️ Data Structure

Books include the following properties:
- `id`: Unique identifier
- `title`: Book title
- `author`: Author name
- `genre`: Book genre
- `rating`: User rating (0-5)
- `description`: Short description
- `longDescription`: Extended description
- `cover`: Cover image URL
- `status`: Reading status ('to-read' or 'already-read')

## 🧩 Key Components

- **CinemaShelf**: Horizontal scrolling book shelf component
- **FeaturedCarousel**: Rotating featured book carousel
- **BookModal**: Detailed book information modal
- **NavSticky**: Fixed navigation header
- **KeyboardShortcuts**: Global keyboard navigation
- **ErrorBoundary**: Error handling component

## 🎯 User Experience

- **Loading States**: Skeleton screens for smooth loading
- **Keyboard Shortcuts**: 
  - `Ctrl+K` or `/` for search
  - `Ctrl+G` for home
  - `Ctrl+D` for discover
  - `Ctrl+L` for library
- **Accessibility**: Full keyboard navigation and screen reader support
- **Performance**: Code splitting and lazy loading

## 📚 Pages

- **Home**: Featured carousel and content shelves
- **Discover**: Search and browse all books
- **Library**: Personal reading lists
- **Login/Signup**: Authentication pages
- **NotFound**: 404 error page

## 🛡️ Error Handling

- Global error boundaries
- Component-level error handling
- User-friendly error messages

## 📊 Performance

- Image lazy loading
- Code splitting with React.lazy
- Optimized animations with Framer Motion
- Efficient state management with Zustand

## 🧪 Testing

The application follows modern testing practices with:
- Component testing
- Accessibility testing
- Performance testing

## 🚀 Deployment

The application is built with Vite for optimal performance and can be deployed to any static hosting service:

```bash
npm run build
```

The build output is located in the `dist/` directory.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions, please open an issue in the repository.

---

**Bookflix** - Transform your reading experience with a Netflix-style interface for discovering and organizing books.