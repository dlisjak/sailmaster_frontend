import { getDiscount as getDiscountBase } from "components/common/utils/getPrices";

export function getDiscountedPrice(amount, discount) {
  return (parseFloat(amount) * (100 - parseFloat(discount || 0))) / 100;
}

export function getDiscount(priceListPrice, clientPrice, discount) {
  return getDiscountBase(
    parseFloat(priceListPrice),
    parseFloat(clientPrice),
    discount
  );
}

export const pricePerPerson = (price, num_persons = 0) =>
  price / (num_persons || 1);
