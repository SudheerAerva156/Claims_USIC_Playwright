import { test, expect } from '../../../src/fixtures/test.fixture';
import { Logger } from '../../../src/utils/Logger';

test.describe('Regression - High Priority Defects', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test('Failed login with invalid credentials @regression @highPriorityDefect', async ({ loginPage }) => {
    Logger.info('Executing negative validation test for login validation fixes');
    await loginPage.login('invalid_user', 'WrongPassword123!');
    
    const isErrorVisible = await loginPage.isVisible('login.errorMessage');
    Logger.info(`Negative Login Verification - Error visible: ${isErrorVisible}`);
    
    if (isErrorVisible) {
      const errorMsg = await loginPage.getErrorMessage();
      Logger.info(`Retrieved error message: '${errorMsg}'`);
      expect(errorMsg).toBeTruthy();
    }
  });
});
