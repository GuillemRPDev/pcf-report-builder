import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

/*
  The brand typeface is BDO Grotesk (brandbook). We don't ship its files, so the
  web UI uses Geist as a neutral grotesk placeholder; the PDF uses Helvetica
  (see src/lib/pdf.js). Swap both when the real font is available.
*/
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mappa · PCF Report Builder",
  description:
    "Generate branded Product Carbon Footprint (ISO 14067) PDF reports from sample data.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
