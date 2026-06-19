import { EnvironmentName, AppEnvironment } from '../../src/types/env.types';
import dev from './dev.env';
import devat from './devat.env';
import qa from './qa.env';
import qa2 from './qa2.env';
import cloudqa from './cloudqa.env';
import uat from './uat.env';

export const environments: Record<EnvironmentName, AppEnvironment> = {
  DEV: dev,
  DEVAT: devat,
  QA: qa,
  QA2: qa2,
  CLOUDQA: cloudqa,
  UAT: uat
};
export default environments;
