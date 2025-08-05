import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  usernameInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;
  errorMessage: Locator;
  wrongPasswordMessage: string;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByText('Login');
    this.errorMessage = page.locator('[data-test="error"]');
    this.wrongPasswordMessage = 'Epic sadface: Username and password do not match any user in this service';
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

}