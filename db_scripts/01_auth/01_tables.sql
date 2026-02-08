BEGIN;

-- =========================================
-- COUNTRIES
-- =========================================
CREATE TABLE IF NOT EXISTS country (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  iso2 char(2) NOT NULL UNIQUE,      -- Ej: AR, CL, BR
  iso3 char(3) NOT NULL UNIQUE,      -- Ej: ARG, CHL, BRA
  name_es text NOT NULL,             -- Nombre en español
  name_en text NOT NULL,             -- Nombre en inglés
  phone_code text NOT NULL,          -- Código telefónico
  currency_code char(3) NOT NULL,    -- Ej: ARS, USD, CLP
  timezone text NOT NULL,            -- Zona principal
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- =========================================
-- CURRENCY
-- =========================================
CREATE TABLE IF NOT EXISTS currency (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  code CHAR(3) NOT NULL UNIQUE,          -- ISO 4217 (USD, ARS, EUR)
  name_en TEXT NOT NULL,                 -- "US Dollar"
  name_es TEXT NOT NULL,                 -- "Dólar estadounidense"
  symbol TEXT,                           -- "$", "€"
  minor_unit SMALLINT NOT NULL DEFAULT 2, -- decimales típicos
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


CREATE TABLE IF NOT EXISTS exchange_rate (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  base_currency_id INT NOT NULL REFERENCES currency(id),
  quote_currency_id INT NOT NULL REFERENCES currency(id),
  rate NUMERIC(18,8) NOT NULL CHECK (rate > 0),  -- 1 base = rate quote
  source TEXT NOT NULL,                           -- ej: "openexchangerates", "bna", "manual"
  effective_at TIMESTAMPTZ NOT NULL,              -- desde cuándo aplica
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT now(),  -- cuándo lo guardaste
  CONSTRAINT ck_currency_pair CHECK (base_currency_id <> quote_currency_id),
  UNIQUE (base_currency_id, quote_currency_id, source, effective_at)
);

CREATE INDEX IF NOT EXISTS idx_exchange_rate_pair_time ON exchange_rate(base_currency_id, quote_currency_id, effective_at DESC);
CREATE INDEX IF NOT EXISTS idx_exchange_rate_source_time ON exchange_rate(source, fetched_at DESC);

-- ============================================================
-- HR-LIKE CATALOGS 
-- ============================================================
CREATE TABLE IF NOT EXISTS departments (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  code text NOT NULL UNIQUE,         -- ej: 'logistics', 'purchasing'
  name_es text NOT NULL,
  name_en text NOT NULL,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);


CREATE TABLE IF NOT EXISTS job_titles (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  code text NOT NULL UNIQUE,
  name_es text NOT NULL,
  name_en text NOT NULL,
  department_id INT REFERENCES departments(id),
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);


-- =========================================
-- COMPANY (Only one just now)
-- =========================================
CREATE TABLE IF NOT EXISTS company (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  legal_name TEXT,                    -- Razón social
  tax_id TEXT UNIQUE,                -- CUIT / RUT / RUC / EIN, etc.
  tax_type TEXT,                     -- Ej: "Responsable Inscripto", "Monotributo", etc.
  website TEXT,
  logo TEXT,                         -- URL o path al logo
  phone TEXT,
  email TEXT,
  address TEXT,
  city TEXT,
  country_id INT REFERENCES country(id),
  default_timezone TEXT NOT NULL DEFAULT 'America/Argentina/Buenos_Aires',
  default_language CHAR(2) NOT NULL DEFAULT 'es',
  default_currency CHAR(3) NOT NULL DEFAULT 'ARS',
  updated_at TIMESTAMPTZ  NOT NULL DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- =========================================
-- ZONE (1 zone -> N branches)
-- =========================================
CREATE TABLE IF NOT EXISTS zone (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);



-- =========================================
-- BRANCH (belongs to a company AND a zone)
-- =========================================
CREATE TABLE IF NOT EXISTS branch (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  company_id INT NOT NULL REFERENCES company(id) ON DELETE CASCADE,
  zone_id INT NOT NULL REFERENCES zone(id) ON DELETE RESTRICT,
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (company_id, code)
);

CREATE INDEX IF NOT EXISTS idx_branch_zone ON branch(zone_id);


-- =========================================
-- WAREHOUSES (belongs to a branch)
-- =========================================
CREATE TABLE IF NOT EXISTS warehouse (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  branch_id INT NOT NULL REFERENCES branch(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  description VARCHAR(255),
  max_rows INTEGER NOT NULL DEFAULT 10 CHECK (max_rows > 0),
  max_columns INTEGER NOT NULL DEFAULT 10 CHECK (max_columns > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (branch_id, code)
);

CREATE INDEX IF NOT EXISTS idx_warehouse_branch ON warehouse(branch_id);


-- =========================================
-- USER GROUPS (scope by zone OR branch OR none)
-- =========================================
CREATE TABLE IF NOT EXISTS user_group (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  zone_id   INT NULL REFERENCES zone(id)   ON DELETE CASCADE,
  branch_id INT NULL REFERENCES branch(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT ck_group_scope_exclusive CHECK (
    NOT (zone_id IS NOT NULL AND branch_id IS NOT NULL)
  )
);

CREATE INDEX IF NOT EXISTS idx_user_group_zone ON user_group(zone_id);
CREATE INDEX IF NOT EXISTS idx_user_group_branch ON user_group(branch_id);

-- =========================================
-- USERS SYSTEM
-- =========================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	  username TEXT NOT NULL UNIQUE,
    code INTEGER GENERATED ALWAYS AS IDENTITY UNIQUE,
    email TEXT NOT NULL UNIQUE,	
    password_hash TEXT NOT NULL,
    group_id INT NULL REFERENCES user_group(id) ON DELETE SET NULL,
    super_user BOOLEAN NOT NULL DEFAULT false,
    active BOOLEAN NOT NULL DEFAULT true,
    updated_at TIMESTAMPTZ DEFAULT now(),
    created_at timestamptz DEFAULT now(),
    CONSTRAINT user_admin_check CHECK (
        (super_user = true AND group_id IS NULL)
        OR
        (super_user = false AND group_id IS NOT NULL)
    )
);

-- =========================================
-- USER PROFILE 
-- =========================================
CREATE TABLE IF NOT EXISTS users_profile (
    id SERIAL PRIMARY KEY,
	  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    first_name text NOT NULL,
    last_name text NOT NULL,
    document_type text CHECK (document_type IN ('DNI','CUIT','CUIL','PASSPORT')),
    document_number text UNIQUE,
	  phone_number TEXT,
    email_alternative text,
    country_id INT REFERENCES country(id),
    city text,
    timezone text DEFAULT 'America/Argentina/Buenos_Aires',
    address TEXT,
    language char(2) DEFAULT 'es',
    department_id INT REFERENCES departments(id),
    job_title_id INT REFERENCES job_titles(id),
    prefers_dark_mode boolean DEFAULT false,
    updated_at timestamptz DEFAULT now(),
    created_at timestamptz DEFAULT now(),
    UNIQUE (user_id)
);

CREATE INDEX IF NOT EXISTS idx_users_group ON users(group_id);

-- =========================================
-- SESSIONS DATA
-- =========================================
CREATE TABLE IF NOT EXISTS sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  must_change_password BOOLEAN NOT NULL DEFAULT false,
  refresh_token_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  revoked_at timestamptz NULL,
  reset_token_hash TEXT,
	reset_token_expires TIMESTAMPTZ,
  ip text NULL,
  user_agent text NULL
);

COMMIT;
