import { test, expect } from '../../../src/fixtures/test.fixture';
import { Logger } from '../../../src/utils/Logger';

test.describe('Regression - Incidents API Channel', () => {
  test('Verify API Utility integration for incident logs @regression @incident', async ({ apiClient }) => {
    Logger.info('Validating ApiClient communication channel for incident logging');
    const response = await apiClient.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.ok()).toBeTruthy();
  });
});
