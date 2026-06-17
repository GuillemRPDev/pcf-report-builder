/*
  ISO 14067 lifecycle-stage taxonomy — the single source of truth that maps the
  flat sample CSV columns into a 3-level hierarchy:

      report -> products -> stages (6) -> components

  csv.js uses this to shape each row, schema.js validates the result, and the
  report components render from it. To support a different CSV, edit this map.

  NOTE: the sample CSV header does not state a unit. Filename references ISO
  14067 and totals sit at ~80-110 per functional unit, so values are treated as
  kilograms of CO2-equivalent (kg CO2e). Surfaced as an assumption in the report.
*/
export const STAGES = [
  {
    id: "materials",
    label: "Materials",
    totalColumn: "total_materials",
    components: [
      { code: "1.1", column: "1_1_raw_materials", label: "Raw materials" },
      { code: "1.2", column: "1_2_inbound_packaging_material", label: "Inbound packaging material" },
      { code: "1.3", column: "1_3_outbound_packaging_material", label: "Outbound packaging material" },
    ],
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    totalColumn: "total_manufacturing",
    components: [
      { code: "2.1", column: "2_1_electricity_use_in_manufacturing", label: "Electricity use in manufacturing" },
      { code: "2.2", column: "2_2_other_energy_use_in_manufacturing", label: "Other energy use in manufacturing" },
      { code: "2.3", column: "2_3_consumables_and_additives", label: "Consumables and additives" },
      { code: "2.4", column: "2_4_waste_generated", label: "Waste generated" },
    ],
  },
  {
    id: "transport",
    label: "Transport",
    totalColumn: "total_transport",
    components: [
      { code: "3.1", column: "3_1_transport_of_materials", label: "Transport of materials" },
      { code: "3.2", column: "3_2_transport_of_packaging", label: "Transport of packaging" },
      { code: "3.3", column: "3_3_transport_of_consumables_and_additives", label: "Transport of consumables and additives" },
      { code: "3.4", column: "3_4_transport_of_waste_to_waste_manager", label: "Transport of waste to waste manager" },
      { code: "3.5", column: "3_5_internal_transport", label: "Internal transport" },
    ],
  },
  {
    id: "distribution",
    label: "Distribution",
    totalColumn: "total_distribution",
    components: [
      { code: "4.1", column: "4_1_product_distribution", label: "Product distribution" },
    ],
  },
  {
    id: "use",
    label: "Use",
    totalColumn: "total_use",
    components: [
      { code: "5.1", column: "5_1_product_use", label: "Product use" },
      { code: "5.2", column: "5_2_maintenance_and_servicing", label: "Maintenance and servicing" },
      { code: "5.3", column: "5_3_other_use_stage_emissions", label: "Other use-stage emissions" },
    ],
  },
  {
    id: "end_of_life",
    label: "End of life",
    totalColumn: "total_end_of_life",
    components: [
      { code: "6.1", column: "6_1_collection_and_transport_of_end_of_life_products", label: "Collection and transport of end-of-life products" },
      { code: "6.2", column: "6_2_end_of_life_treatment", label: "End-of-life treatment" },
      { code: "6.3", column: "6_3_final_disposal", label: "Final disposal" },
    ],
  },
];

// Unit label used everywhere. Plain "CO2e" (no subscript) so it renders with the
// standard PDF Helvetica font, which lacks the subscript-2 glyph.
export const UNIT = "kg CO2e";
