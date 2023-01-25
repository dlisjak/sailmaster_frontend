import React from "react";
import ValidateNewsletterForm from "./ValidateNewsletterForm";
import RenderField from "../common/fields/RenderField";

import { useTranslation } from "next-i18next";

import { Row, Col } from "react-bootstrap";

import { Field, reduxForm } from "redux-form";

import { NEWSLETTER } from "../../actions/newsletter";

const HomeNewsletter = (props) => {
  const { t } = useTranslation("common");
  const { handleSubmit, pristine, reset, submitting } = props;
  const submit = handleSubmit(NEWSLETTER);
  let isSubmitted = false;

  return (
    <form onSubmit={submit}>
      <div className="row">
        <Col xs={12} sm={3}>
          <Field
            name="name"
            type="text"
            component={RenderField}
            label={props.t("name")}
            required={true}
          />
        </Col>
        <Col xs={12} sm={3}>
          <Field
            name="nickname"
            type="text"
            component={RenderField}
            label={props.t("surname")}
            required={true}
          />
        </Col>
        <Col xs={12} sm={3}>
          <Field
            name="email"
            type="email"
            component={RenderField}
            label={props.t("email")}
            required={true}
          />
        </Col>
        <Col xs={12} sm={3}>
          <div>
            <button
              type="submit"
              className="white-empty-button"
              disabled={submitting}
            >
              {props.t("confirm")}
            </button>
          </div>
        </Col>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "homeNewsletter", // a unique identifier for this form
  validate: ValidateNewsletterForm, // <--- validation function given to redux-form
})(HomeNewsletter);
