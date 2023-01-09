import React from "react";
import { Row, Col } from "react-bootstrap";
import { useTranslation } from 'next-i18next';
import Compass from "./icons/Compass";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="not-found">
      <div className="container">
        <Row className="row-not-found">
          <Col xs={12} sm={6} className="compass-wrapper">
            <Compass />
          </Col>

          <Col xs={12} sm={6} className="text-wrapper">
            <h1>{t("page_not_found")}</h1>
            <p>{t("page_not_found_text_1")}</p>
            <p>
              <div
                dangerouslySetInnerHTML={{ __html: t("page_not_found_text_2") }}
              />
            </p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default NotFound;
