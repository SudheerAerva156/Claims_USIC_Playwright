export const Roles = {
  ADMIN: 'Admin',
  SUPERVISOR: 'Supervisor',
  MANAGER: 'Manager',
  ADJUSTER: 'Adjuster',
  CLAIMS_EXAMINER: 'Claims Examiner',
  READ_ONLY: 'Read Only User'
} as const;

export type RoleConstType = typeof Roles[keyof typeof Roles];
export default Roles;
