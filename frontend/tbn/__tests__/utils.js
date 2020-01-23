import { formatMoney, calculateTotalPrice } from '../lib/utils';

describe('utils file', () => {
  it('returns proper amount from formatMoney', () => {
    expect(formatMoney(1000)).toEqual(10);
    expect(formatMoney(10)).toEqual(0.1);
    expect(formatMoney(40)).toEqual(0.4);
    expect(formatMoney(4360)).toEqual(43.6);
    expect(formatMoney(1234)).toEqual(12.34);
  });

  it('calculates proper amount from calculateTotalPrice', () => {
    const prices = [{ price: 2 }, { price: 3 }, { price: 4 }, { price: 5 }];
    const prices2 = [{ price: 0 }, { price: 0 }, { price: 0 }, { price: 0 }];
    const prices3 = [{ price: 3 }, { price: 3 }, { price: 3 }, { price: 3 }];
    const prices4 = [{ price: 7.8 }, { price: 3 }, { price: 3 }, { price: 3 }];
    expect(calculateTotalPrice(prices)).toBe(14);
    expect(calculateTotalPrice(prices2)).toBe(0);
    expect(calculateTotalPrice(prices3)).toBe(12);
    expect(calculateTotalPrice(prices4)).toBe(16.8);
  });
});
