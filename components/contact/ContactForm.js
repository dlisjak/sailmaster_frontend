import React from "react";
import { connect } from "react-redux";
import RenderField from "../common/fields/RenderField";
import RenderTextAreaField from "../common/fields/RenderTextAreaField";
import { CONTACT } from "../../actions/contact";

import { withTranslation } from "react-i18next";

import { Row, Col } from "react-bootstrap";

import { Field, reduxForm } from "redux-form";

let ContactForm = (props) => {
  const { handleSubmit, submitting, submitFailed } = props;
  const submit = handleSubmit(CONTACT); // creating our submit handler by passing our action

  return (
    <form onSubmit={submit} className="contact-form">
      <div className="row">
        <Col xs={12}>
          <label>
            <span>*</span> {props.t("name_surname")}
          </label>
          <Field
            name="name"
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
          <label>{props.t("description_form")}</label>
          <Field
            name="description"
            type="textarea"
            component={RenderTextAreaField}
            required={false}
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

ContactForm = ContactForm;

export default withTranslation()(
  reduxForm({
    form: "contactForm", // a unique identifier for this form
  })(ContactForm)
);
