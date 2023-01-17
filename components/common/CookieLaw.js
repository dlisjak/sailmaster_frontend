import { useEffect, useState } from "react";

import { Col, Button } from "react-bootstrap";
import { useTranslation } from "next-i18next";

const CookieLaw = () => {
  const [closedCookies, setClosedCookies] = useState(null)
  const { t } = useTranslation("common")

  useEffect(() => {
    const closedCookies = localStorage.getItem("closedCookies");

    setClosedCookies(closedCookies)
  }, []);

  const handleCloseCookies = () => {
    localStorage.setItem("closedCookies", true);
    setClosedCookies(true);
  }

  if (closedCookies) {
    return <div />;
  }

  return (
    <div className="CookieLaw">
      <div className="container">
        <div className="row">
          <Col xs={12}>
            <div className="CookieLaw__inner">
              <Col xs={12} sm={10} className="CookieLaw__left">
                <div className="CookieLaw__left__info">i</div>
                <div
                  className="CookieLaw__left__infoText"
                  dangerouslySetInnerHTML={{ __html: t("COOKIES") }}
                />
              </Col>
              <Col xs={12} sm={2} className="CookieLaw__right">
                <Button
                  className="gold-button"
                  onClick={handleCloseCookies}
                >
                  {t("CLOSE")}
                </Button>
              </Col>
            </div>
          </Col>
        </div>
      </div>
    </div>
  );
}

export default CookieLaw;
