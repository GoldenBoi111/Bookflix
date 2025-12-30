import { motion } from "framer-motion";
import { BookOpen, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-0 sm:px-4 lg:px-8 text-center py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg">
        <div className="text-netflix-accent text-8xl font-black mb-6">404</div>
        <h1 className="text-3xl md:text-5xl font-black mb-4">Book Not Found</h1>
        <p className="text-[#808080] text-lg mb-10 max-w-md">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              variant="netflixAccent"
              size="xl"
              className="font-bold">
              <Link to="/" className="flex items-center">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              variant="netflixSecondary"
              size="xl"
              className="font-bold">
              <Link to="/discover" className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Discover Books
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
