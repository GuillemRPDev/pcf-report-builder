import { Document, Page, View, Text } from "@react-pdf/renderer";
import { sampleGradient } from "@/lib/brand";
import { formatKg, formatPct, computeKpis } from "@/lib/format";
import { UNIT } from "@/lib/pcf-stages";
import { createStyles } from "./styles";
import { StageBarChart } from "./StageBarChart";

/*
  The PDF report for a single product. Pure: takes a validated product object
  (see schema.js) and returns react-pdf nodes. Sections:
    1. Cover            5. (cont.) detailed component table
    2. Summary KPIs     6. Methodology / footnotes
    3. Lifecycle chart
    4. Stage breakdown table
*/
export function PcfReportDocument({ product, generatedAt, brand }) {
  const kpis = computeKpis(product);
  const stageColors = sampleGradient(product.stages.length, brand);
  const styles = createStyles(brand);
  // generatedAt is a timestamp (ms) supplied by the caller (PdfDownloadButton),
  // kept stable there so this stays a pure render.
  const dateStr = new Date(generatedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Document
      title={`PCF Report - ${product.product}`}
      author={brand.name}
      subject="Product Carbon Footprint (ISO 14067)"
    >
      {/* ---------- Page 1: Cover ---------- */}
      <Page size="A4" style={{ padding: 0 }}>
        <View style={styles.cover}>
          <View>
            <View style={styles.coverGradientBar}>
              {sampleGradient(24, brand).map((c, i) => (
                <View key={i} style={{ flex: 1, backgroundColor: c }} />
              ))}
            </View>
            <Text style={[styles.coverEyebrow, { marginTop: 24 }]}>{brand.name}</Text>
          </View>

          <View>
            <Text style={styles.coverTitle}>Product Carbon{"\n"}Footprint Report</Text>
            <Text style={styles.coverSubtitle}>
              Cradle-to-grave greenhouse gas emissions by lifecycle stage,
              reported per ISO 14067.
            </Text>
          </View>

          <View style={styles.coverMetaRow}>
            <View>
              <Text style={styles.coverMetaLabel}>Product</Text>
              <Text style={styles.coverMetaValue}>{product.product}</Text>
            </View>
            <View>
              <Text style={styles.coverMetaLabel}>Functional unit</Text>
              <Text style={styles.coverMetaValue}>{product.functionalUnit}</Text>
            </View>
            <View>
              <Text style={styles.coverMetaLabel}>Total footprint</Text>
              <Text style={styles.coverMetaValue}>{formatKg(kpis.total)}</Text>
            </View>
            <View>
              <Text style={styles.coverMetaLabel}>Generated</Text>
              <Text style={styles.coverMetaValue}>{dateStr}</Text>
            </View>
          </View>
        </View>
      </Page>

      {/* ---------- Page 2: Summary + chart + stage table ---------- */}
      <Page size="A4" style={styles.page}>
        <Footer product={product} brand={brand} styles={styles} />

        <Text style={styles.sectionTitle}>Summary</Text>
        <Text style={styles.sectionIntro}>
          Headline carbon footprint for {product.product}, per {product.functionalUnit}.
        </Text>

        <View style={styles.kpiRow}>
          <Kpi styles={styles} label="Total footprint" value={kpis.total.toFixed(2)} unit={UNIT} />
          <Kpi styles={styles} label="Per" value="1" unit={product.functionalUnit} />
          <Kpi
            styles={styles}
            label="Largest stage"
            value={kpis.largestShare}
            unit={kpis.largestStage.label}
          />
          <Kpi styles={styles} label="Lifecycle stages" value={String(kpis.stageCount)} unit="ISO 14067" />
        </View>

        <Text style={styles.sectionTitle}>Emissions by lifecycle stage</Text>
        <Text style={styles.sectionIntro}>
          Each bar is one lifecycle stage, colored along the brand gradient.
        </Text>
        <View style={{ marginBottom: 22 }}>
          <StageBarChart
            stages={product.stages}
            colors={stageColors}
            width={499}
            brand={brand}
          />
        </View>

        <View style={styles.table}>
          <View style={styles.trHead}>
            <Text style={[styles.th, styles.cellStage]}>Lifecycle stage</Text>
            <Text style={[styles.th, styles.cellNum]}>{UNIT}</Text>
            <Text style={[styles.th, styles.cellNum]}>Share</Text>
          </View>
          {product.stages.map((stage, i) => (
            <View key={stage.id} style={styles.tr}>
              <View style={styles.cellStage}>
                <View style={[styles.swatch, { backgroundColor: stageColors[i] }]} />
                <Text style={styles.td}>{stage.label}</Text>
              </View>
              <Text style={[styles.td, styles.cellNum]}>{stage.total.toFixed(2)}</Text>
              <Text style={[styles.td, styles.cellNum]}>
                {formatPct(stage.total, kpis.total)}
              </Text>
            </View>
          ))}
          <View style={styles.trHead}>
            <Text style={[styles.tdBold, styles.cellStage]}>Total</Text>
            <Text style={[styles.tdBold, styles.cellNum]}>{kpis.total.toFixed(2)}</Text>
            <Text style={[styles.tdBold, styles.cellNum]}>100%</Text>
          </View>
        </View>
      </Page>

      {/* ---------- Page 3: Detailed components + methodology ---------- */}
      <Page size="A4" style={styles.page}>
        <Footer product={product} brand={brand} styles={styles} />

        <Text style={styles.sectionTitle}>Detailed breakdown</Text>
        <Text style={styles.sectionIntro}>
          All emission sub-components grouped by lifecycle stage (ISO 14067 inventory).
        </Text>

        <View style={styles.table}>
          <View style={styles.trHead}>
            <Text style={[styles.th, styles.cellCode]}>Code</Text>
            <Text style={[styles.th, styles.cellName]}>Component</Text>
            <Text style={[styles.th, styles.cellNum]}>{UNIT}</Text>
          </View>
          {product.stages.map((stage, i) => (
            <View key={stage.id} wrap={false}>
              <View style={[styles.tr, { backgroundColor: "#fafafa" }]}>
                <View style={styles.cellCode}>
                  <View style={[styles.swatch, { backgroundColor: stageColors[i] }]} />
                </View>
                <Text style={[styles.tdBold, styles.cellName]}>{stage.label}</Text>
                <Text style={[styles.tdBold, styles.cellNum]}>{stage.total.toFixed(2)}</Text>
              </View>
              {stage.components.map((c) => (
                <View key={c.code} style={styles.tr}>
<Text style={[styles.td, styles.cellCode, { color: brand.muted }]}> 
                    {c.code}
                  </Text>
                  <Text style={[styles.td, styles.cellName]}>{c.label}</Text>
                  <Text style={[styles.td, styles.cellNum]}>{c.value.toFixed(2)}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        <View style={{ marginTop: 24 }} break={false}>
          <Text style={styles.sectionTitle}>Methodology &amp; notes</Text>
          <View style={{ marginTop: 8 }}>
            <Text style={styles.note}>
              • Figures are pre-calculated per ISO 14067 and reported per the stated
              functional unit. This tool presents the data; it does not compute emissions.
            </Text>
            <Text style={styles.note}>
              • Units: the source data is unit-less in the header; values are
              presented as {UNIT} (kilograms of CO2-equivalent) based on the dataset
              reference. Confirm with the data owner before external use.
            </Text>
            <Text style={styles.note}>
              • Scope: cradle-to-grave across six stages — Materials, Manufacturing,
              Transport, Distribution, Use and End of life.
            </Text>
            <Text style={styles.note}>
              • Stage and component totals are validated on import: each stage equals
              the sum of its components and the product total equals the sum of stages.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
function Kpi({ styles, label, value, unit }) {
  return (
    <View style={styles.kpiCard}>
      <Text style={styles.kpiLabel}>{label}</Text>
      <Text style={styles.kpiValue}>{value}</Text>
      <Text style={styles.kpiUnit}>{unit}</Text>
    </View>
  );
}

function Footer({ product, brand, styles }) {
  return (
    <View style={styles.footer} fixed>
      <Text>
        {brand.name} · Product Carbon Footprint · {product.product}
      </Text>
      <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
    </View>
  );
}