import { expect } from '@playwright/test';

class SignUpModal {
  constructor(page) {
    this.page = page;

    this.modal = page.locator('#signInModal');
    this.header = this.modal.locator('#signInModalLabel');

    this.usernameInput = this.modal.locator('#sign-username');
    this.passwordInput = this.modal.locator('#sign-password');

    this.closeButton = this.modal.locator('button:has-text("Close")');
    this.signUpButton = this.modal.locator('button:has-text("Sign up")');
  }

  async waitUntilSignUpModalVisible() {
    await expect(this.header).toHaveText('Sign up', { timeout: 10000 });
  }

  async validateStructure() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.signUpButton).toBeVisible();
  }

  async fillForm(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.signUpButton.click();
  }
}

export default SignUpModal;
