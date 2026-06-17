"use client";

import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PcfReportDocument } from "./PcfReportDocument";

/*
  Client-only PDF download trigger. @react-pdf/renderer must not run on the
  server, so this component is dynamically imported with { ssr: false } by the
  parent (ReportApp). PDFDownloadLink builds the PDF in the browser and exposes
  a `loading` flag while it renders.
*/
export default function PdfDownloadButton({ product }) {
  const fileName = `pcf-report-${slugify(product.product)}.pdf`;
  // Stable "generated at" timestamp: lazy state initializer runs once, so the
  // date stays fixed across re-renders (and satisfies React's purity rule).
  const [generatedAt] = useState(() => Date.now());

  return (
    <PDFDownloadLink
      document={<PcfReportDocument product={product} generatedAt={generatedAt} />}
      fileName={fileName}
    >
      {({ loading }) => (
        <Button disabled={loading} className="gap-2">
          {loading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Download className="size-4" />
          )}
          {loading ? "Preparing PDF…" : "Download PDF"}
        </Button>
      )}
    </PDFDownloadLink>
  );
}

// Make a filesystem-friendly slug, stripping accents (e.g. "algodón" -> "algodon").
function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
