import { AppEnvironment } from '../../src/types/env.types';

export const qaEnv: AppEnvironment = {
  name: 'QA',
  baseUrl: 'https://us-qcsup.majesco.io/Claim/',
  timeout: 60000,
  ignoreHTTPSErrors: true
};
export default qaEnv;
