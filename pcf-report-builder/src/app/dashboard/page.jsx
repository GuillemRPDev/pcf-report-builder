import fs from "node:fs";
import path from "node:path";
import { parsePcfCsv } from "@/lib/csv";
import { AppHeader } from "@/components/app/AppHeader";
import ReportApp from "@/components/ReportApp";

/*
  Dashboard (the actual app), gated by middleware.js via the mock session cookie.
  Server Component: reads + validates the sample CSV from disk, then passes the
  validated data to the client report UI. CSV is read server-side only.
*/
export const metadata = {
  title: "Dashboard · Mappa PCF",
};

export default function DashboardPage() {
  const csvPath = path.join(process.cwd(), "src", "data", "sample-pcf.csv");
  const csvText = fs.readFileSync(csvPath, "utf8");
  const { products } = parsePcfCsv(csvText);

  return (
    <>
      <AppHeader />
      <ReportApp products={products} />
    </>
  );
}
