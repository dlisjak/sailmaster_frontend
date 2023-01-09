import React from "react";
import { Modal } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import Link from "next/link";

import SubscribeForm from "./SubscribeForm";

const PromoModal = ({
  promoModalSucess,
  showModal,
  closeModal,
  i18n: { language },
  t,
}) => {
  return (
    <Modal
      show={showModal || promoModalSucess}
      onHide={closeModal}
      dialogClassName="promo-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="promo-img">
          <img src={`/static/media/gift_${language}.png`} alt="gift" />
        </div>

        {showModal && (
          <div>
            <div className="promo-bold">
              {language === "it" ? (
                <div>
                  Vuoi noleggiare una barca? Iscriviti gratuitamente per le
                  nostre <strong>offerte esclusive</strong> ed ottieni{" "}
                  <strong>un regalo</strong> al primo noleggio.
                </div>
              ) : (
                <div>
                  <div>
                    Želite najeti plovilo? Prijavite se na naše brezplačne{" "}
                    <strong>ekskluzivne ponudbe</strong> in ob prvem najemu
                    prejmite <strong>darilo</strong>.
                  </div>
                </div>
              )}
            </div>

            <SubscribeForm lang={language} />
          </div>
        )}

        {promoModalSucess && (
          <div
            dangerouslySetInnerHTML={{ __html: t("promo_success") }}
            className="promo-bold"
          />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default withTranslation()(PromoModal);
