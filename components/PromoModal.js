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

import GIFT from "../public/media/gift_si.png";
import Image from "next/image";

const PromoModal = ({ onHide }) => {
  const { t, i18n } = useTranslation("common");
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Modal show={true} onHide={onHide} dialogClassName="promo-modal">
      <Modal.Header>
        <Modal.Title></Modal.Title>
        <button type="button" className="close" onClick={onHide}>
          <span aria-hidden="true">x</span>
          <span className="sr-only">Close</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="promo-img">
          <Image src={GIFT} alt="gift" width={210} height={192} />
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
