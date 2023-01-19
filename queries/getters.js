import axios from "axios";

import { postData } from "../api/base";

export const getFeaturedYachts = async () => {
  const lang = process.env.NEXT_PUBLIC_REACT_APP_LANGUAGE;
  const url = process.env.NEXT_PUBLIC_API_URL + '/featured-yachts/';

  const { data } = await axios.get(url, {
    params: {
      lang,
    },
  });

  return data;
};

export const getDestinations = async (frontpage = false) => {
  const lang = process.env.NEXT_PUBLIC_REACT_APP_LANGUAGE;
  const url = process.env.NEXT_PUBLIC_API_URL_V2 + '/destinations/';

  const { data } = await axios.get(url, {
    params: {
      lang,
      frontpage,
    },
  });

  return data;
};

export const getSearchDestinations = async (term) => {
  const url = process.env.NEXT_PUBLIC_API_URL + '/destinations/search';

  return await axios.get(url, {
    params: {
      term
    },
  });
};

export const getTestimonials = async (limit) => {
  const url = process.env.NEXT_PUBLIC_API_URL + '/testimonials/';
  const lang = process.env.NEXT_PUBLIC_REACT_APP_LANGUAGE;

  const { data } = await axios.get(url, {
    params: {
      lang,
      limit,
    },
  });

  return data;
}
export const getHomeBlogs = async () => {
  const lang = process.env.NEXT_PUBLIC_REACT_APP_LANGUAGE;
  const url = process.env.NEXT_PUBLIC_API_URL + '/blog/';

  const { data } = await axios.get(url, {
    params: {
      lang,
      limit: 3,
    },
  });

  return data;
}

export const getSearchDestination = async (term) => {
  const url = process.env.NEXT_PUBLIC_API_URL + '/destinations/search/';

  return await axios.get(url, {
    params: {
      term,
    },
  });
};

export const getCountriesEnquiries = async (payload) => {
  const url = process.env.NEXT_PUBLIC_API_URL + '/countries_enquiry';

  return await axios.get(url);
};

export const getYachtTypes = async () => {
  const lang = process.env.NEXT_PUBLIC_REACT_APP_LANGUAGE;
  const url = process.env.NEXT_PUBLIC_API_URL + '/yacht_display_categories';

  const { data } = await axios.get(url, { params: { lang } });

  return data.map(item => ({ value: item.id, label: item.name.name }))
};

export const getYachtBrands = async () => {
  const url = process.env.NEXT_PUBLIC_API_URL + '/yacht_builders';

  const { data } = await axios.get(url);

  return data.map(item => ({ value: item.id, label: item.name }))
};

export const getSearchResults = async (search) => {
  const idx = search?.indexOf("?");
  const query = search?.substring(idx);

  const url = process.env.NEXT_PUBLIC_API_URL + `/search/${idx > 0 ? query : ""}`;

  return await axios.get(url);
};
