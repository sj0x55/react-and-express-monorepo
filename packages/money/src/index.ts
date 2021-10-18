export const normalizePriceNumber = (price: string, regExp: RegExp) => {
  const matched = price.match(regExp);

  if (matched) {
    return `${matched[1].replace(/[,.]/gi, '')}.${matched[2]}`;
  }
};

export const priceToNumber = (price: string | number): number => {
  if (typeof price === 'string') {
    price = `${price}`
      .trim()
      .replace(' ', '')
      .replace(/[^0-9.,]+/, '');
    price = normalizePriceNumber(price, /(\d+(?:,\d+)+)(?:\.(\d+))?/) || price;
    price = price || normalizePriceNumber(price, /(\d+(?:\.\d+)+)(?:,(\d+))?/) || '';

    return parseFloat(price || '0');
  } else {
    return price
  }
};

export const calcPriceChangePercentages = (prevPrice: number, newPrice: number): number => {
  return (1 - newPrice / prevPrice) * 100;
};
