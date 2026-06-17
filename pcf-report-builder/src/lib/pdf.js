import { Font } from "@react-pdf/renderer";
import { BRAND } from "./brand";

/*
  react-pdf-side entry point. Handles font registration (the one thing that
  needs the PDF engine) and re-exports the pure brand/format helpers so report
  components can import everything from one place. The web UI imports the same
  helpers directly from "./brand" / "./format" to avoid bundling react-pdf.
*/

// Re-exports — report components do: import { BRAND, sampleGradient, ... } from "@/lib/pdf"
export { BRAND, sampleGradient } from "./brand";
export { formatKg, formatPct, computeKpis } from "./format";

/*
  Enable the real brand font (BDO Grotesk):
    1. Add public/fonts/BDOGrotesk-Regular.ttf and BDOGrotesk-Bold.ttf
    2. Uncomment the block below
    3. Set BRAND.font.family / BRAND.font.bold to "BDOGrotesk" in brand.js
  Until then we use the built-in Helvetica, so the build needs no font files.
*/
// Font.register({
//   family: "BDOGrotesk",
//   fonts: [
//     { src: "/fonts/BDOGrotesk-Regular.ttf", fontWeight: "normal" },
//     { src: "/fonts/BDOGrotesk-Bold.ttf", fontWeight: "bold" },
//   ],
// });

// Keep `BRAND` referenced so tree-shaking doesn't drop the import used above
// once the Font.register block is enabled.
export const FONT_FAMILY = BRAND.font.family;

// Disable hyphenation so long stage/component labels aren't chopped mid-word.
Font.registerHyphenationCallback((word) => [word]);
