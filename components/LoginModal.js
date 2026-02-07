import { expect } from '@playwright/test';

class LoginModal {
  constructor(page) {
    this.page = page;

    this.modal = page.locator('#logInModal');
    this.header = this.modal.locator('#logInModalLabel');

    this.usernameInput = this.modal.locator('#loginusername');
    this.passwordInput = this.modal.locator('#loginpassword');

    this.loginButton = this.modal.locator('button:has-text("Log in")');
  }

  async waitUntilLoginModalVisible() {
    await expect(this.header).toHaveText('Log in', { timeout: 10000 });
  }

  async validateStructure() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async fillForm(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.loginButton.click();
  }
}

export default LoginModal;
