import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage.js';
import ProductDetailsPage from '../pages/ProductDetailsPage.js';
import { PRODUCTS } from '../config/constants.js';
import CartPage from '../pages/CartPage.js';

test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
  });

test.describe('Cart Deletion Flow', () => {

  test('Should remove product from cart and validate empty state', async ({ page }) => {

    const home = new HomePage(page);
    const productPage = new ProductDetailsPage(page);
    const cartPage = new CartPage(page);

    await home.goto();

    await home.clickProductByName(PRODUCTS.SAMSUNG_GALAXY_S6);

    await productPage.waitUntilLoaded();

    await productPage.addToCartAndAcceptDialog();

    await home.navbar.goToCart();
    await cartPage.waitUntilLoaded();

    const cartTitle = await cartPage.getProductTitle();
    expect(cartTitle).toBe(PRODUCTS.SAMSUNG_GALAXY_S6);

    await cartPage.clickDelete();

    await cartPage.waitUntilCartIsEmpty();

    await expect(page.locator('#tbodyid tr')).toHaveCount(0);

  });

});
