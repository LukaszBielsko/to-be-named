export const calculateTotalPrice = cart =>
  cart.reduce((prev, cur) => prev + cur.price, 0);

export const formatMoney = amountInCents => amountInCents / 100;
