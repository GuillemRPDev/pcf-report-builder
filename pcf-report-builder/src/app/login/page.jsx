import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { Logo } from "@/components/Logo";
import { LoginForm } from "@/components/auth/LoginForm";
import { BRAND } from "@/lib/brand";

export const metadata = {
  title: "Log in · Mappa PCF",
};

const GRADIENT = `linear-gradient(140deg, ${BRAND.palette.pink}, ${BRAND.palette.orange}, ${BRAND.palette.coral}, ${BRAND.palette.navy})`;
const POINTS = [
  "ISO 14067 data, validated on import",
  "On-brand, multi-page PDF export",
  "Lifecycle-stage breakdown charts",
];

// Decorative split auth screen: brand panel (desktop) + the demo sign-in form.
export default function LoginPage() {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      {/* brand panel */}
      <aside className="relative hidden overflow-hidden bg-zinc-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 bottom-0 size-[32rem] rounded-full opacity-30 blur-3xl"
          style={{ backgroundImage: GRADIENT }}
        />
        <Link href="/" className="relative w-fit rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-white/50">
          <Logo className="text-lg text-white" />
        </Link>
        <div className="relative">
          <p className="text-2xl font-semibold leading-snug">
            Branded carbon reports, straight from your PCF data.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-zinc-300">
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-2.5">
                <span
                  className="inline-flex size-5 items-center justify-center rounded-full text-white"
                  style={{ backgroundImage: GRADIENT }}
                >
                  <Check className="size-3" aria-hidden="true" />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-xs text-zinc-500">
          © {new Date().getFullYear()} Mappa. Demo project.
        </p>
      </aside>

      {/* form */}
      <main className="flex flex-col justify-center px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-sm">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to home
          </Link>

          <div className="lg:hidden">
            <Logo className="text-lg" />
          </div>

          <h1 className="mt-6 text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to your Mappa workspace.
          </p>

          <div className="mt-8">
            <LoginForm />
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/login" className="font-medium text-foreground underline-offset-4 hover:underline">
              Start free
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
