export type DepartmentRow = {
  id: number;
  code: string;
  name_es: string;
  name_en: string;
  active: boolean;
};

export interface DepartmentRepository {
  list(): Promise<DepartmentRow[]>;
  findById(id: number): Promise<DepartmentRow | null>;
  create(input: Omit<DepartmentRow, 'id'>): Promise<DepartmentRow>;
  update(
    id: number,
    input: Omit<DepartmentRow, 'id'>,
  ): Promise<DepartmentRow | null>;
  delete(id: number): Promise<boolean>;
}
