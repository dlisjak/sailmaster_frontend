import { useTranslation } from 'next-i18next';
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

import DestinationSelect from "./DestinationSelect";
import { SelectField } from "../forms/fields"
import { OFFERS_URL } from "../../constants/urls";
import { valuesToSearch } from "../../utils/search_utils";
import { useYachtTypes } from "../../queries/queries";

const DateRangeSelect = dynamic(() => import("./DateRangeSelect"))

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
    <div className="home-filter mb-2 lg:mb-8">
      <div className="row flex justify-evenly lg:bg-[#ceb896] pt-2 px-2 pb-0 rounded-md">
        <div className="form-group w-full xl:w-2/5 lg:w-1/3 md:w-1/4 pr-[15px] pl-[15px] md:pr-1 md:pl-1">
          <label htmlFor="destination" className="form-label">{t("starting_point")}</label>
          <DestinationSelect
            setValue={(value) => {
              setValue("destinations", value);
            }}
            value={values.destinations}
          />
        </div>
        <div className="relative min-h-[76px] form-group w-full xl:w-1/4 lg:w-1/3 md:w-2/5 pr-[15px] pl-[15px] md:pr-1 md:pl-1">
          <label className="form-label">{t("date_range")}</label>
          <DateRangeSelect
            value={values.dateRange}
            onSelect={(value) => setValue("dateRange", value)}
          />
        </div>
        <SelectField
          className="w-full md:w-1/6 pr-[15px] pl-[15px] md:pr-1 md:pl-1"
          fieldName="yacht__yacht_model__category__yachtdisplaycategory"
          label={t("yacht_type")}
          options={yachtTypes}
          values={values}
          setValue={setValue}
          placeholder={t("offer_filter_yacht_type_placeholder")}
        />
        <div className="w-full md:w-1/6 pr-[15px] pl-[15px] md:pr-1 md:pl-1">
          <Link className="btn--home-filter btn btn-primary btn-lg" href={`${OFFERS_URL}?${searchQuery}`}>
            {t("search")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeFilter;
