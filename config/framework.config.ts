import path from 'path';

export const FrameworkConfig = {
  defaultEnv: 'QA',
  timeouts: {
    action: 15000,
    navigation: 30000,
    test: 60000
  },
  retries: {
    ci: 2,
    local: 0
  },
  workers: {
    ci: 4,
    local: undefined
  },
  artifactsDir: path.join(process.cwd(), 'reports', 'artifacts'),
  dashboardsDir: path.join(process.cwd(), 'reports', 'dashboards'),
  htmlReportDir: path.join(process.cwd(), 'reports', 'html-report'),
  allureResultsDir: path.join(process.cwd(), 'allure-results')
};
export default FrameworkConfig;
