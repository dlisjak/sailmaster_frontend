import React from "react";
import { useTranslation } from 'next-i18next';

const QuickContact = () => {
  const { t } = useTranslation();
  return (
    <div className="quick-contact">
      <div className="quick-contact__header">
        <div className="quick-contact__title">
          {t("common:quick_contact_title")}
        </div>
        <div className="quick-contact__subtitle">
          {t("common:quick_contact_subtitle")}
        </div>
      </div>
      <img
        alt="Jernej"
        className="img-responsive quick-contact__img"
        src="/static/media/quick-contact.jpg"
      />
      <div className="quick-contact__contacts">
        Jernej
        <br />
        <strong>{t("common:quick_contact_phone")}</strong>
        <br />
        <strong>
          <a href="mailto:info@thesailmaster.si">info@thesailmaster.si</a>
        </strong>
      </div>
    </div>
  );
};

export default QuickContact;
