import { useEffect, useState } from "react";
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../next-i18next.config.js'
import SSRProvider from 'react-bootstrap/SSRProvider';
import ScrollToTop from "react-scroll-to-top";

import Navigation from "../components/Navigation";
import Footer from "../components/common/Footer";
import CookieLaw from "../components/common/CookieLaw";
import InquiryModal from "../components/Inquiry";
import PromoModal from "../components/PromoModal";

import { subscribeNewsletterGift } from "../lib/base";
import ErrorBoundary from "../components/ErrorBoundary";
import { language } from '../constants'

import '../styles/main.css';
import "../node_modules/flag-icons/css/flag-icons.min.css";

const MyApp = ({ Component, pageProps, router }) => {
  const route = router.route;
  const lang = process.env.NEXT_PUBLIC_REACT_APP_LANGUAGE;
  const [showInquiry, setShowInquiry] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     window.ga.getAll()[0].set("page", location.pathname + location.search);
  //     window.ga.getAll()[0].send("pageview");
  //   }, 0)
  //   return
  // }, [route])

  useEffect(() => {
    const handlePromoModal = () => {
      if (!localStorage.getItem("promoModal")) {
        setTimeout(() => {
          setShowModal(true)
          localStorage.setItem("promoModal", 1)
        }, 1000)
      }
    }

    handlePromoModal();
  }, []);

  return (
    <SSRProvider>
      <ScrollToTop smooth color="#ceb896" />
      <Navigation setShowInquiry={setShowInquiry} />
      <Component {...pageProps} route={route} key={route} lang={lang} />
      <Footer lang={lang} />
      <CookieLaw />
      <PromoModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
      />
      <InquiryModal
        showInquiry={showInquiry}
        onClose={() => setShowInquiry(false)}
      />
    </SSRProvider>
  );
};

export default appWithTranslation(MyApp, nextI18NextConfig);
