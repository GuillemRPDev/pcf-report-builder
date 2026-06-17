import { BRAND } from "@/lib/brand";

/*
  Mappa wordmark placeholder: a gradient dot + the brand name. TODO: replace the
  dot with the real Mappa logo (public/logo-mappa.png) when available.
*/
export function Logo({ className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2 font-semibold tracking-tight ${className}`}>
      <span
        aria-hidden="true"
        className="size-5 rounded-md"
        style={{
          backgroundImage: `linear-gradient(135deg, ${BRAND.palette.pink}, ${BRAND.palette.orange}, ${BRAND.palette.coral}, ${BRAND.palette.navy})`,
        }}
      />
      {BRAND.name}
    </span>
  );
}
