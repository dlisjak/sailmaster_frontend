import { useTranslation } from 'next-i18next';
import classnames from 'classnames';

import { formatMoneyAmount } from '../utils/formats';
import { formatOfferPeriod } from '../utils/offerUtils';
import { getDiscountedPrice, getDiscount, pricePerPerson } from '../utils/prices';

const Discount = ({ discount }) => <span className="discount">-{Math.round(discount)}</span>;

const PriceBlock = ({ offer, className = '', displayTotalPrice = true }) => {
  const { t } = useTranslation('common');
  const numGuests = !displayTotalPrice && offer.yacht.berths_total > 0 && offer.yacht.berths_total;
  const price = getDiscountedPrice(offer.client_price, offer.discount);

  const discount = getDiscount(offer.price_list_price, offer.client_price, offer.discount);

  return (
    <div className={classnames('price-block', className)}>
      {formatOfferPeriod(offer)}
      {discount && <Discount discount={discount} />}
      {discount && (
        <div className="list-price">
          {formatMoneyAmount(pricePerPerson(offer.price_list_price, numGuests))}
        </div>
      )}
      <span className="price">
        {formatMoneyAmount(pricePerPerson(price, numGuests))}
        {numGuests && t('per_guest')}
      </span>
    </div>
  );
};

export default PriceBlock;
