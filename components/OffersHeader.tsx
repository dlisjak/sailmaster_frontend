import { useTranslation } from 'next-i18next';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

const OffersHeader = ({ filterValues, onSetOrdering, displayTotalPrice, setDisplayTotalPrice }) => {
  const { t } = useTranslation('common');

  const ORDERING = {
    '': t('ordering_recommended'),
    price: t('ordering_price'),
    '-price': t('ordering_price_desc'),
    discount: t('ordering_discount'),
    '-discount': t('ordering_discount_desc'),
    year: t('ordering_build_year'),
    '-year': t('ordering_build_year_desc'),
  };

  return (
    <div className="offer-navigation">
      <div className="offer-navigation__div">
        <Form.Control
          className="custom-select"
          as="select"
          onChange={(e) => onSetOrdering(e.target.value)}
          value={filterValues.o}
        >
          {Object.keys(ORDERING).map((key) => (
            <option value={key} key={key}>
              {ORDERING[key]}
            </option>
          ))}
        </Form.Control>
      </div>
      <div className="offer-navigation__div offer-buttons hidden-sm hidden-xs">
        <ButtonGroup>
          <Button
            className={displayTotalPrice ? 'active' : ''}
            onClick={() => setDisplayTotalPrice(true)}
          >
            {t('total_price')}
          </Button>
          <Button
            className={!displayTotalPrice ? 'active' : ''}
            onClick={() => setDisplayTotalPrice(false)}
          >
            {t('per_guest_button')}
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default OffersHeader;
