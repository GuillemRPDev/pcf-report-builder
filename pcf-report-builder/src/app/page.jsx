import { Landing } from "@/components/marketing/Landing";

// Public marketing landing page. The actual app lives at /dashboard (gated by
// the mock session in middleware.js).
export default function Page() {
  return <Landing />;
}
