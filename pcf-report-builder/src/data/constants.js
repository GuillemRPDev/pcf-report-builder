import { BarChart3, Download, FileCheck2, Palette } from "lucide-react";

/*
  Contenido estático de la app (textos y listas de la UI), separado de los
  componentes para tenerlo todo en un único sitio y poder editarlo sin tocar
  el JSX. Los componentes solo importan de aquí y "pintan".
*/

// Landing — tarjetas de características.
export const FEATURES = [
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

// Landing — pasos "How it works".
export const STEPS = [
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

// Footer — columnas de enlaces (placeholders de demo).
export const FOOTER_COLUMNS = [
  { title: "Product", links: ["Features", "Changelog", "Roadmap"] },
  { title: "Company", links: ["About", "Careers", "Contact", "Blog"] },
  { title: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] },
];

// Login — bullets del panel de marca.
export const LOGIN_POINTS = [
  "ISO 14067 data, validated on import",
  "On-brand, multi-page PDF export",
  "Lifecycle-stage breakdown charts",
];

// Login — credenciales de demo prerrellenadas (el login es decorativo).
export const DEMO_CREDENTIALS = {
  email: "demo@mappa.example",
  password: "carbon123",
};
