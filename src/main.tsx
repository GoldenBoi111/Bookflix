import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/providers/ThemeProvider";
import CinemaLayout from "@/layouts/CinemaLayout";
import "@/index.css";
import ErrorBoundary from "@/components/ErrorBoundary";

// Lazy load pages for better performance
const Home = lazy(() => import("@/pages/Home"));
const Library = lazy(() => import("@/pages/Library"));
const Discover = lazy(() => import("@/pages/Discover"));
const BookDetail = lazy(() => import("@/pages/BookDetail"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Login = lazy(() => import("@/pages/Login"));
const Signup = lazy(() => import("@/pages/Signup"));

// Simple loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#141414]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e50914]"></div>
  </div>
);

/*  1. create router at MODULE level – AFTER React is in scope  */
const router = createBrowserRouter([
  {
    path: "/",
    element: <CinemaLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        )
      },
      {
        path: "library",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Library />
          </Suspense>
        )
      },
      {
        path: "discover",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Discover />
          </Suspense>
        )
      },
      {
        path: "book/:id",
        element: (
          <Suspense fallback={<PageLoader />}>
            <BookDetail />
          </Suspense>
        )
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Login />
          </Suspense>
        )
      },
      {
        path: "signup",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Signup />
          </Suspense>
        )
      },
    ],
    errorElement: (
      <Suspense fallback={<PageLoader />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
});

/*  2. thin component – no hooks, no router creation  */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

/*  3. bootstrap  */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
