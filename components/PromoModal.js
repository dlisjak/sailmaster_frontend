import React, { useState } from "react";
import { Formik } from "formik";
import { useTranslation } from 'next-i18next';
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { Field } from "components/forms/fields";
import {
  newsletterValidationSchema,
  newsletterInitialValues,
} from "utils/newsletterFormUtils";

const PromoModal = ({ onClose, onSubmit }) => {
  const { t, i18n } = useTranslation();
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState(false);
  const language = i18n.language;

  return (
    <Modal show={true} onHide={onClose} dialogClassName="promo-modal">
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="promo-img">
          <img src={`/static/media/gift_${language}.png`} alt="gift" />
        </div>

        {error && <Alert variant="danger">{error}</Alert>}
        {!finished && (
          <div>
            <div
              dangerouslySetInnerHTML={{ __html: t("promo_modal_text") }}
              className="promo-bold"
            />

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
                  <Form.Group>
                    <Field
                      name="name"
                      placeholder={t("name")}
                      formikBag={formikBag}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Field
                      name="nickname"
                      placeholder={t("surname")}
                      formikBag={formikBag}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Field
                      name="email"
                      placeholder={t("email")}
                      formikBag={formikBag}
                      type="email"
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    disabled={formikBag.isSubmitting}
                    className="dark-button"
                  >
                    {t("confirm")}
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        )}

        {finished && (
          <div
            dangerouslySetInnerHTML={{ __html: t("promo_success") }}
            className="promo-bold"
          />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PromoModal;
