import { useState } from "react";
import { useTranslation } from 'next-i18next';

import FormLabel from "react-bootstrap/FormLabel";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import DestinationSelect from "./DestinationSelect";
import DateRangeSelect from "./DateRangeSelect";
import { SelectField } from "../forms/fields"

const HomeFilter = ({ searchDestinations, onSubmit, yachtTypes }) => {
  const [values, setValues] = useState({});
  const { t } = useTranslation('common');

  const setValue = (k, v) => {
    const newValues = {
      ...values,
      [k]: v,
    };
    setValues(newValues);
  };

  return (
    <form
      className="home-filter"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(values);
      }}
    >
      <div className="row">
        <div className="form-group w-full xl:w-2/5 lg:w-1/3 md:w-1/4 pr-4 pl-4 md:pr-1 md:pl-1">
          <FormLabel>{t("starting_point")}</FormLabel>
          <DestinationSelect
            setValue={(value) => {
              setValue("destinations", value);
            }}
            searchDestinations={searchDestinations}
            value={values.destinations}
          />
        </div>
        <div className="form-group w-full xl:w-1/4 lg:w-1/3 md:w-2/5 pr-4 pl-4 md:pr-1 md:pl-1">
          <FormLabel>{t("date_range")}</FormLabel>
          <DateRangeSelect
            value={values.dateRange}
            onSelect={(value) => setValue("dateRange", value)}
          />
        </div>
        <SelectField
          formGroupProps={{
            as: Col,
            md: 2,
          }}
          fieldName="yacht__yacht_model__category__yachtdisplaycategory"
          label={t("yacht_type")}
          options={yachtTypes}
          values={values}
          setValue={setValue}
          placeholder={t("offer_filter_yacht_type_placeholder")}
        />
        <div className="w-full md:w-1/6 pr-4 pl-4 md:pr-1 md:pl-1">
          <Button className="btn--home-filter" size="lg" variant="secondary" type="submit">
            {t("search")}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default HomeFilter;
