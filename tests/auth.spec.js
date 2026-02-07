import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage.js';
import SignUpModal from '../components/SignUpModal.js';
import LoginModal from '../components/LoginModal.js';
import { generateAuthData } from '../utils/dataGenerator.js';

test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
  });
  
test.describe('Authentication Flow', () => {

  test('Should sign up, login and logout successfully', async ({ page }) => {

    const home = new HomePage(page);
    const signUpModal = new SignUpModal(page);
    const loginModal = new LoginModal(page);

    const { username, password } = generateAuthData();

    await home.goto();

    // Sign up flow

    await home.navbar.openSignUp();
    await signUpModal.waitUntilSignUpModalVisible();
    await signUpModal.validateStructure();

    await signUpModal.fillForm(username, password);

    const signUpDialogPromise = page.waitForEvent('dialog');
    await signUpModal.submit();

    const signUpDialog = await signUpDialogPromise;
    expect(signUpDialog.message()).toContain('Sign up successful');
    await signUpDialog.accept();

    // Log in flow

    await home.navbar.openLogin();
    await loginModal.waitUntilLoginModalVisible();
    await loginModal.validateStructure();

    await loginModal.fillForm(username, password);
    await loginModal.submit();

    await expect(home.navbar.welcomeLabel)
    .toHaveText(new RegExp(`Welcome\\s+${username}`, 'i'));



    expect(await home.navbar.isLogoutVisible()).toBeTruthy();
    expect(await home.navbar.isLoginVisible()).toBeFalsy();
    expect(await home.navbar.isSignUpVisible()).toBeFalsy();

    // Log out flow
    await home.navbar.logout();

    expect(await home.navbar.isLoginVisible()).toBeTruthy();
    expect(await home.navbar.isSignUpVisible()).toBeTruthy();
    expect(await home.navbar.isLogoutVisible()).toBeFalsy();

  });

});
