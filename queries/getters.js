import axios from "axios";

export const getFromApi = async (url) => {
  return await axios.get(url);
}

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

export const getYachtModels = async (builderId = null) => {
  const lang = process.env.NEXT_PUBLIC_REACT_APP_LANGUAGE;
  const url = process.env.NEXT_PUBLIC_API_URL + `${builderId !== "undefined" ? `/yacht-models/?yacht__yacht_model__builder=${builderId}` : "/yacht_models"}`;

  const res = await axios.get(url, {
    params: {
      lang,
    },
  });

  const array = res.data.results || res.data;

  return array.map(item => ({ value: item.id, label: item.name }))
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

export const getYachtOffer = async (yachtId) => {
  const url = process.env.NEXT_PUBLIC_API_URL + '/yacht-offer/' + yachtId + "/";

  const { data } = await axios.get(url);

  return data;
};

export const getOffer = async (offerId) => {
  const url = process.env.NEXT_PUBLIC_API_URL + '/offers/' + offerId + "/";

  const { data } = await axios.get(url);

  return data;
};

export const getAllYachts = async (offset = 0) => {
  const limit = 10;
  const url = process.env.NEXT_PUBLIC_API_URL + `/yachts/?limit=${limit}&offset=${offset}`;

  const { data } = await axios.get(url);

  return data;
};

export const getBlogs = async (limit) => {
  const url = process.env.NEXT_PUBLIC_API_URL + `/blog${limit ? "?limit=" + limit : ""}`;

  const { data } = await axios.get(url);

  return data;
}

export const getBlog = async (slug) => {
  const url = process.env.NEXT_PUBLIC_API_URL + `/blog/slug/${slug}`;

  const { data } = await axios.get(url);

  return data;
}

export const getWishlist = async (wishlistIds) => {
  const url = process.env.NEXT_PUBLIC_API_URL + `/offers/wishlist`;

  const { data } = await axios.get(url, { params: { ids: wishlistIds } })

  return data;
}

export const getSearchResults = async (search) => {
  const url = search;

  return await axios.get(url);
};

export const getSearchResultsFromApi = async (search = "") => {
  const idx = search?.indexOf("?");
  const query = search?.substring(idx);

  const url = `${process.env.NEXT_PUBLIC_API_URL}/search/${idx > 0 ? query : ""}${idx > 0 ? "&limit=20" : "?limit=20"}`;

  return await axios.get(url);
};
