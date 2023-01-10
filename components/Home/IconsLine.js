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
          <div className="icon_with_text_home_1 md:w-1/4 pr-4 pl-4 sm:w-1/2 pr-4 pl-4 w-full">
            <IconWithText text={t("icon_with_text_home_1")}>
              <Verified />
            </IconWithText>
          </div>
          <div className="icon_with_text_home_2 md:w-1/4 pr-4 pl-4 sm:w-1/2 pr-4 pl-4 w-full">
            <IconWithText text={t("icon_with_text_home_2")}>
              <RealTime />
            </IconWithText>
          </div>
          <div className="icon_with_text_home_3 md:w-1/4 pr-4 pl-4 sm:w-1/2 pr-4 pl-4 w-full">
            <IconWithText text={t("icon_with_text_home_3")}>
              <TrustedDestination style={iconStyles} />
            </IconWithText>
          </div>
          <div className="icon_with_text_home_4 md:w-1/4 pr-4 pl-4 sm:w-1/2 pr-4 pl-4 w-full">
            <IconWithText text={t("icon_with_text_home_4")}>
              <TalkIcon style={iconStyles} />
            </IconWithText>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconsLine;
