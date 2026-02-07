import Navbar from '../components/Navbar.js';

class BasePage {
  constructor(page) {
    this.page = page;
    this.navbar = new Navbar(page);
  }

  async navigateTo(url) {
    await this.page.goto(url);
  }
}

export default BasePage;
