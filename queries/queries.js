import useSWR from "swr";

import { getWishlistFromLocalStorage } from "../utils/wishlistUtils";
import { getSearchResultsFromApi } from "./getters";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const useFeaturedYachts = () => {
  const { data, error } = useSWR(`/api/featured-yachts`, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    featuredYachts: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useDestinations = () => {
  const { data, error } = useSWR(`/api/destinations`, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    destinations: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useSearchDestinations = (term) => {
  const { data, error } = useSWR(`/api/destinations/search?term=${term}`, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    searchDestinations: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useCountriesEnquiry = () => {
  const { data, error } = useSWR("/api/countries-enquiry", fetcher, {
    revalidateOnFocus: false,
  });

  return {
    countriesEnquiry: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useYachtTypes = () => {
  const { data, error } = useSWR(`/api/yacht-types`, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    yachtTypes: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useYachtBrands = () => {
  const { data, error } = useSWR(`/api/yacht-brands`, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    yachtBrands: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useYachtModels = (builderId) => {
  const { data, error } = useSWR(`/api/yacht-models/?builderId=${builderId}`, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    yachtModels: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useTestimonials = () => {
  const { data, error } = useSWR(`/api/testimonials`, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    testimonials: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useWishlist = () => {
  const { data, mutate, error } = useSWR("localWishlist", getWishlistFromLocalStorage);

  return {
    wishlist: data || [],
    isLoading: !error && !data,
    isError: error,
    mutateWishlist: mutate,
  };
};

export const useWishlistApi = (ids) => {
  const { data, mutate, error } = useSWR(`/api/wishlist?ids=${ids}`, getWishlistFromLocalStorage);

  return {
    wishlist: data,
    isLoading: !error && !data,
    isError: error,
    mutateWishlist: mutate,
  };
};

export const useSearch = (search) => {
  const { data, error } = useSWR(search, () => getSearchResultsFromApi(search), { revalidateOnFocus: false });

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useBlogLatest = () => {
  const { data, error } = useSWR("/api/blog", fetcher, { revalidateOnFocus: false });

  return {
    posts: data?.results,
    isLoading: !error && !data,
    isError: error,
  };
};
