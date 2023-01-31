import { useEffect, useState } from "react";
import { Formik } from "formik";
import { useTranslation } from 'next-i18next';
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";

import { Field } from "../components/forms/fields";
import {
  newsletterValidationSchema,
  newsletterInitialValues,
} from "../utils/newsletterFormUtils";

import { subscribeNewsletterGift } from "../lib/base";

const PromoModal = ({ onHide }) => {
  const { t, i18n } = useTranslation("common");
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState(false);

  const language = i18n.language;

  return (
    <Modal show={true} onHide={onHide} dialogClassName="promo-modal">
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="promo-img">
          <img src={`/media/gift_${language}.png`} alt="gift" />
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
                  await subscribeNewsletterGift(values);
                  setFinished(true);
                } catch (e) {
                  setError("error");
                }
              }}
            >
              {(formikBag) => (
                <form noValidate onSubmit={formikBag.handleSubmit}>
                  <div className="form-group">
                    <Field
                      name="name"
                      placeholder={t("name")}
                      formikBag={formikBag}
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      name="nickname"
                      placeholder={t("surname")}
                      formikBag={formikBag}
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      name="email"
                      placeholder={t("email")}
                      formikBag={formikBag}
                      type="email"
                    />
                  </div>
                  <button type="submit" disabled={formikBag.isSubmitting} className="dark-button btn btn-primary">
                    {t("confirm")}
                  </button>
                </form>
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
