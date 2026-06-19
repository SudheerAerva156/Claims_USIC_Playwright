import { AppEnvironment } from '../../src/types/env.types';

export const cloudqaEnv: AppEnvironment = {
  name: 'CLOUDQA',
  baseUrl: 'https://us-dsintsup.majesco.io/Claim/',
  timeout: 60000,
  ignoreHTTPSErrors: true
};
export default cloudqaEnv;
