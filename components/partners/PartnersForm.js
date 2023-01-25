import RenderField from "../common/fields/RenderField";
import RenderSelectField from "../common/fields/RenderSelectField";
import RenderTextAreaField from "../common/fields/RenderTextAreaField";
import { PARTNERS } from "../../actions/contact";

import { useTranslation } from "next-i18next";

import { Row, Col } from "react-bootstrap";

import { Field, reduxForm } from "redux-form";

let PartnersForm = (props) => {
  const { t } = useTranslation("common");
  const { handleSubmit, submitting, submitFailed } = props;
  const submit = handleSubmit(PARTNERS); // creating our submit handler by passing our action

  return (
    <form onSubmit={submit} className="contact-form">
      <div className="row">
        <Col xs={12}>
          <div className="select-wrapper">
            <Field
              name="type"
              type="select"
              component={RenderSelectField}
              required={true}
              selected={true}
              showError={submitFailed}
              label={props.t("partner_type")}
            >
              <option hidden>{props.t("partner_type")}</option>
              <option value="charter podjetje">
                {props.t("partner_type_1")}
              </option>
              <option value="skiper">{props.t("partner_type_2")}</option>
              <option value="hostesa">
                {props.t("partner_type_3")}
              </option>
              <option value="ostalo ">
                {props.t("partner_type_4")}
              </option>
            </Field>
          </div>
        </Col>
        <Col xs={12}>
          <label>
            <span>*</span> {props.t("contact_person")}
          </label>
          <Field
            name="person"
            type="text"
            component={RenderField}
            required={true}
            showError={submitFailed}
          />
        </Col>
        <Col xs={12}>
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
        <Col xs={12}>
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
        <Col xs={12}>
          <label>
            <span>*</span> {props.t("description_form")}
          </label>
          <Field
            name="description"
            type="textarea"
            component={RenderTextAreaField}
            required={true}
            showError={submitFailed}
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

        <Col xs={12} sm={4}>
          <button
            type="submit"
            className="gold-border-button"
            disabled={submitting}
          >
            {props.t("send_message")}
          </button>
        </Col>
      </div>
    </form>
  );
};

PartnersForm = PartnersForm;

export default reduxForm({
  form: "partnersForm", // a unique identifier for this form
})(PartnersForm);
