import { test as setup, expect } from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import { credentials } from '../data/testData';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  let loginPage = new LoginPage(page);
  await page.goto('/');
  await loginPage.login(credentials.validUser.username, credentials.validUser.password);
  await page.waitForURL('/inventory.html');

  await page.context().storageState({ path: authFile });

})
