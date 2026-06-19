import path from 'path';

export const Paths = {
  reportsRoot: path.join(process.cwd(), 'reports'),
  artifactsRoot: path.join(process.cwd(), 'reports', 'artifacts'),
  dashboardsRoot: path.join(process.cwd(), 'reports', 'dashboards'),
  htmlReport: path.join(process.cwd(), 'reports', 'html-report'),
  allureResults: path.join(process.cwd(), 'allure-results'),
  logsFile: path.join(process.cwd(), 'logs', 'execution.log')
};
export default Paths;
