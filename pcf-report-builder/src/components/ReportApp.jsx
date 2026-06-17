"use client";

import { useEffect, useId, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { FileText, Flame, Layers, ListTree, Leaf } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BRAND, sampleGradient } from "@/lib/brand";
import { computeKpis, formatPct } from "@/lib/format";
import { UNIT } from "@/lib/pcf-stages";

/*
  Client app shell: pick a product, preview its KPIs and lifecycle breakdown,
  then download the branded PDF. Validated data arrives as a prop from the
  server page. The PDF button is dynamically imported with { ssr: false } so the
  @react-pdf/renderer engine only loads in the browser and stays out of the
  initial bundle.

  UI/UX follows the ui-ux-pro-max rule set: clear visual hierarchy, one primary
  CTA, semantic theme tokens (dark-mode ready), labelled controls, 4.5:1 text
  contrast, tabular figures for data, and transform-based, reduced-motion-safe
  bar animation.
*/
const PdfDownloadButton = dynamic(
  () => import("@/components/report/PdfDownloadButton"),
  {
    ssr: false,
    loading: () => (
      <Button disabled className="w-full gap-2">
        Loading…
      </Button>
    ),
  }
);

export default function ReportApp({ products }) {
  const [index, setIndex] = useState(0);
  const selectId = useId();
  const product = products[index];

  const kpis = useMemo(() => computeKpis(product), [product]);
  const stageColors = useMemo(
    () => sampleGradient(product.stages.length),
    [product]
  );
  const maxStage = Math.max(...product.stages.map((s) => s.total));
  const componentCount = product.stages.reduce(
    (acc, s) => acc + s.components.length,
    0
  );

  return (
    <main className="min-h-dvh bg-muted/30">
      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
        {/* ---------- header ---------- */}
        <header className="mb-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              {/* decorative brand gradient accent */}
              <div
                aria-hidden="true"
                className="mb-4 h-1.5 w-24 rounded-full"
                style={{
                  backgroundImage: `linear-gradient(to right, ${BRAND.palette.pink}, ${BRAND.palette.orange}, ${BRAND.palette.coral}, ${BRAND.palette.navy})`,
                }}
              />
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                <Leaf className="size-3.5" aria-hidden="true" />
                {BRAND.name} · ISO 14067
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Product Carbon Footprint
                <br className="hidden sm:block" /> Report Builder
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Pick a product to preview its cradle-to-grave footprint by
                lifecycle stage, then export a branded PDF. Figures are
                pre-calculated — this tool presents them, it doesn&apos;t compute
                them.
              </p>
            </div>
            <ThemeToggle />
          </div>
        </header>

        {/* ---------- two-pane layout: config (sticky) + preview ---------- */}
        <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          {/* configuration */}
          <Card className="h-fit lg:sticky lg:top-8">
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Report configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <label htmlFor={selectId} className="text-sm font-medium">
                  Product
                </label>
                <Select
                  value={String(index)}
                  onValueChange={(v) => setIndex(Number(v))}
                >
                  <SelectTrigger id={selectId} className="w-full">
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((p, i) => (
                      <SelectItem key={p.product} value={String(i)}>
                        {p.product}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Functional unit: {product.functionalUnit}
                </p>
              </div>

              <dl className="space-y-2 border-t pt-4 text-sm">
                <SummaryRow label="Lifecycle stages" value={kpis.stageCount} />
                <SummaryRow label="Inventory line items" value={componentCount} />
                <SummaryRow label="Report pages" value={3} />
              </dl>

              <div className="space-y-2 border-t pt-4">
                <PdfDownloadButton product={product} />
                <p className="text-center text-xs text-muted-foreground">
                  Cover · summary &amp; chart · detailed breakdown
                </p>
              </div>
            </CardContent>
          </Card>

          {/* preview */}
          <div className="space-y-6">
            {/* KPI cards */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <Kpi
                icon={FileText}
                label="Total footprint"
                value={kpis.total.toFixed(2)}
                unit={`${UNIT} / ${product.functionalUnit}`}
                accent
              />
              <Kpi
                icon={Flame}
                label="Largest contributor"
                value={kpis.largestShare}
                unit={kpis.largestStage.label}
              />
              <Kpi
                icon={Layers}
                label="Lifecycle stages"
                value={String(kpis.stageCount)}
                unit="cradle-to-grave"
              />
              <Kpi
                icon={ListTree}
                label="Line items"
                value={String(componentCount)}
                unit="emission sources"
              />
            </div>

            {/* chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Emissions by lifecycle stage
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Bars are colored along the Mappa brand gradient and ordered by
                  the ISO 14067 lifecycle.
                </p>
              </CardHeader>
              <CardContent>
                <StageBars
                  stages={product.stages}
                  colors={stageColors}
                  maxStage={maxStage}
                  total={kpis.total}
                  largestId={kpis.largestStage.id}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium tabular-nums">{value}</dd>
    </div>
  );
}

function Kpi({ icon: Icon, label, value, unit, accent = false }) {
  return (
    <div
      className={`rounded-xl border p-4 transition-colors ${
        accent ? "border-primary/30 bg-primary/5" : "bg-card"
      }`}
    >
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Icon className="size-3.5" aria-hidden="true" />
        <p className="text-[10px] font-semibold uppercase tracking-wide">
          {label}
        </p>
      </div>
      <p className="mt-2 text-2xl font-semibold tabular-nums leading-none">
        {value}
      </p>
      <p className="mt-1.5 text-xs text-muted-foreground">{unit}</p>
    </div>
  );
}

/*
  Accessible bar list. Each row carries its value as text (not color-only), so
  it doubles as the screen-reader-friendly data table. Bars animate via a
  transform (scaleX) so there's no layout reflow, and only when the user hasn't
  requested reduced motion.
*/
function StageBars({ stages, colors, maxStage, total, largestId }) {
  const [grown, setGrown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setGrown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <ul className="space-y-3.5">
      {stages.map((stage, i) => {
        const frac = maxStage ? stage.total / maxStage : 0;
        const isLargest = stage.id === largestId;
        return (
          <li key={stage.id} className="flex items-center gap-3 text-sm">
            <span
              className={`w-24 shrink-0 truncate sm:w-32 ${
                isLargest ? "font-semibold text-foreground" : "text-muted-foreground"
              }`}
              title={stage.label}
            >
              {stage.label}
            </span>
            <span
              className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-muted"
              role="presentation"
            >
              <span
                className="absolute inset-y-0 left-0 w-full origin-left rounded-full motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out"
                style={{
                  transform: `scaleX(${grown ? frac : 0})`,
                  backgroundColor: colors[i],
                }}
              />
            </span>
            <span className="w-16 shrink-0 text-right tabular-nums">
              {stage.total.toFixed(2)}
            </span>
            <Badge
              variant="secondary"
              className="w-14 justify-center tabular-nums"
            >
              {formatPct(stage.total, total)}
            </Badge>
          </li>
        );
      })}
      <li className="flex items-center gap-3 border-t pt-3 text-sm font-semibold">
        <span className="w-24 shrink-0 sm:w-32">Total</span>
        <span className="flex-1" aria-hidden="true" />
        <span className="w-16 shrink-0 text-right tabular-nums">
          {total.toFixed(2)}
        </span>
        <span className="w-14 text-center tabular-nums">100%</span>
      </li>
    </ul>
  );
}
