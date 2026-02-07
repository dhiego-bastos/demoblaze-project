import ProductCard from './ProductCard.js';


class ProductList {
  constructor(containerLocator) {
    this.cards = containerLocator.locator('div.card.h-100');
  }

  async waitForProductsToLoad() {
    await this.cards.first().waitFor({
      state: 'visible',
      timeout: 15000
    });
  }

  async getAllProducts() {
    await this.waitForProductsToLoad();

    const products = [];
    const count = await this.cards.count();

    for (let i = 0; i < count; i++) {
      const card = new ProductCard(this.cards.nth(i));
      const data = await card.getData();
      products.push(data);
    }

    return products;
  }
}

module.exports = ProductList;
