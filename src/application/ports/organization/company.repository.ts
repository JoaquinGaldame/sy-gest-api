export type CompanyRow = {
  id: number;
  name: string;
  legal_name: string | null;
  tax_id: string | null;
  tax_type: string | null;
  website: string | null;
  logo: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  city: string | null;
  country_id: number | null;
  default_timezone: string;
  default_language: string;
  default_currency: string;
};

export interface CompanyRepository {
  list(): Promise<CompanyRow[]>;
  findById(id: number): Promise<CompanyRow | null>;
  create(input: Omit<CompanyRow, 'id'>): Promise<CompanyRow>;
  update(id: number, input: Omit<CompanyRow, 'id'>): Promise<CompanyRow | null>;
  delete(id: number): Promise<boolean>;
}
