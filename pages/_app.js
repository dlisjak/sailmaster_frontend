import React, { useEffect, useState } from "react";
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../next-i18next.config.js'

import ScrollToTop from "react-scroll-to-top";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { language } from '../constants'
import { I18nextProvider } from "react-i18next";

import Navigation2 from "../components/Navigation2";
import Footer from "../components/common/Footer";
import CookieLaw from "../components/common/CookieLaw";
// import { wishlistClickedReducerAction } from "actions/wishlist";
// import { getWishlistFromLocalStorage } from "utils/wishlistUtils";
import InquiryModal from "../components/Inquiry";
// import { createInquiry } from "api/base";
import PromoModal from "../components/PromoModal";
// import { subscribeNewsletterGift } from "api/base";
import ErrorBoundary from "../components/ErrorBoundary";

import '../styles/main.css';
// import "../styles/main.scss";
import "../node_modules/flag-icons/css/flag-icons.min.css";

const MyApp = ({ Component, pageProps, router }) => {
  const route = router.route;
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
    if (!localStorage.getItem("promoModal")) {
      setTimeout(() => {
        setShowModal(true)
        localStorage.setItem("promoModal", 1)
      }, 1000)
    }

    // dispatch({
    //   type: "COUNTRIES_ENQUIRY_SAGA",
    //   payload: { lang },
    // });
    // dispatch({
    //   type: "YACHT_TYPE_FETCH",
    //   payload: { lang },
    // });
    // dispatch({
    //   type: "BRANDS_SAGA",
    //   payload: { lang },
    // });
    // const arr = getWishlistFromLocalStorage();
    // dispatch(
    //   wishlistClickedReducerAction({
    //     count: arr.size,
    //     array: arr,
    //     success: true,
    //   })
    // );
  }, []);


  return (
    <>
      <Navigation2 />
      <Component {...pageProps} route={route} key={route} />
    </>
  );
};

export default appWithTranslation(MyApp, nextI18NextConfig);
