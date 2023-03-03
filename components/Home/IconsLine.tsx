import { useTranslation } from 'next-i18next';

import IconWithText from '../common/IconWithText';
import Verified from '../icons/Verified';
import RealTime from '../icons/RealTime';
import TrustedDestination from '../icons/Destinacija';
import TalkIcon from '../icons/Svetovanje';

const IconsLine = () => {
  const { t } = useTranslation('common');

  return (
    <div className="icons-line">
      <div className="container">
        <div className="row">
          <div className="icon_with_text_home_1 w-full pr-[15px] pr-[15px] pl-[15px] pl-[15px] sm:w-1/2 md:w-1/4">
            <IconWithText text={t('icon_with_text_home_1')}>
              <Verified />
            </IconWithText>
          </div>
          <div className="icon_with_text_home_2 w-full pr-[15px] pr-[15px] pl-[15px] pl-[15px] sm:w-1/2 md:w-1/4">
            <IconWithText text={t('icon_with_text_home_2')}>
              <RealTime />
            </IconWithText>
          </div>
          <div className="icon_with_text_home_3 w-full pr-[15px] pr-[15px] pl-[15px] pl-[15px] sm:w-1/2 md:w-1/4">
            <IconWithText text={t('icon_with_text_home_3')}>
              <div className="h-14 w-14">
                <TrustedDestination />
              </div>
            </IconWithText>
          </div>
          <div className="icon_with_text_home_4 w-full pr-[15px] pr-[15px] pl-[15px] pl-[15px] sm:w-1/2 md:w-1/4">
            <IconWithText text={t('icon_with_text_home_4')}>
              <div className="h-14 w-14">
                <TalkIcon />
              </div>
            </IconWithText>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconsLine;
