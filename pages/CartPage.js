import { expect } from '@playwright/test';

class CartPage {
  constructor(page) {
    this.page = page;

    this.tableBody = page.locator('#tbodyid');
    this.productRow = page.locator('#tbodyid tr');

    this.productImage = this.productRow.locator('img');
    this.productTitle = this.productRow.locator('td').nth(1);
    this.productPrice = this.productRow.locator('td').nth(2);
    this.productsHeader = page.locator('h2:has-text("Products")');
    this.deleteLink = this.page.locator('#tbodyid a:has-text("Delete")');
    this.tableRows = this.page.locator('#tbodyid tr');

    this.totalPrice = page.locator('#totalp');
    this.placeOrderButton = page.locator('button:has-text("Place Order")');
  }

  async waitUntilLoaded() {
    await expect(this.productsHeader).toBeVisible({ timeout: 10000 });
  }
  
  async getProductTitle() {
    return (await this.productTitle.innerText()).trim();
  }

  async getProductPrice() {
    return (await this.productPrice.innerText()).trim();
  }

  async isImagePresent() {
    return await this.productImage.isVisible();
  }

  async isDeleteLinkPresent() {
    return await this.deleteLink.isVisible();
  }

  async getTotalPrice() {
    return (await this.totalPrice.innerText()).trim();
  }

  async clickPlaceOrder() {
    await this.placeOrderButton.click();
  }

  async clickDelete() {
    await this.deleteLink.first().click();
  }
  
  async waitUntilCartIsEmpty() {
    await expect(this.tableRows).toHaveCount(0, { timeout: 10000 });
  }
  
}

export default CartPage;
