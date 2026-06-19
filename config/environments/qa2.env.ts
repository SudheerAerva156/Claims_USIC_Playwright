import { AppEnvironment } from '../../src/types/env.types';

export const qa2Env: AppEnvironment = {
  name: 'QA2',
  baseUrl: 'https://qa2-claim.majesco.io/Claim/',
  timeout: 60000,
  ignoreHTTPSErrors: true
};
export default qa2Env;
