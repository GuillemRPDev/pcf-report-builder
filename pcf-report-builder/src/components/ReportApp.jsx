"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { BRAND, sampleGradient } from "@/lib/brand";
import { computeKpis, formatPct } from "@/lib/format";
import { UNIT } from "@/lib/pcf-stages";

/*
  Client app shell: pick a product, preview its KPIs and stage breakdown, and
  download the branded PDF. Validated data arrives as a prop from the server
  page. The PDF button is dynamically imported with { ssr: false } so the
  @react-pdf/renderer engine only loads in the browser (it can't run on the
  server) and stays out of this component's initial bundle.
*/
const PdfDownloadButton = dynamic(
  () => import("@/components/report/PdfDownloadButton"),
  {
    ssr: false,
    loading: () => (
      <Button disabled className="gap-2">
        Loading…
      </Button>
    ),
  }
);

export default function ReportApp({ products }) {
  const [index, setIndex] = useState(0);
  const product = products[index];

  const kpis = useMemo(() => computeKpis(product), [product]);
  const stageColors = useMemo(
    () => sampleGradient(product.stages.length),
    [product]
  );
  const maxStage = Math.max(...product.stages.map((s) => s.total));

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      {/* brand gradient bar */}
      <div
        className="mb-6 h-2 w-full rounded-full"
        style={{
          backgroundImage: `linear-gradient(to right, ${BRAND.palette.pink}, ${BRAND.palette.orange}, ${BRAND.palette.coral}, ${BRAND.palette.navy})`,
        }}
      />

      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-mappa-navy">
          {BRAND.name}
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          Product Carbon Footprint Report Builder
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Pick a product to preview its ISO 14067 footprint, then download a
          branded PDF. Figures are pre-calculated; this tool only presents them.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Report configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* product picker */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Product</label>
            <Select value={String(index)} onValueChange={(v) => setIndex(Number(v))}>
              <SelectTrigger className="w-full sm:w-80">
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
          </div>

          {/* KPI preview */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Kpi label="Total footprint" value={kpis.total.toFixed(2)} unit={UNIT} />
            <Kpi label="Per" value="1" unit={product.functionalUnit} />
            <Kpi
              label="Largest stage"
              value={kpis.largestShare}
              unit={kpis.largestStage.label}
            />
            <Kpi label="Stages" value={String(kpis.stageCount)} unit="ISO 14067" />
          </div>

          <Separator />

          {/* stage breakdown preview */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Emissions by lifecycle stage</p>
            <ul className="space-y-2">
              {product.stages.map((stage, i) => (
                <li key={stage.id} className="flex items-center gap-3 text-sm">
                  <span className="w-28 shrink-0 text-muted-foreground">
                    {stage.label}
                  </span>
                  <span className="relative h-3 flex-1 overflow-hidden rounded-full bg-muted">
                    <span
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        width: `${maxStage ? (stage.total / maxStage) * 100 : 0}%`,
                        backgroundColor: stageColors[i],
                      }}
                    />
                  </span>
                  <span className="w-24 shrink-0 text-right tabular-nums">
                    {stage.total.toFixed(2)}
                  </span>
                  <Badge variant="secondary" className="w-14 justify-center tabular-nums">
                    {formatPct(stage.total, kpis.total)}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              3-page report: cover, summary &amp; chart, detailed breakdown.
            </p>
            <PdfDownloadButton product={product} />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

function Kpi({ label, value, unit }) {
  return (
    <div className="rounded-lg border p-3">
      <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-xl font-semibold tabular-nums">{value}</p>
      <p className="text-xs text-muted-foreground">{unit}</p>
    </div>
  );
}
