import fs from "node:fs";
import path from "node:path";
import { parsePcfCsv } from "@/lib/csv";
import ReportApp from "@/components/ReportApp";

/*
  Server Component. Reads the sample CSV from disk (fs + process.cwd()), parses
  and validates it against the zod model, then passes the validated data into
  the client app as props. Per AGENTS.md the CSV is read server-side only and is
  never fetched from the browser. If the CSV is malformed, parsePcfCsv throws and
  the build/request fails loudly — which is what we want at this boundary.
*/
export default function Page() {
  const csvPath = path.join(process.cwd(), "src", "data", "sample-pcf.csv");
  const csvText = fs.readFileSync(csvPath, "utf8");
  const { products } = parsePcfCsv(csvText);

  return <ReportApp products={products} />;
}
