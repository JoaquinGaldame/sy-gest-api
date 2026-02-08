export type CurrencyRow = {
  id: number;
  code: string;
  name_en: string;
  name_es: string;
  symbol: string | null;
  minor_unit: number;
  active: boolean;
};

export interface CurrencyRepository {
  list(): Promise<CurrencyRow[]>;
  findById(id: number): Promise<CurrencyRow | null>;
  create(input: Omit<CurrencyRow, 'id'>): Promise<CurrencyRow>;
  update(
    id: number,
    input: Omit<CurrencyRow, 'id'>,
  ): Promise<CurrencyRow | null>;
  delete(id: number): Promise<boolean>;
}
