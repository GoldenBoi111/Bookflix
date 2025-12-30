import { Outlet } from "react-router-dom";
import { NavSticky } from "@/organisms/NavSticky";
import { CmdPaletteProvider } from "@/providers/CmdPaletteProvider";
import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";

export default function CinemaLayout() {
  return (
    <CmdPaletteProvider>
      <NavSticky />
      <KeyboardShortcuts onOpenSearch={() => {}} />
      <main className="pt-16 min-h-screen bg-[#141414] px-0 sm:px-4 md:px-6">
        <Outlet />
      </main>
    </CmdPaletteProvider>
  );
}
