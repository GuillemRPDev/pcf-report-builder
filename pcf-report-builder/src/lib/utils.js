import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// shadcn/ui class-merge helper: combine conditional classes (clsx) and
// resolve Tailwind conflicts (tailwind-merge). Used by every ui/* component.
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
