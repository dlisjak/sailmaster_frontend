import React, { useState } from "react";
import { Formik } from "formik";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useTranslation } from 'next-i18next';

import { Field } from "components/forms/fields";
import {
  newsletterValidationSchema,
  newsletterInitialValues,
} from "utils/newsletterFormUtils";

const HomeNewsletter = ({ onSubmit }) => {
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="home-newsletter">
      <Container>
        <div className="row">
          <Col className="text-center page-title">
            <h2>{t("newsletter_title")}</h2>
          </Col>
        </div>
        <div className="row">
          <Col className="text-center">
            <p>{t("newsletter_subtitle")}</p>
          </Col>
        </div>
        {error && <Alert variant="danger">{error}</Alert>}
        {!finished && (
          <Formik
            initialValues={newsletterInitialValues}
            validationSchema={newsletterValidationSchema(t)}
            onSubmit={async (values, { setSubmitting }) => {
              setError(null);
              try {
                await onSubmit(values);
                setFinished(true);
              } catch (e) {
                setError("error");
              }
            }}
          >
            {(formikBag) => (
              <Form noValidate onSubmit={formikBag.handleSubmit}>
                <Form.Row>
                  <Form.Group as={Col} md="3">
                    <Field
                      name="name"
                      placeholder={t("name")}
                      formikBag={formikBag}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="3">
                    <Field
                      name="nickname"
                      placeholder={t("surname")}
                      formikBag={formikBag}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="3">
                    <Field
                      name="email"
                      placeholder={t("email")}
                      formikBag={formikBag}
                      type="email"
                    />
                  </Form.Group>
                  <Col md="3">
                    <Button
                      type="submit"
                      disabled={formikBag.isSubmitting}
                      className="white-empty-button"
                    >
                      {t("confirm")}
                    </Button>
                  </Col>
                </Form.Row>
              </Form>
            )}
          </Formik>
        )}
        {finished && (
          <div className="text-center newsletter-success fade-in">
            <p>{t("newsletter_success")}</p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default HomeNewsletter;
