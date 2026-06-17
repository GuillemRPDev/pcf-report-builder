import fs from "node:fs";
import path from "node:path";
import { parsePcfCsv } from "@/lib/csv";
import { getClients } from "@/lib/clients";
import { createBrandFromClient } from "@/lib/brand";
import { AppHeader } from "@/components/app/AppHeader";
import ReportApp from "@/components/ReportApp";

/*
  Dashboard (the actual app). Server Component: reads + validates the sample CSV
  from disk and loads client branding from Supabase, then passes both into the
  client report UI.
*/
export const metadata = {
  title: "Dashboard · Mappa PCF",
};

export default async function DashboardPage() {
  const csvPath = path.join(process.cwd(), "src", "data", "sample-pcf.csv");
  const csvText = fs.readFileSync(csvPath, "utf8");
  const { products } = parsePcfCsv(csvText);
  const clients = await getClients();
  const brand = createBrandFromClient(clients[0]);

  return (
    <>
      <AppHeader brand={brand} />
      <ReportApp products={products} clients={clients} />
    </>
  );
}
