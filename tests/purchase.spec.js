import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage.js';
import ProductDetailsPage from '../pages/ProductDetailsPage.js';
import { PRODUCTS } from '../config/constants.js';
import CartPage from '../pages/CartPage.js';
import OrderModal from '../components/OrderModal.js';
import PurchaseConfirmationModal from '../components/PurchaseConfirmationModal.js';
import { generateOrderData } from '../utils/dataGenerator.js';

test.beforeEach(async ({ page }) => {
  await page.context().clearCookies();
});

test.describe('Purchase Flow', () => {

  test('Should follow a simple purchase flow of a single object', async ({ page }) => {

    const home = new HomePage(page);
    const productPage = new ProductDetailsPage(page);
    const cartPage = new CartPage(page);
    const orderData = generateOrderData();

    await home.goto();

    await home.clickProductByName(PRODUCTS.SAMSUNG_GALAXY_S6);
    await productPage.waitUntilLoaded();

    const name = await productPage.getName();
    const numericPrice = await productPage.getNumericPrice();
    const taxLabel = await productPage.getTaxLabelText();
    const description = await productPage.getDescription();

    expect(name).toBeTruthy();
    expect(numericPrice).toBeTruthy();
    expect(taxLabel).toContain('includes tax');
    expect(description.length).toBeGreaterThan(0);

    await productPage.addToCartAndAcceptDialog();

    await home.navbar.goToCart();
    await cartPage.waitUntilLoaded();

    const cartTitle = await cartPage.getProductTitle();
    const cartPrice = await cartPage.getProductPrice();
    const cartTotal = await cartPage.getTotalPrice();

    expect(await cartPage.isImagePresent()).toBeTruthy();
    expect(await cartPage.isDeleteLinkPresent()).toBeTruthy();

    expect(cartTitle).toBe(name);
    expect(cartPrice).toBe(numericPrice);
    expect(cartTotal).toBe(numericPrice);

    await cartPage.clickPlaceOrder();

    const orderModal = new OrderModal(page);
    const confirmationModal = new PurchaseConfirmationModal(page);

    await orderModal.waitUntilModalVisible();
    await orderModal.validateStaticElements(cartTotal);
    await orderModal.fillForm(orderData);
    await orderModal.clickPurchase();

    await confirmationModal.waitUntilVisible();
    await confirmationModal.validateSuccess(
      cartTotal,
      orderData.name,
      orderData.card
    );

    await page.waitForTimeout(500); 
    await confirmationModal.clickOk();
    
    await expect(page).toHaveURL(/index\.html/);

    await home.navbar.goToCart();
    await cartPage.waitUntilLoaded();

    await expect(page.locator('#tbodyid tr')).toHaveCount(0);

  });
});
