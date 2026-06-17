-- Create clients table for public branding profiles.
create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  logo_url text not null,
  primary_color text not null,
  accent_color text not null,
  text_color text not null,
  font_family text not null,
  created_at timestamptz not null default now()
);

alter table clients enable row level security;

create policy "Public select clients" on clients
  for select
  using (true);

-- Seed sample clients.
insert into clients (name, slug, logo_url, primary_color, accent_color, text_color, font_family)
values
  ('Relats', 'relats', 'https://placehold.co/80x80?text=Relats', '#041282', '#ff7983', '#111827', 'Helvetica'),
  ('Atlas Labs', 'atlas-labs', 'https://placehold.co/80x80?text=Atlas', '#0f766e', '#38bdf8', '#111827', 'Helvetica'),
  ('TerraCo', 'terraco', 'https://placehold.co/80x80?text=Terra', '#134e4a', '#f97316', '#111827', 'Helvetica');
