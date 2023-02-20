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
  const [hideCover, setHideCover] = useState(false);
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
      <div className="row">
        <div className="form-group w-full xl:w-2/5 lg:w-1/3 md:w-1/4 pr-4 pl-4 md:pr-1 md:pl-1">
          <label for="destination" className="form-label">{t("starting_point")}</label>
          <DestinationSelect
            setValue={(value) => {
              setValue("destinations", value);
            }}
            value={values.destinations}
          />
        </div>
        <div className="relative min-h-[76px] form-group w-full xl:w-1/4 lg:w-1/3 md:w-2/5 pr-4 pl-4 md:pr-1 md:pl-1">
          <label className="form-label">{t("date_range")}</label>
          <div className="daterangepicker__cover absolute z-0 bottom-0 bg-white border h-12 flex items-center pr-4 pl-4" style={{ display: hideCover ? "none" : "" }}>
            <div className='mr-auto'>Od</div>
            <div className='mr-auto'>Do</div>
          </div>
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
