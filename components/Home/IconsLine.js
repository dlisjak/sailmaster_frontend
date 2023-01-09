import { Row, Col } from "react-bootstrap";
import { useTranslation } from 'next-i18next';

import IconWithText from "../common/IconWithText";
import Verified from "../icons/Verified";
import RealTime from "../icons/RealTime";
import TrustedDestination from "../../public/icons/brez-stroskov-rezervacije_.svg"
import TalkIcon from "../../public/icons/svetovanje-podpora.svg"

const IconsLine = () => {
  const { i18n, t } = useTranslation('common');
  const iconStyles = {
    height: 51,
    width: "auto",
  };

  return (
    <div className="icons-line">
      <div className="container">
        <div className="row">
          <Col xs={12} sm={6} md={3} className="icon_with_text_home_1">
            <IconWithText text={t("icon_with_text_home_1")}>
              <Verified />
            </IconWithText>
          </Col>
          <Col xs={12} sm={6} md={3} className="icon_with_text_home_2">
            <IconWithText text={t("icon_with_text_home_2")}>
              <RealTime />
            </IconWithText>
          </Col>
          <Col xs={12} sm={6} md={3} className="icon_with_text_home_3">
            <IconWithText text={t("icon_with_text_home_3")}>
              <TrustedDestination style={iconStyles} />
            </IconWithText>
          </Col>
          <Col xs={12} sm={6} md={3} className="icon_with_text_home_4">
            <IconWithText text={t("icon_with_text_home_4")}>
              <TalkIcon style={iconStyles} />
            </IconWithText>
          </Col>
        </div>
      </div>
    </div>
  );
};

export default IconsLine;
