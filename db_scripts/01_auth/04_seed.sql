-- Auth seed data (optional)

INSERT INTO country
  (iso2, iso3, name_es, name_en, phone_code, currency_code, timezone)
VALUES
  ('AR','ARG','Argentina','Argentina','+54','ARS','America/Argentina/Buenos_Aires'),
  ('CL','CHL','Chile','Chile','+56','CLP','America/Santiago'),
  ('BR','BRA','Brasil','Brazil','+55','BRL','America/Sao_Paulo'),
  ('UY','URY','Uruguay','Uruguay','+598','UYU','America/Montevideo'),
  ('PY','PRY','Paraguay','Paraguay','+595','PYG','America/Asuncion'),
  ('BO','BOL','Bolivia','Bolivia','+591','BOB','America/La_Paz'),
  ('PE','PER','Peru','Peru','+51','PEN','America/Lima'),
  ('CO','COL','Colombia','Colombia','+57','COP','America/Bogota'),
  ('MX','MEX','Mexico','Mexico','+52','MXN','America/Mexico_City'),
  ('US','USA','United States','United States','+1','USD','America/New_York')
ON CONFLICT (iso2) DO NOTHING;

INSERT INTO currency (code, name_en, name_es, symbol, minor_unit) VALUES
  ('ARS','Argentine Peso','Peso argentino','$',2),
  ('USD','US Dollar','Dolar estadounidense','US$',2),
  ('EUR','Euro','Euro','EUR',2)
ON CONFLICT (code) DO NOTHING;

INSERT INTO departments (code, name_es, name_en) VALUES
  ('logistics', 'Logistica', 'Logistics'),
  ('warehouse', 'Almacen', 'Warehouse'),
  ('purchasing', 'Compras', 'Purchasing'),
  ('sales', 'Ventas', 'Sales'),
  ('accounting', 'Contabilidad', 'Accounting'),
  ('maintenance', 'Mantenimiento', 'Maintenance'),
  ('it', 'Sistemas', 'IT')
ON CONFLICT (code) DO NOTHING;

INSERT INTO job_titles (code, name_es, name_en, department_id)
VALUES
  ('warehouse_manager', 'Encargado de almacen', 'Warehouse Manager',
    (SELECT id FROM departments WHERE code='warehouse')),
  ('storekeeper', 'Almacenero', 'Storekeeper',
    (SELECT id FROM departments WHERE code='warehouse')),
  ('logistics_analyst', 'Analista de logistica', 'Logistics Analyst',
    (SELECT id FROM departments WHERE code='logistics'))
ON CONFLICT (code) DO NOTHING;

INSERT INTO company (name, legal_name, tax_id, country_id)
VALUES
  ('SyGest', 'Sistema de Gestion', '30-00000000-0', (SELECT id FROM country WHERE iso2='AR'))
ON CONFLICT (tax_id) DO NOTHING;

INSERT INTO zone (code, name) VALUES
  ('cptl','San Juan Capital'),
  ('riv','Rivadavia')
ON CONFLICT (code) DO NOTHING;

INSERT INTO branch (company_id, zone_id, code, name)
VALUES
  ((SELECT id FROM company LIMIT 1), (SELECT id FROM zone WHERE code='cptl'), '0001', 'Sucursal Capital'),
  ((SELECT id FROM company LIMIT 1), (SELECT id FROM zone WHERE code='riv'), '0002', 'Sucursal Rivadavia')
ON CONFLICT (company_id, code) DO NOTHING;

INSERT INTO warehouse (branch_id, code, name, description, max_rows, max_columns)
VALUES
  ((SELECT id FROM branch WHERE code='0001'), 'WHCPTL-01', 'Deposito Capital Centro', 'Principal Capital', 10, 10),
  ((SELECT id FROM branch WHERE code='0002'), 'WHRIV-01', 'Deposito Rivadavia Sur', 'Principal Sur', 10, 10)
ON CONFLICT (branch_id, code) DO NOTHING;

INSERT INTO user_group (code, name, zone_id, branch_id)
VALUES
  ('grnt', 'Gerencia', NULL, NULL),
  ('adm-cptl', 'Administración Capital', (SELECT id FROM zone WHERE code='cptl'), NULL),
  ('adm-riv', 'Administración Rivadavia', (SELECT id FROM zone WHERE code='riv'), NULL),
  ('spvr-01', 'Supervision Sucursal Capital', NULL, (SELECT id FROM branch WHERE code='0001')),
  ('spvr-02', 'Supervision Sucursal Rivadavia', NULL, (SELECT id FROM branch WHERE code='0001'))
ON CONFLICT (code) DO NOTHING;

-- Password hash for 'Admin123!'
INSERT INTO users (username, email, password_hash, group_id, super_user, active)
VALUES
  ('superadmin', 'admin@system.com', '$2b$12$ht8AYdhMmDrIzbmZ3ZmeVu0R.5XWNYMJY5xr3B/ma9CEOZnBs7M.u', NULL, true, true),
  ('gerente', 'gerencia@sygest.com', '$2b$12$ht8AYdhMmDrIzbmZ3ZmeVu0R.5XWNYMJY5xr3B/ma9CEOZnBs7M.u', (SELECT id FROM user_group WHERE code='grnt'), false, true),
  ('administrador01', 'adm01@sygest.com', '$2b$12$ht8AYdhMmDrIzbmZ3ZmeVu0R.5XWNYMJY5xr3B/ma9CEOZnBs7M.u', (SELECT id FROM user_group WHERE code='adm-cptl'), false, true),
  ('administrador02', 'adm02@sygest.com', '$2b$12$ht8AYdhMmDrIzbmZ3ZmeVu0R.5XWNYMJY5xr3B/ma9CEOZnBs7M.u', (SELECT id FROM user_group WHERE code='adm-riv'), false, true),
  ('manager01', 'manager01@sygest.com', '$2b$12$ht8AYdhMmDrIzbmZ3ZmeVu0R.5XWNYMJY5xr3B/ma9CEOZnBs7M.u', (SELECT id FROM user_group WHERE code='spvr-01'), false, true),
  ('manager02', 'manager02@sygest.com', '$2b$12$ht8AYdhMmDrIzbmZ3ZmeVu0R.5XWNYMJY5xr3B/ma9CEOZnBs7M.u', (SELECT id FROM user_group WHERE code='spvr-02'), false, true)
ON CONFLICT (email) DO NOTHING;

INSERT INTO users_profile (user_id, first_name, last_name, country_id)
VALUES
  ((SELECT id FROM users WHERE email='admin@system.com'), 'Administrador', 'Sistema', (SELECT id FROM country WHERE iso2='AR')),
  ((SELECT id FROM users WHERE email='gerencia@sygest.com'), 'Gerencia', 'Sy-Gest', (SELECT id FROM country WHERE iso2='AR')),
  ((SELECT id FROM users WHERE email='adm01@sygest.com'), 'Administrativo', 'Sy-Gest', (SELECT id FROM country WHERE iso2='AR')),
  ((SELECT id FROM users WHERE email='manager01@sygest.com'), 'Manager', 'Sy-Gest', (SELECT id FROM country WHERE iso2='AR'))
ON CONFLICT (user_id) DO NOTHING;
