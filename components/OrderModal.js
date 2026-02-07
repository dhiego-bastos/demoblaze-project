import { expect } from '@playwright/test';

class OrderModal {
    constructor(page) {
      this.page = page;
  
      this.modal = page.locator('#orderModal');
  
      this.header = this.modal.locator('#orderModalLabel');
      this.totalLabel = this.modal.locator('#totalm');
  
      this.nameInput = this.modal.locator('#name');
      this.countryInput = this.modal.locator('#country');
      this.cityInput = this.modal.locator('#city');
      this.cardInput = this.modal.locator('#card');
      this.monthInput = this.modal.locator('#month');
      this.yearInput = this.modal.locator('#year');
  
      this.closeButton = this.modal.locator('button:has-text("Close")');
      this.purchaseButton = this.modal.locator('button:has-text("Purchase")');
    }  

  async waitUntilModalVisible() {
    await expect(this.header).toBeVisible({ timeout: 10000 });
  }
    

  async validateStaticElements(expectedTotal) {
    await expect(this.header).toHaveText('Place order');
    await expect(this.totalLabel).toContainText(expectedTotal);

    await expect(this.nameInput).toBeVisible();
    await expect(this.countryInput).toBeVisible();
    await expect(this.cityInput).toBeVisible();
    await expect(this.cardInput).toBeVisible();
    await expect(this.monthInput).toBeVisible();
    await expect(this.yearInput).toBeVisible();

    await expect(this.closeButton).toBeVisible();
    await expect(this.purchaseButton).toBeVisible();
  }

  async fillForm(data) {
    await this.nameInput.fill(data.name);
    await this.countryInput.fill(data.country);
    await this.cityInput.fill(data.city);
    await this.cardInput.fill(data.card);
    await this.monthInput.fill(data.month);
    await this.yearInput.fill(data.year);
  }

  async clickPurchase() {
    await this.purchaseButton.click();
  }
}

export default OrderModal;
