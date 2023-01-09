export function getPrice(priceListPrice, clientPrice, discount) {
  if (!discount || parseFloat(discount) <= 0.2) {
    return clientPrice;
  }

  const tmpDiscount = discount ? parseFloat(discount) : 0;
  const discountedPrice = clientPrice - (clientPrice * tmpDiscount) / 100;

  return discountedPrice;
}

export function toInt(val) {
  return Math.round(val);
}

export function roundDecimal(val) {
  return Math.round(val * 10) / 10;
}

export function getDiscount(priceListPrice, clientPrice, discount) {
  if (
    (!discount || parseFloat(discount) <= 0.1) &&
    priceListPrice === clientPrice
  ) {
    return 0;
  } else if (
    (!discount || parseFloat(discount) <= 0.1) &&
    priceListPrice !== clientPrice
  ) {
    return roundDecimal(100 - (clientPrice * 100.0) / priceListPrice);
  }

  const tmpDiscount = discount ? parseFloat(discount) : 0;
  const discountedPrice = clientPrice - (clientPrice * tmpDiscount) / 100;
  const finalDiscount = roundDecimal(
    100 - (discountedPrice * 100.0) / priceListPrice
  );

  return finalDiscount;
}
