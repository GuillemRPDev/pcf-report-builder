import { StyleSheet } from "@react-pdf/renderer";
import { BRAND } from "@/lib/pdf";

/*
  All PDF styling in one place. react-pdf uses a small flexbox/CSS subset with
  pt as the default unit and StyleSheet.create (Tailwind does NOT apply inside
  the PDF tree). Colors and fonts come from the BRAND config.
*/
export function createStyles(brand = BRAND) {
  return StyleSheet.create({
    page: {
      fontFamily: brand.font.family,
      fontSize: 10,
      color: brand.ink,
      backgroundColor: brand.paper,
      paddingTop: 48,
      paddingBottom: 56,
      paddingHorizontal: 48,
      lineHeight: 1.4,
    },

    // --- cover ---
    cover: {
      flex: 1,
      backgroundColor: brand.ink,
      color: brand.paper,
      padding: 48,
      justifyContent: "space-between",
    },
    coverGradientBar: {
      height: 8,
      flexDirection: "row",
    },
    coverEyebrow: {
      fontFamily: brand.font.bold,
      fontSize: 11,
      letterSpacing: 2,
      textTransform: "uppercase",
      color: brand.paper,
    },
    coverTitle: {
      fontFamily: brand.font.bold,
      fontSize: 40,
      lineHeight: 1.05,
      marginTop: 12,
    },
    coverSubtitle: {
      fontSize: 13,
      color: "#d4d4d8",
      marginTop: 16,
      maxWidth: 360,
    },
    coverMetaRow: {
      flexDirection: "row",
      gap: 40,
    },
    coverMetaLabel: {
      fontSize: 8,
      letterSpacing: 1,
      textTransform: "uppercase",
      color: "#a1a1aa",
    },
    coverMetaValue: {
      fontFamily: brand.font.bold,
      fontSize: 13,
      marginTop: 3,
    },

    // --- generic section ---
    sectionTitle: {
      fontFamily: brand.font.bold,
      fontSize: 16,
      marginBottom: 4,
    },
    sectionIntro: {
      fontSize: 9.5,
      color: brand.muted,
      marginBottom: 14,
      maxWidth: 440,
    },

    // --- KPI cards ---
    kpiRow: {
      flexDirection: "row",
      gap: 10,
      marginBottom: 24,
    },
    kpiCard: {
      flex: 1,
      borderWidth: 1,
      borderColor: brand.hairline,
      borderRadius: 6,
      padding: 12,
    },
    kpiLabel: {
      fontSize: 7.5,
      letterSpacing: 0.8,
      textTransform: "uppercase",
      color: brand.muted,
    },
    kpiValue: {
      fontFamily: brand.font.bold,
      fontSize: 18,
      marginTop: 6,
    },
    kpiUnit: {
      fontSize: 8,
      color: brand.muted,
      marginTop: 2,
    },

    // --- tables ---
    table: {
      borderTopWidth: 1,
      borderTopColor: brand.ink,
    },
    tr: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: brand.hairline,
      paddingVertical: 5,
    },
    trHead: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: brand.ink,
      paddingVertical: 5,
    },
    th: {
      fontFamily: brand.font.bold,
      fontSize: 8,
      letterSpacing: 0.5,
      textTransform: "uppercase",
      color: brand.muted,
    },
    td: { fontSize: 9.5 },
    tdBold: { fontFamily: brand.font.bold, fontSize: 9.5 },
    swatch: {
      width: 8,
      height: 8,
      borderRadius: 2,
      marginRight: 6,
    },
    cellStage: { flexDirection: "row", alignItems: "center", flex: 4 },
    cellNum: { flex: 2, textAlign: "right" },
    cellCode: { flex: 1.2 },
    cellName: { flex: 6 },

    // --- footnotes / methodology ---
    note: {
      fontSize: 8.5,
      color: brand.muted,
      marginBottom: 5,
      lineHeight: 1.5,
    },

    // --- running footer (fixed on every body page) ---
    footer: {
      position: "absolute",
      bottom: 24,
      left: 48,
      right: 48,
      flexDirection: "row",
      justifyContent: "space-between",
      borderTopWidth: 1,
      borderTopColor: brand.hairline,
      paddingTop: 6,
      fontSize: 7.5,
      color: brand.muted,
    },
  });
}
