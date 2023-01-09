import React from "react";
import ValidateSubscribeForm from "./ValidateSubscribeForm";
import RenderField from "../common/fields/RenderField";

import { withTranslation } from "react-i18next";

import { Row, Col } from "react-bootstrap";

import { Field, reduxForm } from "redux-form";

import { SUBSCRIBE } from "../../actions/newsletter";

const SubscribeForm = (props) => {
  const { handleSubmit, pristine, reset, submitting, lang } = props;
  const submit = handleSubmit(SUBSCRIBE);

  return (
    <div className="row">
      <form onSubmit={submit}>
        <Col xs={12}>
          <label>
            <span>*</span> {props.t("email_subscribe")}
          </label>
          <Field
            name="email"
            type="email"
            component={RenderField}
            required={true}
          />
        </Col>
        <Col xs={12}>
          <label>
            <span>*</span> {props.t("name")}
          </label>
          <Field
            name="name"
            type="text"
            component={RenderField}
            required={true}
          />
        </Col>
        <Col xs={12}>
          <label>
            <span>*</span> {props.t("surname")}
          </label>
          <Field
            name="nickname"
            type="text"
            component={RenderField}
            required={true}
          />
        </Col>
        <Col xs={6} xsOffset={3}>
          <div>
            <button type="submit" className="dark-button" disabled={submitting}>
              {props.t("submit_subscribe")}
            </button>
          </div>
        </Col>
        <Field
          name="lang"
          type="hidden"
          component={RenderField}
          required={false}
          defaultValue={lang}
        />
      </form>
    </div>
  );
};

export default withTranslation()(
  reduxForm({
    form: "SubscribeForm", // a unique identifier for this form
    validate: ValidateSubscribeForm, // <--- validation function given to redux-form
  })(SubscribeForm)
);
