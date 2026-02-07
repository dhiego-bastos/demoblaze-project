import { expect } from '@playwright/test';

class ProductDetailsPage {
    constructor(page) {
      this.page = page;
  
      this.productName = page.locator('h2.name');
      this.productPrice = page.locator('h3.price-container');
      this.taxLabel = page.locator('h3.price-container small');
      this.productDescription = page.locator('#more-information p');
      this.addToCartButton = page.locator('a:has-text("Add to cart")');
    }
  
    async waitUntilLoaded() {
      await expect(this.productName).toBeVisible({ timeout: 10000 });
    }
  
    async getName() {
      return (await this.productName.innerText()).trim();
    }
  
    async getPriceValue() {
      const fullText = await this.productPrice.innerText();
    
      // Extract only the first line (the actual price)
      const priceLine = fullText.split('\n')[0].trim();
    
      return priceLine;
    }
    
    async getNumericPrice() {
      const fullText = await this.productPrice.innerText();
      const match = fullText.match(/\d+/); // extract number only
      return match ? match[0] : null;
    }
    
  
    async getTaxLabelText() {
      return (await this.taxLabel.innerText()).trim();
    }

    async getDescription() {
      return (await this.productDescription.innerText()).trim();
    }    
  
    async addToCartAndAcceptDialog() {
      this.page.once('dialog', async dialog => {
        await dialog.accept();
      });
  
      await this.addToCartButton.click();
    }
  }

  export default ProductDetailsPage;
  