# AGENTS.md

Instructions for AI coding agents working in this repo. Read this before writing or editing any code.

This is a small web app that generates **branded PDF carbon reports** from sample CSV data, built for a technical challenge. Scope is deliberately tight: a clean, correct, deeply-understood build beats a large one. Prefer the simplest thing that works and is easy to explain.

---

## Non-negotiable stack constraints

These are the patterns agents most often get wrong here. Follow them exactly.

- **Next.js 16, App Router only.** Never use the Pages Router. No `pages/` directory, no `getServerSideProps`/`getStaticProps`, no `_app.js`/`_document.js`. Routes live under `src/app/`.
- **React 19.**
- **JavaScript / JSX only — NO TypeScript.** All files are `.js` / `.jsx`. Never create `.ts`/`.tsx` files, never add type annotations, never add a `tsconfig.json`. Path aliases live in `jsconfig.json`, where `@/*` maps to `./src/*`. This is a hard requirement of the brief.
- **Tailwind CSS v4.** Config is CSS-first. `src/app/globals.css` starts with `@import "tailwindcss";` and theme tokens are defined with `@theme` / CSS variables (OKLCH). Do **not** create or expect a `tailwind.config.js`, and do **not** use the v3 directives `@tailwind base/components/utilities`.
- **shadcn/ui, "new-york" style.** Components live in `src/components/ui/*.jsx` and are added via the CLI: `npx shadcn@latest add <name>` (append `--force` if npm complains about React 19 peer deps). Do not hand-write shadcn components or install them as an npm package. `components.json` has `"tsx": false`.
- **Icons: `lucide-react`.** No other icon set.
- **Validation: `zod`** at every data boundary (CSV parsing, form inputs).
- **PDF engine: `@react-pdf/renderer`** (see rules below).
- **Package manager: npm.** Use `--force` on shadcn adds if React 19 peer-dep warnings appear.

If a change would require any of: the Pages Router, TypeScript, a `tailwind.config.js`, or a different PDF library — stop and flag it instead of doing it.

---

## @react-pdf/renderer rules

This is NOT HTML-to-PDF. It has its own renderer and a limited CSS subset.

- Build reports from its primitives: `Document`, `Page`, `View`, `Text`, `Image`, `Link`. Style with `StyleSheet.create({...})`, not Tailwind classes (Tailwind does not apply inside the PDF tree).
- Layout is flexbox-based. **No CSS grid.** Default unit is `pt`.
- For charts/graphs, draw with the SVG primitives (`Svg`, `Rect`, `Line`, `Path`, `Text`) — do not try to embed HTML/Recharts/Chart.js output.
- Register brand fonts with `Font.register({ family, src })` before using them.
- Running headers/footers: use `fixed` views; page breaks: the `break` prop and `wrap`.
- Client-side download uses `PDFDownloadLink` inside a `"use client"` component. To avoid SSR issues in Next, dynamically import the PDF component with `{ ssr: false }`.
- Keep report layout components separate and pure (data in, PDF nodes out) so they're easy to test and explain.

---

## Project structure

```
src/
  app/
    layout.jsx        # root layout
    page.jsx          # app shell + config UI ("use client")
    globals.css       # Tailwind v4 @import + @theme tokens (brand palette)
  components/
    ui/               # shadcn components (.jsx, generated)
    report/           # @react-pdf/renderer report components
  lib/
    csv.js            # CSV parsing
    schema.js         # zod schemas = the data model
    pdf.js            # react-pdf helpers / font registration
  data/               # provided sample CSV(s), read server-side
public/               # logo, static brand assets (ALWAYS at project root, NOT in src/)
docs/                 # reference only: sample report PDF, brandbook (not shipped)
```

The **data model lives in `src/lib/schema.js`** as zod schemas. Treat those schemas as the contract: parse CSV into them, and render the report from the parsed result.

**Sample data loading:** read the CSV server-side (e.g. in a Server Component or route handler using `fs` + `process.cwd()`), parse and validate it, then pass the validated data as props into the `"use client"` page. Do not try to read it from the client.

---

## Branding (the report is for "Relats")

- The report must be branded for **Relats** (the client), using their public logo, color palette, and typography.
- Brand tokens live as CSS variables in `src/app/globals.css` for the app UI, and are mirrored in `src/lib/pdf.js` (`StyleSheet` / `Font.register`) for the PDF (react-pdf can't read CSS variables).
- Keep all brand values (colors, fonts, logo path) in ONE config object so they're trivial to swap.
- TODO: fill exact palette/fonts from branding research. Until then use neutral placeholders.

---

## Conventions

- Keep the Next-specific surface small: one app page, at most one route handler. Most logic is plain React + small JS modules.
- Add `"use client"` only to components that need browser APIs / interactivity (the config UI, the PDF download trigger). Keep everything else server-friendly.
- Prefer small, single-purpose modules over large files. Name things for the domain (lifecycle stage, emission factor, scope), not generic `utils2`.
- No secrets in the repo. No backend required (Xano is optional and not used here).

## Commands

```bash
npm run dev      # local dev (Turbopack)
npm run build    # production build — must pass before submit
npm run lint     # eslint
npx shadcn@latest add <component>   # add a shadcn component (add --force if needed)
```

## Definition of done for a change

- `npm run build` passes.
- No `.ts`/`.tsx` files, no `tailwind.config.js`, no Pages Router introduced.
- New data shapes are reflected in `src/lib/schema.js`.
- The author can explain what changed and why (this is a challenge graded on defensibility).