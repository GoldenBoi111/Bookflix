import { createBrowserRouter } from "react-router-dom";
import CinemaLayout from "@/layouts/CinemaLayout";
import Home from "@/pages/Home";
import Library from "@/pages/Library";
import Discover from "@/pages/Discover";
import BookDetail from "@/pages/BookDetail";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import Signup from "./pages/Signup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CinemaLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "library", element: <Library /> },
      { path: "discover", element: <Discover /> },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
    errorElement: <NotFound />,
  },
  {
    path: "/book/:id",
    element: <BookDetail />,
  },
]);
