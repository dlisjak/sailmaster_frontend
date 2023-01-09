import React, { useState } from "react";
import FormLabel from "react-bootstrap/FormLabel";
import FormGroup from "react-bootstrap/FormGroup";
import { useTranslation } from 'next-i18next';
import { useRouter } from "next/router";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import DestinationSelect from "./DestinationSelect";
import DateRangeSelect from "./DateRangeSelect";
import { RANGE_FIELDS_MAX } from "utils/search_utils";
import { formatMoneyAmount, formatLength } from "utils/formats";
import { RangeField, SelectField } from "components/forms/fields";
import { getValuesFromUrl } from "utils/search_utils";
import { searchUrl } from "utils/url_utils";
import { searchDestinations } from "api/search";

export const BasicSearch = ({
  searchDestinations,
  yachtType,
  values,
  onSubmit,
  ...props
}) => {
  const { t } = useTranslation();
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
          <FormLabel>{t("starting_point")}</FormLabel>
          <DestinationSelect
            setValue={(value) => {
              setValue("destinations", value);
            }}
            searchDestinations={searchDestinations}
            value={currentValues.destinations}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>{t("date_range")}</FormLabel>
          <DateRangeSelect
            value={currentValues.dateRange}
            onSelect={(value) => setValue("dateRange", value)}
          />
        </FormGroup>
        <SelectField
          fieldName="yacht__yacht_model__category__yachtdisplaycategory"
          label={t("yacht_type")}
          options={yachtType}
          values={currentValues}
          setValue={setValue}
          placeholder={t("offer_filter_yacht_type_placeholder")}
        />
        <Button
          onClick={() => onSubmit(currentValues)}
          variant="secondary"
          size="xl"
          className="btn--search"
        >
          {t("search")}
        </Button>
      </div>
    </div>
  );
};

export const OfferFilter = ({
  searchDestinations,
  yachtType,
  values,
  onSubmit,
  ...props
}) => {
  const { t } = useTranslation();
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
          <FormLabel>{t("starting_point")}</FormLabel>
          <DestinationSelect
            setValue={(value) => {
              setValue("destinations", value);
            }}
            searchDestinations={searchDestinations}
            value={values.destinations}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>{t("date_range")}</FormLabel>
          <DateRangeSelect
            value={values.dateRange}
            onSelect={(value) => setValue("dateRange", value)}
          />
        </FormGroup>
        <SelectField
          fieldName="yacht__yacht_model__category__yachtdisplaycategory"
          label={t("yacht_type")}
          options={yachtType}
          values={values}
          setValue={setValue}
          placeholder={t("offer_filter_yacht_type_placeholder")}
        />
      </div>
    </div>
  );
};

export const ExtendedFilter = ({ values, brands, onSubmit }) => {
  const { t } = useTranslation();
  const setValue = (k, v) => {
    const newValues = {
      ...values,
      [k]: v,
    };
    onSubmit(newValues);
  };
  const EQUIPMENT = [
    { name: t("klima"), nausys_id: "4" },
    { name: t("avtopilot"), nausys_id: "17" },
    { name: t("Premčni propeler"), nausys_id: "2" },
  ];
  return (
    <div className="search-box search-box--extended">
      <RangeField
        fieldName="yacht__cabins_total"
        label={t("yacht_cabins")}
        minValue={0}
        maxValue={RANGE_FIELDS_MAX.yacht__cabins_total}
        values={values}
        setValue={setValue}
      />
      <RangeField
        fieldName="yacht__wc"
        label={t("extended_filter_wc")}
        minValue={0}
        maxValue={RANGE_FIELDS_MAX.yacht__wc}
        values={values}
        setValue={setValue}
      />
      <RangeField
        fieldName="yacht__build_year"
        label={t("build_year")}
        minValue={1980}
        maxValue={RANGE_FIELDS_MAX.yacht__build_year()}
        values={values}
        setValue={setValue}
        displayAndMore={false}
      />
      <RangeField
        fieldName="yacht__yacht_model__loa"
        label={t("extended_filter_loa")}
        minValue={0}
        maxValue={RANGE_FIELDS_MAX.yacht__yacht_model__loa}
        values={values}
        setValue={setValue}
        formatValue={formatLength}
      />
      <RangeField
        fieldName="client_price"
        label={t("price")}
        minValue={1}
        maxValue={RANGE_FIELDS_MAX.client_price}
        values={values}
        setValue={setValue}
        formatValue={formatMoneyAmount}
      />
      <SelectField
        fieldName="yacht__yacht_model__builder"
        label={t("yacht_brand")}
        options={brands}
        values={values}
        setValue={setValue}
        placeholder={t("offer_filter_yacht_brand_placeholder")}
      />
      <div className="extended-filter__equipment">
        {false &&
          EQUIPMENT.map((equipment) => (
            <Form.Check
              key={equipment.nausys_id}
              id={`equipment_${equipment.nausys_id}`}
              custom
              type="checkbox"
              name="equipment"
              value={equipment.nausys_id}
              label={equipment.name}
              checked={values.equipment.has(equipment.nausys_id)}
              onChange={(event) => {
                const newSet = new Set(values.equipment);
                if (event.target.checked) {
                  newSet.add(equipment.nausys_id);
                } else {
                  newSet.delete(equipment.nausys_id);
                }
                setValue("equipment", newSet);
              }}
            />
          ))}
      </div>
    </div>
  );
};

const OfferExtendedFilter = ({
  values,
  yachtType,
  brands,
  searchDestinations,
  onSubmit,
}) => {
  return (
    <>
      <OfferFilter
        values={values}
        onSubmit={onSubmit}
        searchDestinations={searchDestinations}
        yachtType={yachtType}
      />

      <ExtendedFilter brands={brands} values={values} onSubmit={onSubmit} />
    </>
  );
};

const ConnectedOfferFilter = ({ yachtType, brands, searchComponent }) => {
  const router = useRouter();
  let location = useLocation();
  const SearchComponent = searchComponent || OfferExtendedFilter;
  const values = getValuesFromUrl(location.search);
  return (
    <div className="offer-filter-container">
      <SearchComponent
        values={values}
        onSubmit={(values) => {
          router.push(searchUrl(values));
        }}
        searchDestinations={searchDestinations}
        yachtType={yachtType}
        brands={brands}
      />
    </div>
  );
};

const WrappedBasicSearch = (props) => {
  return <ConnectedOfferFilter searchComponent={BasicSearch} {...props} />;
};

// function mapStateToProps(state) {
//   return {
//     yachtType: state.yachtType,
//     brands: state.brands,
//   };
// }

export const ConnectedBasicSearch = WrappedBasicSearch;
export default ConnectedOfferFilter;
