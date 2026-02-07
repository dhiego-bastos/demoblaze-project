import { expect } from '@playwright/test';
import BasePage from './BasePage.js';
import ProductList from '../components/ProductList.js';
import ENV from '../config/env.js';
import { 
  waitForCategoryRequest,
  waitForPaginationRequest 
} from '../utils/networkHelper.js';



class HomePage extends BasePage {
  constructor(page) {
    super(page);

    this.url = ENV.baseURL;
    this.categoriesMenu = page.locator('#cat');
    this.nextButton = page.locator('#next2');
    this.previousButton = page.locator('#prev2');
    this.productList = new ProductList(page);

    this.categories = {
        phones: {
          locator: page.locator('a:has-text("Phones")'),
          apiValue: 'phone'
        },
        laptops: {
          locator: page.locator('a:has-text("Laptops")'),
          apiValue: 'notebook'
        },
        monitors: {
          locator: page.locator('a:has-text("Monitors")'),
          apiValue: 'monitor'
        }
    };
  }

  async goto() {
    await this.navigateTo(this.url);
    await this.waitUntilHomeisLoaded();
  }

  async waitUntilHomeisLoaded() {
    await expect(this.categoriesMenu).toBeVisible({timeout: 30000});
  }

  async waitForProductsToLoad() {
    await this.productCards.first().waitFor({
      state: 'visible',
      timeout: 15000
    });
  }

  async selectCategory(categoryName) {
    const category = this.categories[categoryName];
  
    const responsePromise = waitForCategoryRequest(this.page);
  
    await category.locator.click();
    await responsePromise;
    await this.productList.waitForProductsToLoad();
  }

  async getAllProductsFromAllCategories() {
    const productMap = new Map();
  
    for (const category in this.categories) {
      await this.selectCategory(category);
  
      const products = await this.productList.getAllProducts();
  
      products.forEach(product => {
        productMap.set(product.prodLink, product);
      });
    }
  
    return Array.from(productMap.values());
  }
  
  async getFirstTwoPagesProducts() {
    const allProducts = [];
  
    const firstPageProducts = await this.productList.getAllProducts();
    allProducts.push(...firstPageProducts);
  
    const paginationPromise = waitForPaginationRequest(this.page);
    await this.nextButton.click();
    await paginationPromise;

    const secondPageProducts = await this.productList.getAllProducts();
    allProducts.push(...secondPageProducts);
    
  
    return allProducts;
  }

  async clickProductByName(productName) {
    const productLink = this.page.locator(
      'div.card.h-100 a.hrefch',
      { hasText: productName }
    );
  
    await expect(productLink).toBeVisible({ timeout: 10000 });
  
    await productLink.first().click();
  }
  
  
  
}

module.exports = HomePage;
