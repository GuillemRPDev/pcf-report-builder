import Link from "next/link";
import { Logo } from "@/components/Logo";

/*
  Marketing footer. Links are placeholders (#) — this is a demo product site.
*/
const COLUMNS = [
  { title: "Product", links: ["Features", "Changelog", "Roadmap"] },
  { title: "Company", links: ["About", "Careers", "Contact", "Blog"] },
  { title: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] },
];

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div className="space-y-3">
          <Logo className="text-lg" />
          <p className="max-w-xs text-sm text-muted-foreground">
            Branded Product Carbon Footprint reports from your ISO 14067 data —
            in minutes, not weeks.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold">{col.title}</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {col.links.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="transition-colors hover:text-foreground"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} Mappa. Demo project — not a real service.</p>
          <p>Built with Next.js · Tailwind · @react-pdf/renderer</p>
        </div>
      </div>
    </footer>
  );
}
