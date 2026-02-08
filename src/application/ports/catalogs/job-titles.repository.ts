export type JobTitleRow = {
  id: number;
  code: string;
  name_es: string;
  name_en: string;
  department_id: number | null;
  active: boolean;
};

export interface JobTitleRepository {
  list(): Promise<JobTitleRow[]>;
  findById(id: number): Promise<JobTitleRow | null>;
  create(input: Omit<JobTitleRow, 'id'>): Promise<JobTitleRow>;
  update(
    id: number,
    input: Omit<JobTitleRow, 'id'>,
  ): Promise<JobTitleRow | null>;
  delete(id: number): Promise<boolean>;
}
