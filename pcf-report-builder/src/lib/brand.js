/*
  Mappa brand config — the SINGLE source of truth for brand values, kept pure
  (no @react-pdf/renderer import) so both the web UI and the PDF can use it.
  Mirrors the CSS variables in src/app/globals.css. Swap these to re-skin.

  Brandbook rules: the palette lives in a gradient (pink -> orange -> coral ->
  navy), backgrounds are black/white, type is BDO Grotesk (regular + bold).
*/
export const BRAND = {
  name: "Mappa",
  palette: {
    pink: "#fdc2d8",
    orange: "#fca65e",
    coral: "#ff7983",
    navy: "#041282",
  },
  ink: "#000000",
  paper: "#ffffff",
  muted: "#6b7280",
  hairline: "#e5e7eb",
  // TODO: drop a real Mappa logo at public/logo-mappa.png and set this path.
  logo: null,
  font: {
    // TODO: switch to "BDOGrotesk" once the .ttf files exist (see pdf.js).
    family: "Helvetica",
    bold: "Helvetica-Bold",
  },
};

// Interpolate the brand gradient into `count` hex colors.
export function sampleGradient(count, brand = BRAND) {
  const stops = [
    brand.palette.pink,
    brand.palette.orange,
    brand.palette.coral,
    brand.palette.navy,
  ];

  if (count <= 1) return [stops[0]];
  const rgb = stops.map(hexToRgb);
  const segments = rgb.length - 1;
  return Array.from({ length: count }, (_, i) => {
    const t = (i / (count - 1)) * segments;
    const idx = Math.min(Math.floor(t), segments - 1);
    return rgbToHex(lerpRgb(rgb[idx], rgb[idx + 1], t - idx));
  });
}

export function createBrandFromClient(client) {
  return {
    name: client.name,
    palette: {
      pink: client.primary_color,
      orange: client.accent_color,
      coral: client.primary_color,
      navy: client.text_color,
    },
    ink: client.text_color,
    paper: "#ffffff",
    muted: "#6b7280",
    hairline: "#e5e7eb",
    logo: client.logo_url,
    font: {
      family: client.font_family,
      bold: client.font_family,
    },
  };
}

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}
function rgbToHex(rgb) {
  return "#" + rgb.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
}
function lerpRgb(a, b, t) {
  return a.map((v, i) => v + (b[i] - v) * t);
}
