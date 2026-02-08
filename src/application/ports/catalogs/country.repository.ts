export type CountryRow = {
  id: number;
  iso2: string;
  iso3: string;
  name_es: string;
  name_en: string;
  phone_code: string;
  currency_code: string;
  timezone: string;
  active: boolean;
};

export interface CountryRepository {
  list(): Promise<CountryRow[]>;
  findById(id: number): Promise<CountryRow | null>;
  create(input: Omit<CountryRow, 'id'>): Promise<CountryRow>;
  update(id: number, input: Omit<CountryRow, 'id'>): Promise<CountryRow | null>;
  delete(id: number): Promise<boolean>;
}
