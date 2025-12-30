import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useNavigate } from "react-router-dom";

interface KeyboardShortcutsProps {
  onOpenSearch?: () => void;
}

export function KeyboardShortcuts({ onOpenSearch }: KeyboardShortcutsProps) {
  const navigate = useNavigate();

  useKeyboardShortcuts([
    {
      key: 'k',
      ctrl: true,
      callback: (e) => {
        e.preventDefault();
        onOpenSearch?.();
      }
    },
    {
      key: '/',
      ctrl: false,
      callback: (e) => {
        e.preventDefault();
        onOpenSearch?.();
      }
    },
    {
      key: 'g',
      ctrl: true,
      callback: (e) => {
        e.preventDefault();
        navigate('/');
      }
    },
    {
      key: 'd',
      ctrl: true,
      callback: (e) => {
        e.preventDefault();
        navigate('/discover');
      }
    },
    {
      key: 'l',
      ctrl: true,
      callback: (e) => {
        e.preventDefault();
        navigate('/library');
      }
    },
    {
      key: 'Escape',
      callback: (e) => {
        // This could be used to close modals or search
        // For now, just prevent default behavior
      }
    }
  ]);

  return null; // This component doesn't render anything
}