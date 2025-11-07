-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.bookings (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  room_id bigint NOT NULL,
  check_in date NOT NULL,
  check_out date NOT NULL,
  status text NOT NULL,
  people numeric NOT NULL,
  user_id uuid,
  night numeric,
  total_price numeric,
  CONSTRAINT bookings_pkey PRIMARY KEY (id),
  CONSTRAINT bookings_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.rooms(id),
  CONSTRAINT bookings_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT bookings_user_id_fkey1 FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.contacts (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  name text,
  email text,
  phone text,
  subject text,
  message text,
  read bytea,
  CONSTRAINT contacts_pkey PRIMARY KEY (id)
);
CREATE TABLE public.media_assets (
  id bigint NOT NULL DEFAULT nextval('media_assets_id_seq'::regclass),
  category text NOT NULL CHECK (category = ANY (ARRAY['hotel'::text, 'restaurant'::text, 'pub'::text, 'spa'::text])),
  type text NOT NULL CHECK (type = ANY (ARRAY['image'::text, 'video'::text])),
  title text,
  url text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  published boolean,
  CONSTRAINT media_assets_pkey PRIMARY KEY (id)
);
CREATE TABLE public.nails_services (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  name text,
  description text,
  price numeric,
  duration numeric,
  image text,
  published boolean,
  CONSTRAINT nails_services_pkey PRIMARY KEY (id)
);
CREATE TABLE public.notifications (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  type text,
  message text,
  data json,
  is_read boolean,
  CONSTRAINT notifications_pkey PRIMARY KEY (id)
);
CREATE TABLE public.profiles (
  id uuid NOT NULL,
  name text,
  surname text,
  birthday date,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  role text,
  email character varying UNIQUE,
  phone text,
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
CREATE TABLE public.profiles_odyss (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE,
  first_name text,
  last_name text,
  institution text,
  user_type text,
  phone text,
  date_of_birth date,
  address text,
  city text,
  postal_code text,
  country text,
  avatar_url text,
  bio text,
  current_level text,
  specialization text,
  grade_average numeric,
  is_active boolean NOT NULL DEFAULT true,
  email_notifications boolean NOT NULL DEFAULT true,
  push_notifications boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT profiles_odyss_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_odyss_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.pub_media (
  id bigint NOT NULL DEFAULT nextval('pub_media_id_seq'::regclass),
  url text NOT NULL,
  type text NOT NULL CHECK (type = ANY (ARRAY['image'::text, 'video'::text])),
  caption text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  published boolean,
  CONSTRAINT pub_media_pkey PRIMARY KEY (id)
);
CREATE TABLE public.pub_menu (
  id bigint NOT NULL DEFAULT nextval('pub_menu_id_seq'::regclass),
  category text NOT NULL CHECK (category = ANY (ARRAY['snack'::text, 'boisson'::text])),
  title text NOT NULL,
  price_min numeric,
  vegan boolean DEFAULT false,
  low_fat boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT pub_menu_pkey PRIMARY KEY (id)
);
CREATE TABLE public.rooms (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
  name text,
  type text,
  description text,
  price numeric,
  size integer,
  capacity integer,
  amenities ARRAY,
  images ARRAY,
  featured boolean,
  created_at timestamp with time zone,
  CONSTRAINT rooms_pkey PRIMARY KEY (id)
);
CREATE TABLE public.social_links (
  id bigint NOT NULL DEFAULT nextval('social_links_id_seq'::regclass),
  platform text NOT NULL,
  url text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT social_links_pkey PRIMARY KEY (id)
);
CREATE TABLE public.spa_media (
  id bigint NOT NULL DEFAULT nextval('spa_media_id_seq'::regclass),
  url text NOT NULL,
  type text NOT NULL CHECK (type = ANY (ARRAY['image'::text, 'video'::text])),
  caption text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  published boolean,
  CONSTRAINT spa_media_pkey PRIMARY KEY (id)
);
CREATE TABLE public.spa_tariffs (
  id bigint NOT NULL DEFAULT nextval('spa_tariffs_id_seq'::regclass),
  label text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0::numeric),
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT spa_tariffs_pkey PRIMARY KEY (id)
);
CREATE TABLE public.web_reservations (
  id bigint NOT NULL DEFAULT nextval('web_reservations_id_seq'::regclass),
  name text NOT NULL,
  contact text NOT NULL,
  room_type text,
  people integer NOT NULL DEFAULT 1,
  extra_service text,
  created_at timestamp with time zone DEFAULT now(),
  status text,
  CONSTRAINT web_reservations_pkey PRIMARY KEY (id)
);