import { test, expect } from '@playwright/test';
import { LoginPage} from '../pages/LoginPage';
import { credentials } from '../data/testData';
import { InventoryPage } from '../pages/InventoryPage';

let loginPage;
let inventoryPage;

test.describe('Login testing', () => {
    test.use({ storageState: { cookies: [], origins: [] } });

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page)
        await page.goto('/');
    })

    test('Valid login should navigate to inventory page', async ({ page }) => {

        await loginPage.login(credentials.validUser.username, credentials.validUser.password);
        await expect(page).toHaveURL(inventoryPage.inventoryUrl);
    });

    test('Login with invalid password should ', async ({ page }) => {
        await loginPage.login(credentials.invalidUser.username, credentials.invalidUser.password);
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText(loginPage.wrongPasswordMessage);
        await expect(page).toHaveURL('/');
    });
});

