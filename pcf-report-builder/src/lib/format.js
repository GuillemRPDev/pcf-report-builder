import { UNIT } from "./pcf-stages";

/*
  Pure formatting + KPI helpers shared by the web UI and the PDF. Kept free of
  any @react-pdf/renderer import so the client page can use them without pulling
  the PDF engine into its bundle (that loads lazily via PdfDownloadButton).
*/

export function formatKg(value) {
  return `${value.toFixed(2)} ${UNIT}`;
}

export function formatPct(value, total) {
  if (!total) return "0%";
  return `${((value / total) * 100).toFixed(1)}%`;
}

// Derive the headline numbers for a product.
export function computeKpis(product) {
  const largest = [...product.stages].sort((a, b) => b.total - a.total)[0];
  return {
    total: product.totalEmissions,
    largestStage: largest,
    largestShare: formatPct(largest.total, product.totalEmissions),
    stageCount: product.stages.length,
    functionalUnit: product.functionalUnit,
  };
}
