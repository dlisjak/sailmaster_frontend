const lang = process.env.NEXT_PUBLIC_REACT_APP_LANGUAGE;

export const OFFERS_URL = lang === "si" ? "/najem-plovil" : "/noleggio-barche";
export const WISHLIST_URL = lang === "si" ? "/seznam-zelja" : "/lista-desideri";
export const DESTINATIONS_URL = lang === "si" ? "/destinacije" : "/destinazioni";
export const FAQ_URL = lang === "si" ? "/pogosta-vprasanja" : "/domande-frequenti";
export const CONTACT_URL = lang === "si" ? "/kontakt" : "/contatto";
export const PARTNERS_URL = lang === "si" ? "/za-partnerje" : "/partner";
export const INSURANCE_URL = lang === "si" ? "/zavarovanja" : "/assicurazione";

export const DEFAULT_COUNTRY = lang === "si" ? 100144 : 100147;
