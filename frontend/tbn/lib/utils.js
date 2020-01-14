export const calculateTotalPrice = cart =>
  cart.reduce((prev, cur) => prev + cur.price, 0);
