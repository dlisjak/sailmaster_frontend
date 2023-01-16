import { useState } from "react";
import { useTranslation } from 'next-i18next';

import Form from "react-bootstrap/Form";
import FormLabel from "react-bootstrap/FormLabel";
import FormGroup from "react-bootstrap/FormGroup";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import DestinationSelect from "./DestinationSelect";
import DateRangeSelect from "./DateRangeSelect";
import { SelectField } from "../forms/fields"

const HomeFilter = ({ searchDestinations, yachtType, onSubmit }) => {
  const [values, setValues] = useState({});
  const { i18n, t } = useTranslation('common');

  const setValue = (k, v) => {
    const newValues = {
      ...values,
      [k]: v,
    };
    setValues(newValues);
  };

  return (
    <Form
      className="home-filter"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(values);
      }}
    >
      <div className="row">
        <FormGroup as={Col} md={3} lg={4} xl={5}>
          <FormLabel>{t("starting_point")}</FormLabel>
          <DestinationSelect
            setValue={(value) => {
              setValue("destinations", value);
            }}
            searchDestinations={searchDestinations}
            value={values.destinations}
          />
        </FormGroup>
        <FormGroup as={Col} md={5} lg={4} xl={3}>
          <FormLabel>{t("date_range")}</FormLabel>
          <DateRangeSelect
            value={values.dateRange}
            onSelect={(value) => setValue("dateRange", value)}
          />
        </FormGroup>
        <SelectField
          formGroupProps={{
            as: Col,
            md: 2,
          }}
          fieldName="yacht__yacht_model__category__yachtdisplaycategory"
          label={t("yacht_type")}
          options={yachtType}
          values={values}
          setValue={setValue}
          placeholder={t("offer_filter_yacht_type_placeholder")}
        />
        <Col md={2}>
          <Button className="btn--home-filter" size="lg" variant="secondary" type="submit">
            {t("search")}
          </Button>
        </Col>
      </div>
    </Form>
  );
};

export default HomeFilter;
