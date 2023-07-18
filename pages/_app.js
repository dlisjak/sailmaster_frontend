import { useEffect, useState } from "react";
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../next-i18next.config.js'
// import * as Sentry from "@sentry/react";
// import { Integrations } from "@sentry/tracing";
import Script from 'next/script';

import Navigation from "../components/Navigation";
import Footer from "../components/common/Footer";

import InquiryModal from "../components/Inquiry";
import PromoModal from "../components/PromoModal";
import CookieLaw from "../components/common/CookieLaw";
import ScrollToTop from "react-scroll-to-top";

import ErrorBoundary from "../components/ErrorBoundary";

import '../styles/main.css';
import "../node_modules/flag-icons/css/flag-icons.min.css";

// if (process.env.NODE_ENV === "production") {
//   Sentry.init({
//     dsn:
//       "https://dd8fab38768a411d988af3a213bd039c@o38387.ingest.sentry.io/5559422",
//     autoSessionTracking: true,
//     integrations: [new Integrations.BrowserTracing()],

//     // We recommend adjusting this value in production, or using tracesSampler
//     // for finer control
//     tracesSampleRate: 1.0,
//   });
// }


const MyApp = ({ Component, pageProps, router }) => {
  const route = router.route;
  const lang = process.env.NEXT_PUBLIC_REACT_APP_LANGUAGE;
  const [showInquiry, setShowInquiry] = useState(false);
  // const [showModal, setShowModal] = useState(false);

  // useEffect(() => {
  //   const handlePromoModal = () => {
  //     if (!localStorage.getItem("promoModal")) {
  //       setTimeout(() => {
  //         setShowModal(true)
  //         localStorage.setItem("promoModal", 1)
  //       }, 3000)
  //     }
  //   }

  //   handlePromoModal();
  // }, []);


  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=UA-71727689-1"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'UA-71727689-1');
            `}
      </Script>
      <ScrollToTop smooth color="#ceb896" />
      <Navigation setShowInquiry={setShowInquiry} />
      <ErrorBoundary>
        <Component {...pageProps} route={route} key={route} lang={lang} />
      </ErrorBoundary>
      <Footer lang={lang} />
      <CookieLaw />
      {/* {showModal && <PromoModal onHide={() => setShowModal(false)} />} */}
      {showInquiry && <InquiryModal onClose={() => setShowInquiry(false)} />}
    </>
  );
};

export default appWithTranslation(MyApp, nextI18NextConfig);
