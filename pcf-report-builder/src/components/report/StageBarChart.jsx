import { Svg, Rect, Line, Text as SvgText } from "@react-pdf/renderer";
import { BRAND } from "@/lib/pdf";

/*
  Horizontal bar chart of emissions per lifecycle stage, drawn with react-pdf
  SVG primitives (no HTML/Recharts — that doesn't work inside the PDF). Pure:
  data in, SVG nodes out.

  Props:
    stages  - [{ label, total }] in lifecycle order
    colors  - hex color per stage (sampled from the brand gradient)
    width   - drawing width in pt
*/
export function StageBarChart({ stages, colors, width = 500 }) {
  const leftGutter = 92; // room for stage labels
  const valueGutter = 56; // room for value text after each bar
  const rowHeight = 26;
  const barHeight = 13;
  const topPad = 4;
  const barAreaWidth = width - leftGutter - valueGutter;
  const height = stages.length * rowHeight + topPad * 2;
  const max = Math.max(...stages.map((s) => s.total), 0);

  // Pre-compute geometry once so bars and labels stay in sync.
  const rows = stages.map((stage, i) => {
    const cy = topPad + i * rowHeight + rowHeight / 2;
    const barWidth = max > 0 ? (stage.total / max) * barAreaWidth : 0;
    return { stage, color: colors[i], cy, barWidth };
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
        stroke={BRAND.ink}
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
          style={{ fontSize: 8, fontFamily: BRAND.font.family, fill: BRAND.ink }}
        >
          {stage.label}
        </SvgText>
      ))}
      {/* value labels (after each bar) */}
      {rows.map(({ stage, cy, barWidth }) => (
        <SvgText
          key={`val-${stage.label}`}
          x={leftGutter + barWidth + 5}
          y={cy + 3}
          style={{ fontSize: 8, fontFamily: BRAND.font.bold, fill: BRAND.ink }}
        >
          {stage.total.toFixed(1)}
        </SvgText>
      ))}
    </Svg>
  );
}
