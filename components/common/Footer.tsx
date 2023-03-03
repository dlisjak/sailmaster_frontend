import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { FacebookIcon } from 'react-share';

import Navtika from '../icons/Navtika';
import Vzajemna from '../icons/VZ_LOGO_sekundarni_RGB.svg';
import Nausys from '../icons/Nausys';
import SailmasterSiLe from '../icons/SailmasterSiLe';
import SailmasterItLe from '../icons/SailmasterItLe';

const Footer = ({ lang }) => {
  const { t } = useTranslation('common');

  let logo = <></>;

  if (lang === 'it') {
    logo = <SailmasterItLe />;
  } else if (lang === 'si') logo = <SailmasterSiLe />;

  return (
    <div className="footer">
      <div className="container">
        <div className="footer-upper row">
          <div className="footer-upper-col w-full pr-[15px] pr-[15px] pl-[15px] pl-[15px] sm:w-1/2 md:w-1/4">
            <h3>{t('why_us')}</h3>
            <ul className="check">
              <li
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <Link href={t('why_us_route') + '?selected=1'}>{t('why_us_footer_1')}</Link>
              </li>
              <li
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <Link href={t('why_us_route') + '?selected=2'}>{t('why_us_footer_2')}</Link>
              </li>
              <li
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <Link href={t('why_us_route') + '?selected=3'}>{t('why_us_footer_3')}</Link>
              </li>
              <li
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <Link href={t('why_us_route') + '?selected=4'}>{t('why_us_footer_4')}</Link>
              </li>
              <li
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <Link href={t('why_us_route') + '?selected=5'}>{t('why_us_footer_5')}</Link>
              </li>
            </ul>
          </div>
          <div className="footer-upper-col w-full pr-[15px] pr-[15px] pl-[15px] pl-[15px] sm:w-1/2 md:w-1/4">
            <h3>{t('footer_informations')}</h3>
            <ul className="squares">
              <li
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <Link href={t('reservations_steps_route')}>{t('informations_1')}</Link>
              </li>
              <li
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <Link href={t('payment_type_route')}>{t('informations_2')}</Link>
              </li>
              <li
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <Link href={t('terms_route')}>{t('informations_3')}</Link>
              </li>
              <li
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <Link href={t('data_privacy_route')}>{t('informations_4')}</Link>
              </li>
              <li
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <Link href={t('faq_route')}>{t('informations_5')}</Link>
              </li>
              <li
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <Link href={t('partners_route')}>{t('for_partners')}</Link>
              </li>
              <li
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <Link href={t('insurance_route')}>{t('insurance')}</Link>
              </li>
            </ul>
          </div>
          <div className="footer-upper-col w-full pr-[15px] pr-[15px] pl-[15px] pl-[15px] sm:w-1/2 md:w-1/4">
            <h3>{t('footer_sailmaster')}</h3>
            <ul className="squares">
              <li
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <Link href={t('why_charter_route')}>{t('why_charter')}</Link>
              </li>
              <li
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <Link href={t('abous_us_route')}>{t('abous_us')}</Link>
              </li>
              <li
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <Link href={t('blog_route')}>{t('blog').toUpperCase()}</Link>
              </li>
            </ul>
          </div>
          <div className="footer-upper-col w-full pr-[15px] pr-[15px] pl-[15px] pl-[15px] sm:w-1/2 md:w-1/4">
            <h3>{t('contact')}</h3>
            <p>
              {t('company_name')} <br />
              {t('company_address')}, {t('company_zip')}
            </p>
            <p>
              {t('phone386')} <br />
              {t('mobile_phone386')} <br />
              {t('mail')}
            </p>
          </div>
          <div className="footer-border w-full" />
        </div>
        <div className="footer-upper footer-middle row">
          <div className="footer-upper-col w-full pr-[15px] pr-[15px] pl-[15px] pl-[15px] sm:w-full md:w-1/2">
            <h3>{t('partners')}</h3>
            <div className="p-logos">
              <a href="https://www.vzajemna.si/" rel="noopener noreferrer" target="_blank">
                <Vzajemna />
              </a>
              <a href="http://enavtika.si/" rel="noopener noreferrer" target="_blank">
                <Navtika />
              </a>
              <a href="http://www.yacht-pool.com/" rel="noopener noreferrer" target="_blank">
                <img
                  alt="YachtPool"
                  className="YachtPool-icon"
                  src="/media/YachtPool.svg"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
          <div className="footer-upper-col w-full pr-[15px] pr-[15px] pl-[15px] pl-[15px] sm:w-full md:w-1/4">
            <h3>{t('follow_us')}</h3>
            <div className="social">
              <a
                href="https://www.facebook.com/TheSailmaster/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FacebookIcon size={40} round={true} />
              </a>
              <a
                href="https://www.instagram.com/thesailmaster/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg className="social-svg" viewBox="0 0 64 64">
                  <g className="social-svg-background">
                    <circle cx="32" cy="32" r="31"></circle>
                  </g>
                  <g className="social-svg-icon">
                    <path d="M43.5,29.7h-2.6c0.2,0.7,0.3,1.5,0.3,2.3 c0,5.1-4.1,9.2-9.2,9.2c-5.1,0-9.2-4.1-9.2-9.2c0-0.8,0.1-1.6,0.3-2.3h-2.6v12.7c0,0.6,0.5,1.2,1.2,1.2h20.8c0.6,0,1.2-0.5,1.2-1.2 V29.7z M43.5,21.6c0-0.6-0.5-1.2-1.2-1.2h-3.5c-0.6,0-1.2,0.5-1.2,1.2v3.5c0,0.6,0.5,1.2,1.2,1.2h3.5c0.6,0,1.2-0.5,1.2-1.2V21.6z  M32,26.2c-3.2,0-5.8,2.6-5.8,5.8c0,3.2,2.6,5.8,5.8,5.8s5.8-2.6,5.8-5.8C37.8,28.8,35.2,26.2,32,26.2 M43.5,47H20.5 c-1.9,0-3.5-1.6-3.5-3.5V20.5c0-1.9,1.5-3.5,3.5-3.5h23.1c1.9,0,3.5,1.5,3.5,3.5v23.1C47,45.4,45.5,47,43.5,47"></path>
                  </g>
                  <g className="social-svg-mask">
                    <path d="M41.2,32c0,5.1-4.1,9.2-9.2,9.2c-5.1,0-9.2-4.1-9.2-9.2c0-0.8,0.1-1.6,0.3-2.3h-2.6v12.7c0,0.6,0.5,1.2,1.2,1.2 h20.8c0.6,0,1.2-0.5,1.2-1.2V29.7h-2.6C41.1,30.4,41.2,31.2,41.2,32z M32,37.8c3.2,0,5.8-2.6,5.8-5.8c0-3.2-2.6-5.8-5.8-5.8 c-3.2,0-5.8,2.6-5.8,5.8C26.2,35.2,28.8,37.8,32,37.8z M42.4,20.5h-3.5c-0.6,0-1.2,0.5-1.2,1.2v3.5c0,0.6,0.5,1.2,1.2,1.2h3.5 c0.6,0,1.2-0.5,1.2-1.2v-3.5C43.5,21,43,20.5,42.4,20.5z M0,0v64h64V0H0z M47,43.5c0,1.9-1.5,3.5-3.5,3.5H20.5 c-1.9,0-3.5-1.6-3.5-3.5V20.5c0-1.9,1.5-3.5,3.5-3.5h23.1c1.9,0,3.5,1.5,3.5,3.5V43.5z"></path>
                  </g>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/channel/UC7dJ12o6_Gs-bverZqz0Wag"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg className="social-svg" viewBox="0 0 64 64">
                  <g className="social-svg-background">
                    <circle cx="32" cy="32" r="31"></circle>
                  </g>
                  <g className="social-svg-icon">
                    <path d="M46.7,26c0,0-0.3-2.1-1.2-3c-1.1-1.2-2.4-1.2-3-1.3C38.3,21.4,32,21.4,32,21.4h0 c0,0-6.3,0-10.5,0.3c-0.6,0.1-1.9,0.1-3,1.3c-0.9,0.9-1.2,3-1.2,3S17,28.4,17,30.9v2.3c0,2.4,0.3,4.9,0.3,4.9s0.3,2.1,1.2,3 c1.1,1.2,2.6,1.2,3.3,1.3c2.4,0.2,10.2,0.3,10.2,0.3s6.3,0,10.5-0.3c0.6-0.1,1.9-0.1,3-1.3c0.9-0.9,1.2-3,1.2-3s0.3-2.4,0.3-4.9 v-2.3C47,28.4,46.7,26,46.7,26z M28.9,35.9l0-8.4l8.1,4.2L28.9,35.9z"></path>
                  </g>
                  <g className="social-svg-mask">
                    <path d="M0,0v64h64V0H0z M47,33.1c0,2.4-0.3,4.9-0.3,4.9s-0.3,2.1-1.2,3c-1.1,1.2-2.4,1.2-3,1.3 C38.3,42.5,32,42.6,32,42.6s-7.8-0.1-10.2-0.3c-0.7-0.1-2.2-0.1-3.3-1.3c-0.9-0.9-1.2-3-1.2-3S17,35.6,17,33.1v-2.3 c0-2.4,0.3-4.9,0.3-4.9s0.3-2.1,1.2-3c1.1-1.2,2.4-1.2,3-1.3c4.2-0.3,10.5-0.3,10.5-0.3h0c0,0,6.3,0,10.5,0.3c0.6,0.1,1.9,0.1,3,1.3 c0.9,0.9,1.2,3,1.2,3s0.3,2.4,0.3,4.9V33.1z M28.9,35.9l8.1-4.2l-8.1-4.2L28.9,35.9z"></path>
                  </g>
                </svg>
              </a>
            </div>
          </div>
          <div className="footer-upper-col w-full pr-[15px] pr-[15px] pl-[15px] pl-[15px] sm:w-full md:w-1/4">
            {logo}
            <Nausys />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="footer-bottom-text w-full">{t('footer_bottom_text')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
