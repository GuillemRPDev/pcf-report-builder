import Link from "next/link";
import {
  BarChart3,
  Check,
  Download,
  FileCheck2,
  Palette,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { BRAND } from "@/lib/brand";

const GRADIENT = `linear-gradient(115deg, ${BRAND.palette.pink}, ${BRAND.palette.orange}, ${BRAND.palette.coral}, ${BRAND.palette.navy})`;

const FEATURES = [
  {
    icon: FileCheck2,
    title: "ISO 14067, validated",
    body: "Every dataset is parsed and checked on import — stage totals must reconcile with their components, so a bad file fails loudly instead of rendering wrong numbers.",
  },
  {
    icon: Palette,
    title: "On-brand by default",
    body: "Your palette, typography and logo live in one config. Reports come out looking like your brand, not a generic template.",
  },
  {
    icon: BarChart3,
    title: "Lifecycle breakdown",
    body: "Cradle-to-grave emissions across six stages, with a per-component inventory and a chart that reads at a glance.",
  },
  {
    icon: Download,
    title: "Export in one click",
    body: "A pixel-true PDF rendered in the browser — cover, summary, chart and a detailed breakdown, ready to send to a client.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Connect your data",
    body: "Drop in a PCF CSV exported per ISO 14067. We map it to a typed model and validate it.",
  },
  {
    n: "02",
    title: "Preview the footprint",
    body: "See headline KPIs and the lifecycle-stage breakdown update live as you pick a product.",
  },
  {
    n: "03",
    title: "Export the report",
    body: "Generate a branded, multi-page PDF in one click — no design tooling required.",
  },
];

const PLANS = [
  {
    name: "Starter",
    price: "€0",
    cadence: "/mo",
    blurb: "For trying it out.",
    features: ["1 brand profile", "Sample dataset", "PDF export", "Community support"],
  },
  {
    name: "Team",
    price: "€49",
    cadence: "/mo",
    blurb: "For sustainability teams.",
    features: ["Unlimited products", "Custom branding", "Section templates", "Priority support"],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Let's talk",
    cadence: "",
    blurb: "For large reporting programs.",
    features: ["SSO & roles", "Live data sources", "Audit trail", "Dedicated SLA"],
  },
];

export function Landing() {
  return (
    <>
      <SiteHeader />

      {/* ---------- hero ---------- */}
      <section className="relative overflow-hidden bg-zinc-950 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 size-[36rem] rounded-full opacity-30 blur-3xl"
          style={{ backgroundImage: GRADIENT }}
        />
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-28">
          <div>
            <Badge
              variant="secondary"
              className="gap-1.5 bg-white/10 text-white hover:bg-white/15"
            >
              <Sparkles className="size-3.5" aria-hidden="true" />
              ISO 14067 carbon reporting
            </Badge>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              Turn PCF data into
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: GRADIENT }}
              >
                {" "}
                client-ready reports.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-300">
              Mappa takes your pre-calculated Product Carbon Footprint data and
              produces branded, defensible PDF reports — in minutes, not weeks.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href="/login">Get started free</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <a href="#how">See how it works</a>
              </Button>
            </div>
            <p className="mt-4 text-sm text-zinc-400">
              No sign-up required — it&apos;s an open demo.
            </p>
          </div>

          {/* mock product preview */}
          <HeroPreview />
        </div>
      </section>

      {/* ---------- features ---------- */}
      <section
        id="features"
        aria-labelledby="features-title"
        className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6"
      >
        <div className="max-w-2xl">
          <h2 id="features-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything you need to ship a report
          </h2>
          <p className="mt-3 text-muted-foreground">
            A focused toolset — correct data in, a polished document out.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border bg-card p-6 transition-shadow hover:shadow-md"
            >
              <span
                className="inline-flex size-10 items-center justify-center rounded-xl text-white"
                style={{ backgroundImage: GRADIENT }}
              >
                <f.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- how it works ---------- */}
      <section id="how" aria-labelledby="how-title" className="border-y bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <h2 id="how-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            How it works
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n}>
                <div
                  className="text-4xl font-semibold tabular-nums text-transparent"
                  style={{ backgroundImage: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text" }}
                >
                  {s.n}
                </div>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- pricing ---------- */}
      <section
        id="pricing"
        aria-labelledby="pricing-title"
        className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6"
      >
        <div className="max-w-2xl">
          <h2 id="pricing-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Simple pricing
          </h2>
          <p className="mt-3 text-muted-foreground">
            Plans are illustrative — this is a demo project.
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-6 ${
                plan.featured ? "border-primary shadow-lg ring-1 ring-primary/20" : "bg-card"
              }`}
            >
              {plan.featured && (
                <Badge className="absolute -top-3 left-6">Most popular</Badge>
              )}
              <p className="font-semibold">{plan.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{plan.blurb}</p>
              <p className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-semibold tracking-tight">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.cadence}</span>
              </p>
              <Button
                asChild
                className="mt-5 w-full"
                variant={plan.featured ? "default" : "outline"}
              >
                <Link href="/login">Choose {plan.name}</Link>
              </Button>
              <ul className="mt-6 space-y-2.5 text-sm">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2">
                    <Check className="size-4 shrink-0 text-primary" aria-hidden="true" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- CTA band ---------- */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-zinc-950 px-8 py-16 text-center text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-25 blur-2xl"
            style={{ backgroundImage: GRADIENT }}
          />
          <div className="relative">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready to build your first report?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-zinc-300">
              Sign in to the demo and export a branded PCF report in a couple of
              clicks.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/login">Open the demo</Link>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}

// A non-interactive, CSS-only mock of the dashboard to anchor the hero.
function HeroPreview() {
  const bars = [82, 64, 71, 18, 95, 30];
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur">
      <div className="rounded-xl bg-white p-5 text-zinc-900">
        <div
          aria-hidden="true"
          className="h-1.5 w-20 rounded-full"
          style={{ backgroundImage: GRADIENT }}
        />
        <p className="mt-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
          Mappa · ISO 14067
        </p>
        <p className="mt-1 text-lg font-semibold">Botella PET 500 ml</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            ["Total", "107.08"],
            ["Largest", "34.9%"],
            ["Stages", "6"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-lg border p-2">
              <p className="text-[8px] uppercase tracking-wide text-zinc-500">{k}</p>
              <p className="text-sm font-semibold tabular-nums">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-1.5">
          {bars.map((w, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-100">
                <span
                  className="block h-full rounded-full"
                  style={{ width: `${w}%`, backgroundImage: GRADIENT }}
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
