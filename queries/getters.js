import axios from "axios";

export const getFeaturedYachts = async (lang) => {
  const url = process.env.NEXT_PUBLIC_API_URL + '/featured-yachts/';

  return await axios.get(url, {
    params: {
      lang,
    },
  });
};

export const getDestinations = async (lang, frontpage = false) => {
  const url = process.env.NEXT_PUBLIC_API_URL + '/destinations/';

  return await axios.get(url, {
    params: {
      lang,
      frontpage,
    },
  });
};

export const getSearchDestination = async (term) => {
  const url = process.env.NEXT_PUBLIC_API_URL + '/destinations/search';

  return await axios.get(url, {
    params: {
      term,
    },
  });
};
