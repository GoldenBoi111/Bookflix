import * as React from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
} from "cmdk";
import { useNavigate } from "react-router-dom";
import { useReadingList } from "@/hooks/useReadingList";
import { Dialog, DialogContent } from "@/components/ui/Dialog"; // simple Radix wrapper below

export function CmdPaletteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const { toReadList, alreadyReadList } = useReadingList();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Combine both lists for the command palette
  const allBooks = [...toReadList, ...alreadyReadList];

  const actions = [
    { id: "home", label: "Home", shortcut: "h", perform: () => navigate("/") },
    {
      id: "library",
      label: "Reading List",
      shortcut: "r",
      perform: () => navigate("/library"),
    },
    {
      id: "discover",
      label: "Discover",
      shortcut: "d",
      perform: () => navigate("/discover"),
    },
    ...allBooks.map((b) => ({
      id: `book-${b.id}`,
      label: `Open “${b.title}”`,
      shortcut: null,
      perform: () => navigate(`/book/${b.id}`),
    })),
  ];

  return (
    <div className="rounded-xl">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full max-w-xl outline-solid bg-[#181818] border-[#808080]/30 rounded-xl p-0 shadow-2xl z-200 ">
          <Command loop className="w-full">
            <CommandInput
              placeholder="Search books, navigate pages…"
              className="w-full px-6 py-5 bg-[#141414] text-white placeholder-[#808080] focus:outline-none border-b border-[#808080]/30"
            />
            <CommandList className="max-h-96 overflow-auto px-2 pb-2 bg-[#141414]">
              <CommandEmpty className="px-6 py-4 text-[#808080]">
                No results found.
              </CommandEmpty>
              {actions.map((a) => (
                <CommandItem
                  key={a.id}
                  onSelect={() => {
                    a.perform();
                    setOpen(false);
                  }}
                  className="px-6 py-4 rounded-lg cursor-pointer data-[selected=true]:bg-[#808080]/20 hover:bg-[#808080]/20 text-white">
                  {a.label}
                  {a.shortcut && (
                    <span className="ml-auto text-xs text-[#808080] bg-[#808080]/20 px-2 py-1 rounded">
                      ⌘{a.shortcut}
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
      {children}
    </div>
  );
}
