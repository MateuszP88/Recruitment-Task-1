import { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  firstNameField: Locator;
  lastNameField: Locator;
  postalCodeField: Locator;
  continueButton: Locator;
  finishButton: Locator;
  firstStepPageTitle: Locator;
  secondStepPageTitle: Locator;
  checkoutFirstStepUrl: string;
  checkoutSecondStepUrl: string;
  checkoutCompleteUrl: string;
  completeHeader: Locator;


  constructor(page: Page) {
    this.page = page;
    this.firstNameField = page.getByPlaceholder('First Name');
    this.lastNameField = page.getByPlaceholder('Last Name');
    this.postalCodeField = page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = page.getByRole('button', {name: 'Continue'});
    this.finishButton = page.getByRole('button', {name: 'Finish'});
    this.firstStepPageTitle = page.getByText('Checkout: Your Information');
    this.secondStepPageTitle = page.getByText('Checkout: Overview');
    this.checkoutFirstStepUrl = '/checkout-step-one.html';
    this.checkoutSecondStepUrl = '/checkout-step-two.html';
    this.checkoutCompleteUrl = '/checkout-complete.html'
    this.completeHeader = page.locator('.complete-header');
  }

  async fillCheckoutInfoAndContinue(firstName: string, lastName: string, zip: string) {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.postalCodeField.fill(zip);
    await this.continueButton.click();
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async getConfirmationMessage() {
    return this.completeHeader;
  }
}