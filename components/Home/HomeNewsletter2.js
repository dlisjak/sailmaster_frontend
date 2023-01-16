import { useState } from "react";
import { Formik } from "formik";
import { useTranslation } from 'next-i18next';

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import { Field } from "../forms/fields";
import {
  newsletterValidationSchema,
  newsletterInitialValues,
} from "../../utils/newsletterFormUtils";

const HomeNewsletter = ({ onSubmit }) => {
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState(false);
  const { t } = useTranslation("common");

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
                <div className="row">
                  <div className="w-full md:w-1/4 px-2 mb-4">
                    <Field
                      name="name"
                      placeholder={t("name")}
                      formikBag={formikBag}
                    />
                  </div>
                  <div className="w-full md:w-1/4 px-2 mb-4">
                    <Field
                      name="nickname"
                      placeholder={t("surname")}
                      formikBag={formikBag}
                    />
                  </div>
                  <div className="w-full md:w-1/4 px-2 mb-4">
                    <Field
                      name="email"
                      placeholder={t("email")}
                      formikBag={formikBag}
                      type="email"
                    />
                  </div>
                  <div className="w-full md:w-1/4 px-2">
                    <Button
                      type="submit"
                      disabled={formikBag.isSubmitting}
                      className="white-empty-button"
                    >
                      {t("confirm")}
                    </Button>
                  </div>
                </div>
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
