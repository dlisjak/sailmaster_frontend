import axios from "axios";
import { BACKEND_URL, BACKEND_URL2 } from "../constants/api";

export const searchDestinations = async (term) => {
  const response = await axios.get(BACKEND_URL + "destinations/search/", {
    params: {
      term,
    },
  });
  return response.data;
};

export const searchUrl = (search) => `${BACKEND_URL}search/${search}`;

export const searchOffers = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

export const getOffer = async (id) => {
  const response = await axios.get(`${BACKEND_URL}search/${id}/`);
  return response.data;
};


export const getYachtOffer = async (id) => {
  const response = await axios.get(`${BACKEND_URL}yacht-offer/${id}/`);
  return response.data;
};

export const getDestinations = async (lang, frontpage = false) => {
  const response = await axios.get(BACKEND_URL2 + "destinations/", {
    params: {
      lang,
      frontpage,
    },
  });
  return response.data;
};


export const getFeaturedYachts = async (lang) => {
  const response = await axios.get(BACKEND_URL + "featured-yachts/", {
    params: {
      lang,
    }
  });
  return response.data;
};

