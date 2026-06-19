import { AppEnvironment } from '../../src/types/env.types';

export const devEnv: AppEnvironment = {
  name: 'DEV',
  baseUrl: 'https://dev-claim.majesco.io/Claim/',
  timeout: 60000,
  ignoreHTTPSErrors: true
};
export default devEnv;
