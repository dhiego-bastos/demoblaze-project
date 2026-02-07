import { expect } from '@playwright/test';

class PurchaseConfirmationModal {
  constructor(page) {
    this.page = page;

    this.modal = page.locator('.sweet-alert');
    this.successIcon = page.locator('.sa-success');
    this.title = page.locator('.sweet-alert h2');
    this.details = page.locator('.sweet-alert p');
    this.okButton = page.locator('button.confirm');
  }

  async waitUntilVisible() {
    await expect(this.modal).toBeVisible({ timeout: 10000 });
  }

  async validateSuccess(amount, name, card) {
    await expect(this.successIcon).toBeVisible();
    await expect(this.title).toHaveText('Thank you for your purchase!');

    const detailsText = await this.details.innerText();

    expect(detailsText).toContain('Id:');
    expect(detailsText).toContain(`Amount: ${amount} USD`);
    expect(detailsText).toContain(`Card Number: ${card}`);
    expect(detailsText).toContain(`Name: ${name}`);

    // Date validation (MM/DD/YYYY)
    const dateMatch = detailsText.match(/Date:\s(\d{1,2}\/\d{1,2}\/\d{4})/);
    expect(dateMatch).not.toBeNull();
  }

  async clickOk() {
    await this.okButton.click();
  }
}

export default PurchaseConfirmationModal;
