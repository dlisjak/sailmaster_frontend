import useSWR from "swr";

import { getWishlistFromLocalStorage } from "../utils/wishlistUtils";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const useFeaturedYachts = (lang = "si") => {
  const { data, error } = useSWR(`/api/featured-yachts?lang=${lang}`, fetcher);

  return {
    featuredYachts: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useDestinations = (lang = "si") => {
  const { data, error } = useSWR(`/api/destinations?lang=${lang}`, fetcher);

  return {
    destinations: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useSearchDestinations = () => {
  const { data, error } = useSWR(`/api/destinations/search`, fetcher);

  return {
    searchDestinations: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useCountriesEnquiry = () => {
  const { data, error } = useSWR("/api/countries-enquiry", fetcher);

  return {
    countriesEnquiry: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useYachtTypes = () => {
  const { data, error } = useSWR(`/api/yacht-types`, fetcher);

  return {
    yachtTypes: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useYachtBrands = () => {
  const { data, error } = useSWR(`/api/yacht-brands`, fetcher);

  return {
    yachtBrands: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useSearch = (search) => {
  const { data, error } = useSWR(`/api/search?${search}`, fetcher);

  return {
    yachtTypes: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useTestimonials = () => {
  const { data, error } = useSWR(`/api/testimonials`, fetcher);

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
