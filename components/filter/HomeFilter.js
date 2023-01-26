import { useEffect, useState } from "react";
import { useTranslation } from 'next-i18next';
import Link from "next/link";

import Col from "react-bootstrap/Col";

import DestinationSelect from "./DestinationSelect";
import DateRangeSelect from "./DateRangeSelect";
import { SelectField } from "../forms/fields"
import { OFFERS_URL } from "../../constants/urls";
import { valuesToSearch } from "../../utils/search_utils";
import { useYachtTypes } from "../../queries/queries";

const HomeFilter = () => {
  const [values, setValues] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation('common');
  const { yachtTypes } = useYachtTypes();

  const setValue = (k, v) => {
    const newValues = {
      ...values,
      [k]: v,
    };
    setValues(newValues);
  };

  useEffect(() => {
    setSearchQuery(valuesToSearch(values));
  }, [values]);

  return (
    <div className="home-filter">
      <div className="row">
        <div className="form-group w-full xl:w-2/5 lg:w-1/3 md:w-1/4 pr-4 pl-4 md:pr-1 md:pl-1">
          <label className="form-label">{t("starting_point")}</label>
          <DestinationSelect
            setValue={(value) => {
              setValue("destinations", value);
            }}
            value={values.destinations}
          />
        </div>
        <div className="form-group w-full xl:w-1/4 lg:w-1/3 md:w-2/5 pr-4 pl-4 md:pr-1 md:pl-1">
          <label className="form-label">{t("date_range")}</label>
          <DateRangeSelect
            value={values.dateRange}
            onSelect={(value) => setValue("dateRange", value)}
          />
        </div>
        <SelectField
          className="w-full md:w-1/6 pr-4 pl-4 md:pr-1 md:pl-1"
          fieldName="yacht__yacht_model__category__yachtdisplaycategory"
          label={t("yacht_type")}
          options={yachtTypes}
          values={values}
          setValue={setValue}
          placeholder={t("offer_filter_yacht_type_placeholder")}
        />
        <div className="w-full md:w-1/6 pr-4 pl-4 md:pr-1 md:pl-1">
          <Link className="btn--home-filter btn btn-secondary btn-lg" href={`${OFFERS_URL}?${searchQuery}`}>
            {t("search")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeFilter;
