import Image from "next/image";
import { useTranslation } from 'next-i18next';
import { LinkedinIcon } from "react-share";

import JERNEJ from "../public/media/quick-contact.jpg"
import Link from "next/link";

const QuickContact = () => {
  const { t } = useTranslation("common");

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
      <Image
        alt="Jernej"
        className="img-responsive quick-contact__img"
        src={JERNEJ}
        width={130}
        height={130}
      />
      <div className="quick-contact__contacts">
        Jernej Kuhar
        <br />
        <strong>{t("common:quick_contact_phone")}</strong>
        <br />
        <strong>
          <Link href="mailto:info@thesailmaster.si">info@thesailmaster.si</Link>
        </strong>
        <Link className="flex m-auto w-8 h-8" href="https://www.linkedin.com/in/jernej-kuhar-228599107/">
          <LinkedinIcon />
        </Link>
      </div>
    </div>
  );
};

export default QuickContact;
