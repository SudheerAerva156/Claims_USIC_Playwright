export const Environments = {
  DEV: 'DEV',
  DEVAT: 'DEVAT',
  QA: 'QA',
  QA2: 'QA2',
  CLOUDQA: 'CLOUDQA',
  UAT: 'UAT'
} as const;

export type EnvironmentConstType = typeof Environments[keyof typeof Environments];
export default Environments;
