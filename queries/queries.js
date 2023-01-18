import useSWR from "swr";

import { getWishlistFromLocalStorage } from "../utils/wishlistUtils";

const fetcher = (...args) => fetch(...args).then(res => res.json())

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

export const useCountriesEnquiry = () => {
  const { data, error } = useSWR("/api/countries-enquiry", fetcher);

  return {
    countriesEnquiry: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const useYachtTypes = (lang = "si") => {
  const { data, error } = useSWR(`/api/yacht-types?lang=${lang}`, fetcher);

  return {
    yachtTypes: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const useSearch = (search) => {
  const { data, error } = useSWR(`/api/search?${search}`, fetcher);

  return {
    yachtTypes: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const useWishlist = () => {
  const { data, error } = useSWR("localWishlist", getWishlistFromLocalStorage);

  return {
    wishlist: data,
    isLoading: !error && !data,
    isError: error,
  }
}

