export type EnvironmentName =
  | 'DEV'
  | 'DEVAT'
  | 'QA'
  | 'QA2'
  | 'CLOUDQA'
  | 'UAT';

export interface AppEnvironment {
  name: EnvironmentName;
  baseUrl: string;
  apiUrl?: string;
  claimsPath?: string;
  isHeadless?: boolean;
  timeout: number;
  ignoreHTTPSErrors?: boolean;
}
