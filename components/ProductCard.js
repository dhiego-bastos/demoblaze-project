class ProductCard {
    constructor(cardLocator) {
      this.card = cardLocator;
    }
  
    async getData() {
      const prodName = await this.card.locator('h4.card-title').innerText();
      const prodLink = await this.card.locator('h4.card-title a').getAttribute('href');
      const prodPrice = await this.card.locator('h5').innerText();
  
      return {
        prodName: prodName.trim(),
        prodLink,
        prodPrice: prodPrice.trim()
      };
    }
  }
  
  module.exports = ProductCard;
  