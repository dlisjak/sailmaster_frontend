import { useEffect, useState } from "react";
import dynamic from "next/dynamic.js";
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../next-i18next.config.js'
import SSRProvider from 'react-bootstrap/SSRProvider';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import Navigation from "../components/Navigation";
import Footer from "../components/common/Footer";

const InquiryModal = dynamic(() => import("../components/Inquiry"));
const PromoModal = dynamic(() => import("../components/PromoModal"));
const CookieLaw = dynamic(() => import("../components/common/CookieLaw"));
const ScrollToTop = dynamic(() => import("react-scroll-to-top"));

import ErrorBoundary from "../components/ErrorBoundary";
// import { language } from '../constants'

import '../styles/main.css';
import "../node_modules/flag-icons/css/flag-icons.min.css";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn:
      "https://dd8fab38768a411d988af3a213bd039c@o38387.ingest.sentry.io/5559422",
    autoSessionTracking: true,
    integrations: [new Integrations.BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });
}


const MyApp = ({ Component, pageProps, router }) => {
  const route = router.route;
  const path = router.asPath;
  const lang = process.env.NEXT_PUBLIC_REACT_APP_LANGUAGE;
  const [showInquiry, setShowInquiry] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     window.ga.getAll()[0].set("page", path);
  //     window.ga.getAll()[0].send("pageview");
  //   }, 0)
  //   return
  // }, [path])

  useEffect(() => {
    const handlePromoModal = () => {
      if (!localStorage.getItem("promoModal")) {
        setTimeout(() => {
          setShowModal(true)
          localStorage.setItem("promoModal", 1)
        }, 3000)
      }
    }

    handlePromoModal();
  }, []);


  return (
    <SSRProvider>
      <ScrollToTop smooth color="#ceb896" />
      <Navigation setShowInquiry={setShowInquiry} />
      <ErrorBoundary>
        <Component {...pageProps} route={route} key={route} lang={lang} />
      </ErrorBoundary>
      <Footer lang={lang} />
      <CookieLaw />
      {showModal && <PromoModal onHide={() => setShowModal(false)} />}
      {showInquiry && <InquiryModal onClose={() => setShowInquiry(false)} />}
    </SSRProvider>
  );
};

export default appWithTranslation(MyApp, nextI18NextConfig);
