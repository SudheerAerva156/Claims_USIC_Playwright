import { AppEnvironment } from '../../src/types/env.types';

export const devatEnv: AppEnvironment = {
  name: 'DEVAT',
  baseUrl: 'https://devat-claim.majesco.io/Claim/',
  timeout: 60000,
  ignoreHTTPSErrors: true
};
export default devatEnv;
