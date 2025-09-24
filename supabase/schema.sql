-- Supabase schema for VATOLA new features
-- Run in Supabase SQL editor. Adjust schema names if needed.

-- WEB RESERVATIONS (quick form)
create table if not exists public.web_reservations (
  id bigserial primary key,
  name text not null,
  contact text not null,
  room_type text,
  people int not null check (people > 0),
  extra_service text,
  status text not null default 'pending' check (status in ('pending','processed','canceled')),
  created_at timestamptz not null default now()
);

alter table public.web_reservations enable row level security;

create policy "web_reservations_read_all" on public.web_reservations
  for select using (true);

create policy "web_reservations_insert_anon" on public.web_reservations
  for insert with check (true);

create policy "web_reservations_admin_write" on public.web_reservations
  for all using (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
  ));

create index if not exists idx_web_res_created_at on public.web_reservations(created_at desc);


-- PUB MENU
create table if not exists public.pub_menu (
  id bigserial primary key,
  category text not null check (category in ('snack','boisson')),
  title text not null,
  price_min numeric,
  vegan boolean default false,
  low_fat boolean default false,
  created_at timestamptz not null default now()
);

alter table public.pub_menu enable row level security;

create policy "pub_menu_select_all" on public.pub_menu for select using (true);
create policy "pub_menu_admin_write" on public.pub_menu for all using (exists (
  select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
));

create index if not exists idx_pub_menu_created_at on public.pub_menu(created_at desc);


-- PUB MEDIA (images/vidéos cabaret & ambiance)
create table if not exists public.pub_media (
  id bigserial primary key,
  url text not null,
  type text not null check (type in ('image','video')),
  caption text,
  created_at timestamptz not null default now()
);

alter table public.pub_media enable row level security;

create policy "pub_media_select_all" on public.pub_media for select using (true);
create policy "pub_media_admin_write" on public.pub_media for all using (exists (
  select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
));

create index if not exists idx_pub_media_created_at on public.pub_media(created_at desc);


-- SPA TARIFFS
create table if not exists public.spa_tariffs (
  id bigserial primary key,
  label text not null,
  price numeric not null check (price >= 0),
  notes text,
  created_at timestamptz not null default now()
);

alter table public.spa_tariffs enable row level security;

create policy "spa_tariffs_select_all" on public.spa_tariffs for select using (true);
create policy "spa_tariffs_admin_write" on public.spa_tariffs for all using (exists (
  select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
));

create index if not exists idx_spa_tariffs_created_at on public.spa_tariffs(created_at desc);


-- SPA MEDIA
create table if not exists public.spa_media (
  id bigserial primary key,
  url text not null,
  type text not null check (type in ('image','video')),
  caption text,
  created_at timestamptz not null default now()
);

alter table public.spa_media enable row level security;

create policy "spa_media_select_all" on public.spa_media for select using (true);
create policy "spa_media_admin_write" on public.spa_media for all using (exists (
  select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
));

create index if not exists idx_spa_media_created_at on public.spa_media(created_at desc);


-- GENERIC MEDIA ASSETS (website-wide)
create table if not exists public.media_assets (
  id bigserial primary key,
  category text not null check (category in ('hotel','restaurant','pub','spa')),
  type text not null check (type in ('image','video')),
  title text,
  url text not null,
  created_at timestamptz not null default now()
);

alter table public.media_assets enable row level security;

create policy "media_assets_select_all" on public.media_assets for select using (true);
create policy "media_assets_admin_write" on public.media_assets for all using (exists (
  select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
));

create index if not exists idx_media_assets_created_at on public.media_assets(created_at desc);


-- SOCIAL LINKS (SNS)
create table if not exists public.social_links (
  id bigserial primary key,
  platform text not null,
  url text not null,
  created_at timestamptz not null default now()
);

alter table public.social_links enable row level security;

create policy "social_links_select_all" on public.social_links for select using (true);
create policy "social_links_admin_write" on public.social_links for all using (exists (
  select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
));

create index if not exists idx_social_links_platform on public.social_links(platform);
create index if not exists idx_social_links_created_at on public.social_links(created_at desc);


-- NOTE: Ensure a public storage bucket named 'room-images' exists (public read).
-- In Supabase UI: Storage > Create bucket 'room-images' (Public).
