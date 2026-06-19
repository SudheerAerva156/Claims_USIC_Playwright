export const Tags = {
  SMOKE: '@smoke',
  UPGRADE: '@upgrade',
  BASE_CAPABILITY: '@baseCapability',
  BASE_DEFECT: '@baseDefect',
  REGRESSION: '@regression',
  RECENT_TICKETS: '@recentTickets',
  CHANGE_REQUEST: '@cr',
  INCIDENT: '@incident',
  HIGH_PRIORITY_DEFECT: '@highPriorityDefect',
  REUSED_UPGRADE: '@reusedUpgrade',
  ADMIN: '@admin',
  SUPERVISOR: '@supervisor',
  MANAGER: '@manager',
  ADJUSTER: '@adjuster',
  CLAIMS_EXAMINER: '@claimsExaminer',
  READ_ONLY: '@readonly'
} as const;

export type TagType = typeof Tags[keyof typeof Tags];
export default Tags;
