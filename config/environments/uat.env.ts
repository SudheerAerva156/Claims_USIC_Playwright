import { AppEnvironment } from '../../src/types/env.types';

export const uatEnv: AppEnvironment = {
  name: 'UAT',
  baseUrl: 'https://uat-claim.majesco.io/Claim/',
  timeout: 60000,
  ignoreHTTPSErrors: true
};
export default uatEnv;
