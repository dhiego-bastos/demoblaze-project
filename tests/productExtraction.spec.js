import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage';
import { validateProducts } from '../utils/productValidator.js';
import { writeProductsToFile } from '../utils/fileWriter.js';

test.beforeEach(async ({ page }) => {
  await page.context().clearCookies();
});

test.describe('Product Extraction - Home Page', () => {

  test('Should load home page and extract products correctly', async ({ page }) => {
    const home = new HomePage(page);

    await home.goto();
    const products = await home.getFirstTwoPagesProducts();

    validateProducts(products);
    writeProductsToFile(products);

  });

});
