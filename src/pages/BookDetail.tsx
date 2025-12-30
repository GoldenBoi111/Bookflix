import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function BookDetail() {
  const navigate = useNavigate();

  // Redirect to home page since book details are shown as modal on home page
  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return null;
}
