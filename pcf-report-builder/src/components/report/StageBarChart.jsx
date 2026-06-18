import { Svg, Rect, Line, Text as SvgText } from "@react-pdf/renderer";
import { formatPct } from "@/lib/format";

/*
  Horizontal bar chart of emissions per lifecycle stage, drawn with react-pdf
  SVG primitives (no HTML/Recharts — that doesn't work inside the PDF). Pure:
  data in, SVG nodes out.

  Bars show each stage's share of the product total (%), sorted ascending.

  Props:
    stages  - [{ label, total }]; the chart sorts these by share ascending
    colors  - hex color per row (sampled from the brand gradient, top to bottom)
    width   - drawing width in pt
    brand   - optional brand colors/fonts for labels
*/
export function StageBarChart({ stages, colors, width = 500, brand }) {
  // Sort by emissions (lesser to greater) rather than ISO 14067 order so the
  // chart reads as a ranking. Copy first — never mutate the incoming prop.
  const sorted = [...stages].sort((a, b) => a.total - b.total);
  const leftGutter = 92; // room for stage labels
  const valueGutter = 56; // room for value text after each bar
  const rowHeight = 26;
  const barHeight = 13;
  const topPad = 4;
  const barAreaWidth = width - leftGutter - valueGutter;
  const height = sorted.length * rowHeight + topPad * 2;
  // Bars are expressed as a share of the product total, so scale to the largest
  // share — which (totals being positive) is the largest stage either way.
  const total = sorted.reduce((sum, s) => sum + s.total, 0);
  const max = Math.max(...sorted.map((s) => s.total), 0);
  const ink = brand?.ink ?? "#000000";
  const fontFamily = brand?.font?.family ?? "Helvetica";
  const fontBold = brand?.font?.bold ?? fontFamily;

  // Pre-compute geometry once so bars and labels stay in sync.
  const rows = sorted.map((stage, i) => {
    const cy = topPad + i * rowHeight + rowHeight / 2;
    const barWidth = max > 0 ? (stage.total / max) * barAreaWidth : 0;
    return { stage, color: colors[i], cy, barWidth, pct: formatPct(stage.total, total) };
  });

  return (
    <Svg width={width} height={height}>
      {/* vertical axis line */}
      <Line
        x1={leftGutter}
        y1={topPad}
        x2={leftGutter}
        y2={height - topPad}
        strokeWidth={1}
        stroke={ink}
      />
      {/* bars */}
      {rows.map(({ stage, color, cy, barWidth }) => (
        <Rect
          key={`bar-${stage.label}`}
          x={leftGutter}
          y={cy - barHeight / 2}
          width={barWidth}
          height={barHeight}
          rx={2}
          fill={color}
        />
      ))}
      {/* stage labels (left) */}
      {rows.map(({ stage, cy }) => (
        <SvgText
          key={`lbl-${stage.label}`}
          x={leftGutter - 6}
          y={cy + 3}
          textAnchor="end"
          style={{ fontSize: 8, fontFamily, fill: ink }}
        >
          {stage.label}
        </SvgText>
      ))}
      {/* value labels (after each bar) — share of total */}
      {rows.map(({ stage, cy, barWidth, pct }) => (
        <SvgText
          key={`val-${stage.label}`}
          x={leftGutter + barWidth + 5}
          y={cy + 3}
          style={{ fontSize: 8, fontFamily: fontBold, fill: ink }}
        >
          {pct}
        </SvgText>
      ))}
    </Svg>
  );
}
