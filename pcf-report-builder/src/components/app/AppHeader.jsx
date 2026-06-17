import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

/*
  Dashboard top bar: brand (links back to the landing page) and the theme
  toggle. No auth — this is an open demo.
*/
export function AppHeader({ brand }) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Logo />
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">
            {brand?.name ?? "Mappa"}
          </span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
