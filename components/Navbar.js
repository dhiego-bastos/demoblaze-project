import { expect } from '@playwright/test';

class Navbar {
  constructor(page) {
    this.page = page;

    this.homeLink = page.locator('a:has-text("Home")');
    this.contactLink = page.locator('a:has-text("Contact")');
    this.aboutLink = page.locator('a:has-text("About us")');
    this.cartLink = page.locator('#cartur');

    this.signUpLink = page.locator('#signin2');
    this.loginLink = page.locator('#login2');
    this.logoutLink = page.locator('#logout2');
    this.welcomeLabel = page.locator('#nameofuser');
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async openSignUp() {
    await this.signUpLink.click();
  }

  async openLogin() {
    await this.loginLink.click();
  }

  async logout() {
    await this.logoutLink.click();
  }

  async getWelcomeText() {
    return await this.welcomeLabel.innerText();
  }
  
  async isLoginVisible() {
    return await this.loginLink.isVisible();
  }
  
  async isSignUpVisible() {
    return await this.signUpLink.isVisible();
  }
  
  async isLogoutVisible() {
    return await this.logoutLink.isVisible();
  }
  
  async getWelcomeText() {
    return await this.welcomeLabel.innerText();
  }
  
}

export default Navbar;
