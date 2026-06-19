import { test as base, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { LoginPage } from '../pages/auth/LoginPage';
import { HomePage } from '../pages/home/HomePage';
import { DashboardPage } from '../pages/home/DashboardPage';
import { ClaimsSearchPage } from '../pages/claims/ClaimsSearchPage';
import { ClaimsDetailsPage } from '../pages/claims/ClaimsDetailsPage';
import { ClaimsReservePage } from '../pages/claims/ClaimsReservePage';
import { ClaimsPaymentPage } from '../pages/claims/ClaimsPaymentPage';
import { ClaimsNotesPage } from '../pages/claims/ClaimsNotesPage';
import { HeaderComponent } from '../pages/components/HeaderComponent';
import { LeftNavComponent } from '../pages/components/LeftNavComponent';
import { GridComponent } from '../pages/components/GridComponent';
import { ToastComponent } from '../pages/components/ToastComponent';
import { ApiClient } from '../services/api/ApiClient';
import { ClaimsApi } from '../services/api/ClaimsApi';

import { Logger } from '../utils/Logger';
import { EnvironmentManager } from '../managers/EnvironmentManager';
import { ArtifactManager } from '../managers/ArtifactManager';
import { ScreenshotUtil } from '../utils/ScreenshotUtil';
import { VideoUtil } from '../utils/VideoUtil';
import { TraceUtil } from '../utils/TraceUtil';
import { ConsoleCaptureUtil } from '../utils/ConsoleCaptureUtil';
import { FileSystemUtil } from '../utils/FileSystemUtil';

// Define standard custom fixture interface
export interface CustomFixtures {
  loginPage: LoginPage;
  homePage: HomePage;
  dashboardPage: DashboardPage;
  claimsSearchPage: ClaimsSearchPage;
  claimsDetailsPage: ClaimsDetailsPage;
  claimsReservePage: ClaimsReservePage;
  claimsPaymentPage: ClaimsPaymentPage;
  claimsNotesPage: ClaimsNotesPage;
  headerComponent: HeaderComponent;
  leftNavComponent: LeftNavComponent;
  gridComponent: GridComponent;
  toastComponent: ToastComponent;
  apiClient: ApiClient;
  claimsApi: ClaimsApi;
}

// Extend base test
export const test = base.extend<CustomFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  claimsSearchPage: async ({ page }, use) => {
    await use(new ClaimsSearchPage(page));
  },
  claimsDetailsPage: async ({ page }, use) => {
    await use(new ClaimsDetailsPage(page));
  },
  claimsReservePage: async ({ page }, use) => {
    await use(new ClaimsReservePage(page));
  },
  claimsPaymentPage: async ({ page }, use) => {
    await use(new ClaimsPaymentPage(page));
  },
  claimsNotesPage: async ({ page }, use) => {
    await use(new ClaimsNotesPage(page));
  },
  headerComponent: async ({ page }, use) => {
    await use(new HeaderComponent(page));
  },
  leftNavComponent: async ({ page }, use) => {
    await use(new LeftNavComponent(page));
  },
  gridComponent: async ({ page }, use) => {
    await use(new GridComponent(page));
  },
  toastComponent: async ({ page }, use) => {
    await use(new ToastComponent(page));
  },
  apiClient: async ({ request }, use) => {
    await use(new ApiClient(request));
  },
  claimsApi: async ({ request }, use) => {
    await use(new ClaimsApi(request));
  }
});

// Register global hooks
test.beforeEach(async ({ page }, testInfo) => {
  const currentEnv = EnvironmentManager.getEnvName();
  const currentUrl = EnvironmentManager.getBaseUrl();

  Logger.info(`\n======================================================================`);
  Logger.info(`[STARTING TEST] : "${testInfo.title}"`);
  Logger.info(`[ENVIRONMENT]   : ${currentEnv}`);
  Logger.info(`[BASE URL]      : ${currentUrl}`);
  Logger.info(`======================================================================\n`);

  // Inject metadata into annotations for reports
  testInfo.annotations.push({
    type: 'environment',
    description: currentEnv
  });
  testInfo.annotations.push({
    type: 'base_url',
    description: currentUrl
  });

  // Enable console error captures
  ConsoleCaptureUtil.startCapture(page);
});

test.afterEach(async ({ page }, testInfo) => {
  const env = EnvironmentManager.getEnvName();
  const suite = testInfo.titlePath[1] || 'unspecified-suite';
  const browser = testInfo.project.name;
  const status = testInfo.status || 'unknown';

  Logger.info(`\n======================================================================`);
  Logger.info(`[FINISHED TEST] : "${testInfo.title}"`);
  Logger.info(`[STATUS]        : ${status.toUpperCase()}`);
  Logger.info(`======================================================================\n`);

  // Build timestamped directory
  const artifactRoot = ArtifactManager.buildTestArtifactPath(env, suite, browser, testInfo.title);

  // Capture failure screenshots
  if (testInfo.status !== testInfo.expectedStatus) {
    await ScreenshotUtil.capture(page, testInfo, 'failure', artifactRoot);
  }

  // Save video and traces
  await VideoUtil.saveVideo(page, testInfo, artifactRoot);
  await TraceUtil.saveTrace(testInfo, artifactRoot);

  // Save metadata JSON for the reporting dashboard
  const metadata = {
    env,
    suite,
    browser,
    title: testInfo.title,
    status: testInfo.status,
    expectedStatus: testInfo.expectedStatus,
    duration: testInfo.duration,
    timestamp: new Date().toISOString(),
    artifactRoot
  };

  const metadataPath = path.join(artifactRoot, 'logs', 'test-metadata.json');
  FileSystemUtil.writeJson(metadataPath, metadata);

  // Also write metadata to a central location for the script runner dashboard to scan easily
  const centralMetadataDir = path.join(process.cwd(), 'reports', 'metadata-temp');
  fs.mkdirSync(centralMetadataDir, { recursive: true });
  const centralMetadataPath = path.join(
    centralMetadataDir,
    `${env}_${suite}_${browser}_${testInfo.title.replace(/[^a-zA-Z0-9-_]/g, '_')}_${Date.now()}.json`
  );
  FileSystemUtil.writeJson(centralMetadataPath, metadata);
});

export { expect };
export default test;
