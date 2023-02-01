// import { connect } from "react-redux";
import ValidateEnquiryForm from "./ValidateEnquiryForm";
import RenderField from "./fields/RenderField";
import RenderSelectField from "./fields/RenderSelectField";
import RenderTextAreaField from "./fields/RenderTextAreaField";
import { ENQUIRY } from "../../actions/enquiry";

import { useTranslation } from "next-i18next";

import { Col } from "react-bootstrap";

import { Field, reduxForm } from "redux-form";

let EnquiryForm = (props) => {
  const { t } = useTranslation("common");
  const { handleSubmit, submitting, submitFailed } = props;
  const submit = handleSubmit(ENQUIRY); // creating our submit handler by passing our action

  let countries;
  let countryDefault = 0;

  if (props.countries && props.countries) {
    countries = props.countries.map((country, index) => {
      if (
        (props.lang === "sl" && country.nausys_id === 100144) ||
        (props.lang === "it" && country.nausys_id === 100147)
      ) {
        countryDefault = country.id;
      }

      return (
        <option value={country.id} key={country.id}>
          {country.name.name}
        </option>
      );
    });
  }

  return (
    <form onSubmit={submit} className="enquiry-form">
      <div className="row">
        <Col xs={12} sm={6}>
          <label>
            <span>*</span> {props.t("name")}
          </label>
          <Field
            name="name"
            type="text"
            component={RenderField}
            required={true}
            showError={submitFailed}
          />
        </Col>
        <Col xs={12} sm={6}>
          <label>
            <span>*</span> {props.t("surname")}
          </label>
          <Field
            name="surname"
            type="text"
            component={RenderField}
            required={true}
            showError={submitFailed}
          />
        </Col>
        <Col xs={12} sm={6}>
          <label>
            <span>*</span> {props.t("email")}
          </label>
          <Field
            name="email"
            type="email"
            component={RenderField}
            required={true}
            showError={submitFailed}
          />
        </Col>
        <Col xs={12} sm={6}>
          <label>
            <span>*</span> {props.t("phone")}
          </label>
          <Field
            name="phone"
            type="text"
            component={RenderField}
            required={true}
            showError={submitFailed}
          />
        </Col>
        <Col xs={12} sm={6}>
          <label>{props.t("address")}</label>
          <Field
            name="address"
            type="text"
            component={RenderField}
            required={false}
            showError={submitFailed}
          />
        </Col>
        <Col xs={12} sm={6}>
          <label>{props.t("zip")}</label>
          <Field
            name="zip"
            type="text"
            component={RenderField}
            required={false}
            showError={submitFailed}
          />
        </Col>
        <Col xs={12} sm={12}>
          {/*<Field
            name="country"
            type="text"
            component={RenderField}
            required={false}
            showError={submitFailed}
          />*/}
          <div className="select-wrapper">
            <Field
              name="country"
              type="select"
              component={RenderSelectField}
              required={true}
              selected={true}
              showError={submitFailed}
              label={props.t("country")}
              defaultValue={countryDefault}
            >
              <option hidden>{props.t("country")}</option>
              {countries}
            </Field>
          </div>
        </Col>
        <Col xs={12} sm={12}>
          <label>{props.t("description_form")}</label>
          <Field
            name="description"
            type="textarea"
            component={RenderTextAreaField}
            required={false}
            showError={submitFailed}
          />
        </Col>
        <Col xs={12} sm={12} className="hidden-input">
          <Field
            name="id"
            type="hidden"
            component={RenderField}
            required={false}
            showError={submitFailed}
            defaultValue={props.offerId}
          />
          <Field
            name="lang"
            type="hidden"
            component={RenderField}
            required={false}
            showError={submitFailed}
            defaultValue={props.lang}
          />
        </Col>

        <Col xs={12} sm={6}>
          <button type="submit" className="gold-button" disabled={submitting}>
            {props.t("send_enquiry")}
          </button>
        </Col>
      </div>
    </form>
  );
};

EnquiryForm = EnquiryForm;

export default reduxForm({
  form: "enquiryForm", // a unique identifier for this form
  validate: ValidateEnquiryForm,
})(EnquiryForm);
