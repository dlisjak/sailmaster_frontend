import useSWR from "swr";

import { getWishlistFromLocalStorage } from "../utils/wishlistUtils";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const useFeaturedYachts = (lang = "si") => {
  const { data, error } = useSWR(`/api/featured-yachts?lang=${lang}`, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    featuredYachts: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useDestinations = (lang = "si") => {
  const { data, error } = useSWR(`/api/destinations?lang=${lang}`, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    destinations: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useSearchDestinations = () => {
  const { data, error } = useSWR(`/api/destinations/search`, fetcher, {
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
    wishlist: data,
    isLoading: !error && !data,
    isError: error,
    mutateWishlist: mutate,
  };
};
