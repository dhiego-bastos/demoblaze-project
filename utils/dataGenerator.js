export function generateFutureDate() {
    const now = new Date();
    const futureYear = now.getFullYear() + 3;
  
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const year = String(futureYear);
  
    return { month, year };
  }
  
  export function generateOrderData() {
    const { month, year } = generateFutureDate();
  
    return {
      name: `User_${Date.now()}`,
      country: 'USA',
      city: 'New York',
      card: String(Math.floor(Math.random() * 1e12)),
      month,
      year
    };
  }
  
  export function generateAuthData() {
    const username = `user-${Math.floor(Math.random() * 1e10)}-user`;
    const password = String(Math.floor(Math.random() * 90) + 10); // 2-digit
  
    return { username, password };
  }
  