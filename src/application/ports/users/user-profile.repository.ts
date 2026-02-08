export type UserProfileRow = {
  id: number;
  user_id: string;
  first_name: string;
  last_name: string;
  document_type: string | null;
  document_number: string | null;
  phone_number: string | null;
  email_alternative: string | null;
  country_id: number | null;
  city: string | null;
  timezone: string | null;
  address: string | null;
  language: string | null;
  department_id: number | null;
  job_title_id: number | null;
  prefers_dark_mode: boolean | null;
};

export interface UserProfileRepository {
  findByUserId(user_id: string): Promise<UserProfileRow | null>;
  create(input: Omit<UserProfileRow, 'id'>): Promise<UserProfileRow>;
  update(
    user_id: string,
    input: Omit<UserProfileRow, 'id' | 'user_id'>,
  ): Promise<UserProfileRow | null>;
}
