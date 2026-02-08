export type ExchangeRateRow = {
  id: number;
  base_currency_id: number;
  quote_currency_id: number;
  rate: string;
  source: string;
  effective_at: string;
  fetched_at: string;
};

export interface ExchangeRateRepository {
  list(): Promise<ExchangeRateRow[]>;
  findById(id: number): Promise<ExchangeRateRow | null>;
  create(
    input: Omit<ExchangeRateRow, 'id' | 'fetched_at'>,
  ): Promise<ExchangeRateRow>;
  update(
    id: number,
    input: Omit<ExchangeRateRow, 'id' | 'fetched_at'>,
  ): Promise<ExchangeRateRow | null>;
  delete(id: number): Promise<boolean>;
}
