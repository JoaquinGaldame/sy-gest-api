export type ZoneRow = {
  id: number;
  code: string;
  name: string;
};

export interface ZoneRepository {
  list(): Promise<ZoneRow[]>;
  findById(id: number): Promise<ZoneRow | null>;
  create(input: { code: string; name: string }): Promise<ZoneRow>;
  update(
    id: number,
    input: { code: string; name: string },
  ): Promise<ZoneRow | null>;
  delete(id: number): Promise<boolean>;
}
