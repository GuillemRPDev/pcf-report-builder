import Papa from "papaparse";
import { STAGES } from "./pcf-stages";
import { ReportSchema } from "./schema";

/*
  Parse raw PCF CSV text into the validated report data model.

  The sample CSV is "wide": one row per product, with 6 stage-total columns and
  their sub-component columns. We reshape each row into the nested hierarchy
  described in pcf-stages.js, then validate the whole thing with zod. Parsing
  keeps values as strings (dynamicTyping: false); zod coerces them at the
  boundary so number handling lives in exactly one place (schema.js).
*/
export function parsePcfCsv(csvText) {
  const { data, errors } = Papa.parse(csvText.trim(), {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false,
  });

  if (errors.length > 0) {
    const e = errors[0];
    throw new Error(`CSV parse error (row ${e.row}): ${e.message}`);
  }

  const products = data.map(rowToProduct);
  // .parse throws on any schema/integrity violation — we want loud failure here.
  return ReportSchema.parse({ products });
}

// Reshape one flat CSV row into the nested product shape (values stay strings).
function rowToProduct(row) {
  return {
    product: row.product,
    functionalUnit: row.functional_unit,
    totalEmissions: row.total_emissions,
    stages: STAGES.map((stage) => ({
      id: stage.id,
      label: stage.label,
      total: row[stage.totalColumn],
      components: stage.components.map((component) => ({
        code: component.code,
        label: component.label,
        value: row[component.column],
      })),
    })),
  };
}
