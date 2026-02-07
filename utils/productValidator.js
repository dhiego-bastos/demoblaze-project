import { expect } from '@playwright/test';

export function validateProduct(product) {
    expect(product).toHaveProperty('prodName');
    expect(product).toHaveProperty('prodLink');
    expect(product).toHaveProperty('prodPrice');
  
    expect(product.prodName.length).toBeGreaterThan(0);
    expect(product.prodPrice).toContain('$');
  }
  
  export function validateProducts(products) {
    expect(products.length).toBeGreaterThan(0);
    products.forEach(validateProduct);
  }
