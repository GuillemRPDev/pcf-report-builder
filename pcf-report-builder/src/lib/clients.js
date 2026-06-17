import { z } from "zod";
import { createSupabaseClient } from "./supabase/server";

const ClientSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  slug: z.string().min(1),
  logo_url: z.string().url(),
  primary_color: z.string().min(1),
  accent_color: z.string().min(1),
  text_color: z.string().min(1),
  font_family: z.string().min(1),
  created_at: z.string(),
});

const ClientsSchema = z.array(ClientSchema);

const FALLBACK_CLIENTS = [
  {
    id: "00000000-0000-0000-0000-000000000001",
    name: "Relats",
    slug: "relats",
    logo_url: "https://placehold.co/80x80?text=Relats",
    primary_color: "#041282",
    accent_color: "#ff7983",
    text_color: "#111827",
    font_family: "Helvetica",
    created_at: new Date().toISOString(),
  },
];

export async function getClients() {
  const supabase = createSupabaseClient();
  if (!supabase) {
    return FALLBACK_CLIENTS;
  }

  const { data, error } = await supabase.from("clients").select("*");

  if (error || !data) {
    return FALLBACK_CLIENTS;
  }

  return ClientsSchema.parse(data);
}

export async function getClientBySlug(slug) {
  const clients = await getClients();
  return clients.find((client) => client.slug === slug) ?? clients[0];
}
