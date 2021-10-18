export const appendCurrency = (price: number | null): string => {
  return price ? `£ ${price.toFixed(2)}` : '-';
};

export const decoratePriceDrop = (isPriceDropped: boolean, prevPrice: number | null, price: number | null): string => {
  if (price) {
    return `${prevPrice && isPriceDropped ? `${appendCurrency(prevPrice)} > ` : ''}${appendCurrency(price)}`;
  } else {
    return '-';
  }
};

export const calcPriceChangePercentages = (prevPrice: number | null, newPrice: number, decimals = 2): number => {
  if (prevPrice) {
    const d = Math.pow(10, decimals);

    return Math.floor((1 - newPrice / prevPrice) * 100 * d) / d;
  } else {
    return 0;
  }
};
