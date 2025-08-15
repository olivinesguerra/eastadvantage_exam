export interface User {
  id?: string,
  name?: string,
  email?: string,
  email_verified_at?: boolean | null,
  role?: number[],
  lock_version?: number | null,
  created_at?: string,
  updated_at?: string
};