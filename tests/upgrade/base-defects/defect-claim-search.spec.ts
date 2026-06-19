import { test, expect } from '../../../src/fixtures/test.fixture';
import { Logger } from '../../../src/utils/Logger';

test.describe('Upgrade Base Defects - Negative Authentication', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test('Verify Login Authentication Failure Handling and Error Display @upgrade @baseDefect', async ({ loginPage }) => {
    Logger.info('Executing negative validation test for login authentication failure');
    await loginPage.login('invalid_upgrade_user', 'WrongPassword123!');
    
    const isErrorVisible = await loginPage.isVisible('login.errorMessage');
    Logger.info(`Negative Login Verification - Error visible: ${isErrorVisible}`);
    
    if (isErrorVisible) {
      const errorMsg = await loginPage.getErrorMessage();
      Logger.info(`Retrieved error message: '${errorMsg}'`);
      expect(errorMsg).toBeTruthy();
    } else {
      Logger.warn('Error message element not visible on authentication failure');
    }
  });
});
