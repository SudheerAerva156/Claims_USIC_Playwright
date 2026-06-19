export type UserRole =
  | 'Admin'
  | 'Supervisor'
  | 'Manager'
  | 'Adjuster'
  | 'Claims Examiner'
  | 'Read Only User';

export interface UserCredentials {
  username: string;
  password: string;
}
