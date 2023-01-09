import { formatPeriod, formatMoneyAmount } from "./formats";
import { getDiscountedPrice } from "./prices";
import { TOURIST_TAX_PRICE } from 'constants/common';

export const formatOfferPeriod = (offer) => formatPeriod(offer.period_from, offer.period_to)

export const formatOfferPrice = (offer) =>
  formatMoneyAmount(getDiscountedPrice(offer.client_price, offer.discount));


export const optionalServices = services => {
  return services.filter(e => !e.obligatory)
}

export const obligatoryServices = (t, services, deposit, country_code) => {
  const result = services.filter(e => e.obligatory)
  if (deposit) {
    result.push({
      name: t("deposit"),
      price: deposit,
      currency: "EUR",
      obligatory: true,
      description: t("deposit_description"),
    })
  }
  if (country_code in TOURIST_TAX_PRICE) {
    result.push({
      name: t('tourist_tax'),
      price: TOURIST_TAX_PRICE[country_code],
      currency: "EUR",
      obligatory: true,
      price_measure: t("per_person_per_day"),
    })
  }
  return result
}
