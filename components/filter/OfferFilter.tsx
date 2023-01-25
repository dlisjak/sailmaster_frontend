import { useEffect, useState } from 'react';
import FormLabel from 'react-bootstrap/FormLabel';
import FormGroup from 'react-bootstrap/FormGroup';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import DestinationSelect from './DestinationSelect';
import DateRangeSelect from './DateRangeSelect';
import { RANGE_FIELDS_MAX } from '../../utils/search_utils';
import { formatMoneyAmount, formatLength } from '../../utils/formats';
import { RangeField, SelectField } from '../../components/forms/fields';
import { searchUrl } from '../../utils/url_utils';
import { useYachtBrands, useYachtTypes } from '../../queries/queries';

export const BasicSearch = ({ values, onSubmit, ...props }) => {
  const { t } = useTranslation('common');
  const { yachtTypes } = useYachtTypes();
  const [currentValues, setCurrentValues] = useState(values);

  const setValue = (k, v) => {
    setCurrentValues({
      ...currentValues,
      [k]: v,
    });
  };

  return (
    <div className="offer-filter ofer-filter--basic-search">
      <div className="search-box search-box--primary">
        <FormGroup>
          <FormLabel>{t('starting_point')}</FormLabel>
          <DestinationSelect
            setValue={(value) => {
              setValue('destinations', value);
            }}
            value={currentValues?.destinations}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>{t('date_range')}</FormLabel>
          <DateRangeSelect
            value={currentValues?.dateRange}
            onSelect={(value) => setValue('dateRange', value)}
          />
        </FormGroup>
        <SelectField
          fieldName="yacht__yacht_model__category__yachtdisplaycategory"
          label={t('yacht_type')}
          options={yachtTypes}
          values={currentValues}
          setValue={setValue}
          placeholder={t('offer_filter_yacht_type_placeholder')}
        />
      </div>
    </div>
  );
};

export const OfferFilter = ({ values, onSubmit, ...props }) => {
  const { yachtTypes } = useYachtTypes();
  const { t } = useTranslation('common');
  const setValue = (k, v) => {
    const newValues = {
      ...values,
      [k]: v,
    };
    onSubmit(newValues);
  };

  return (
    <div className="offer-filter">
      <div className="search-box search-box--primary">
        <FormGroup>
          <FormLabel>{t('starting_point')}</FormLabel>
          <DestinationSelect
            setValue={(value) => {
              setValue('destinations', value);
            }}
            value={values.destinations}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>{t('date_range')}</FormLabel>
          <DateRangeSelect
            value={values.dateRange}
            onSelect={(value) => setValue('dateRange', value)}
          />
        </FormGroup>
        <SelectField
          fieldName="yacht__yacht_model__category__yachtdisplaycategory"
          label={t('yacht_type')}
          options={yachtTypes}
          values={values}
          setValue={setValue}
          placeholder={t('offer_filter_yacht_type_placeholder')}
        />
      </div>
    </div>
  );
};

export const ExtendedFilter = ({ values, onSubmit }) => {
  const { yachtBrands } = useYachtBrands();
  const { t } = useTranslation('common');
  const setValue = (k, v) => {
    const newValues = {
      ...values,
      [k]: v,
    };
    onSubmit(newValues);
  };
  const EQUIPMENT = [
    { name: t('klima'), nausys_id: '4' },
    { name: t('avtopilot'), nausys_id: '17' },
    { name: t('Premčni propeler'), nausys_id: '2' },
  ];

  return (
    <div className="search-box search-box--extended">
      <RangeField
        fieldName="yacht__cabins_total"
        label={t('yacht_cabins')}
        minValue={0}
        maxValue={RANGE_FIELDS_MAX.yacht__cabins_total}
        values={values}
        setValue={setValue}
      />
      <RangeField
        fieldName="yacht__wc"
        label={t('extended_filter_wc')}
        minValue={0}
        maxValue={RANGE_FIELDS_MAX.yacht__wc}
        values={values}
        setValue={setValue}
      />
      <RangeField
        fieldName="yacht__build_year"
        label={t('build_year')}
        minValue={1980}
        maxValue={RANGE_FIELDS_MAX.yacht__build_year()}
        values={values}
        setValue={setValue}
        displayAndMore={false}
      />
      <RangeField
        fieldName="yacht__yacht_model__loa"
        label={t('extended_filter_loa')}
        minValue={0}
        maxValue={RANGE_FIELDS_MAX.yacht__yacht_model__loa}
        values={values}
        setValue={setValue}
        formatValue={formatLength}
      />
      <RangeField
        fieldName="client_price"
        label={t('price')}
        minValue={1}
        maxValue={RANGE_FIELDS_MAX.client_price}
        values={values}
        setValue={setValue}
        formatValue={formatMoneyAmount}
      />
      <SelectField
        fieldName="yacht__yacht_model__builder"
        label={t('yacht_brand')}
        options={yachtBrands}
        values={values}
        setValue={setValue}
        placeholder={t('offer_filter_yacht_brand_placeholder')}
      />
    </div>
  );
};

const OfferExtendedFilter = ({ values, onSubmit }) => {
  return (
    <>
      <OfferFilter values={values} onSubmit={onSubmit} />
      <ExtendedFilter values={values} onSubmit={onSubmit} />
    </>
  );
};

const ConnectedOfferFilter = ({ filterValues, searchComponent = null }) => {
  const router = useRouter();
  const [values, setValues] = useState(filterValues);
  const SearchComponent = searchComponent || OfferExtendedFilter;

  useEffect(() => {
    setValues(filterValues);
  }, [filterValues]);

  return (
    <div className="offer-filter-container">
      {/* <OfferExtendedFilter
        values={values}
        onSubmit={(values) => {
          setValues(values);
          router.push(searchUrl(values));
        }}
        /> */}
      <SearchComponent
        values={values}
        onSubmit={(values) => {
          setValues(values);
          router.push(searchUrl(values));
        }}
      />
    </div>
  );
};

const WrappedBasicSearch = (props) => {
  return <ConnectedOfferFilter searchComponent={BasicSearch} {...props} />;
};

export const ConnectedBasicSearch = WrappedBasicSearch;
export default ConnectedOfferFilter;
