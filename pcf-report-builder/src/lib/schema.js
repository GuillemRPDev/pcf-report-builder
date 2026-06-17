import { z } from "zod";
import { STAGES } from "./pcf-stages";

/*
  The zod data model = the contract for the whole app. CSV is parsed into these
  shapes and the report renders from the parsed result. Numbers arrive from the
  CSV as strings, so we coerce them and assert they are finite and non-negative.

  Two .superRefine() integrity checks exploit the source data's hierarchy:
    - each stage total ~= the sum of its components
    - each product total ~= the sum of its stage totals
  This catches a malformed or mis-mapped CSV at the boundary instead of letting
  a wrong chart render silently.
*/

// kg CO2e tolerance for rounding drift in the pre-calculated source values.
const TOLERANCE = 0.05;

const emissionValue = z.coerce.number().finite().nonnegative();

export const ComponentSchema = z.object({
  code: z.string(),
  label: z.string(),
  value: emissionValue,
});

export const StageSchema = z
  .object({
    id: z.string(),
    label: z.string(),
    total: emissionValue,
    components: z.array(ComponentSchema).min(1),
  })
  .superRefine((stage, ctx) => {
    const sum = stage.components.reduce((acc, c) => acc + c.value, 0);
    if (Math.abs(sum - stage.total) > TOLERANCE) {
      ctx.addIssue({
        code: "custom",
        message: `Stage "${stage.label}": total ${stage.total} != sum of components ${sum.toFixed(3)}`,
      });
    }
  });

export const ProductPcfSchema = z
  .object({
    product: z.string().min(1),
    functionalUnit: z.string().min(1),
    totalEmissions: emissionValue,
    stages: z.array(StageSchema).length(STAGES.length),
  })
  .superRefine((product, ctx) => {
    const sum = product.stages.reduce((acc, s) => acc + s.total, 0);
    if (Math.abs(sum - product.totalEmissions) > TOLERANCE) {
      ctx.addIssue({
        code: "custom",
        message: `Product "${product.product}": total ${product.totalEmissions} != sum of stages ${sum.toFixed(3)}`,
      });
    }
  });

export const ReportSchema = z.object({
  products: z.array(ProductPcfSchema).min(1),
});
