import axios from "axios";

import { postData } from "../api/base";

export const getFeaturedYachts = async (lang) => {
  const url = process.env.NEXT_PUBLIC_API_URL + '/featured-yachts/';

  return await axios.get(url, {
    params: {
      lang,
    },
  });
};

export const getDestinations = async (lang, frontpage = false) => {
  const url = process.env.NEXT_PUBLIC_API_URL_V2 + '/destinations/';

  return await axios.get(url, {
    params: {
      lang,
      frontpage,
    },
  });
};

export const getTestimonials = async (lang, limit = 4) => {
  const url = process.env.NEXT_PUBLIC_API_URL + '/testimonials/';

  return await axios.get(url, {
    params: {
      lang,
      limit,
    },
  });
}
export const getHomeBlogs = async (lang) => {
  const url = process.env.NEXT_PUBLIC_API_URL + '/blog/';

  return await axios.get(url, {
    params: {
      lang,
      limit: 3,
    },
  });
}

export const getSearchDestination = async (term) => {
  const url = process.env.NEXT_PUBLIC_API_URL + '/destinations/search';

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

export const getYachtTypes = async (lang) => {
  const url = process.env.NEXT_PUBLIC_API_URL + '/yacht_display_categories';

  const { data } = await axios.get(url, { params: { lang } });

  return data.map(item => ({ value: item.id, label: item.name.name }))
};

export const getSearchResults = async (search) => {
  const idx = search.indexOf("?");
  const query = search.substring(idx);

  const url = process.env.NEXT_PUBLIC_API_URL + `/search/${idx > 0 ? query : ""}`;

  return await axios.get(url);
};
