import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then(res => res.json())

export const useFeaturedYachts = (lang = "si") => {
  const { data, error } = useSWR(`/api/featured-yachts?lang=${lang}`, fetcher);

  return {
    featuredYachts: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useDestinations = (lang = "si", frontpage) => {
  const { data, error } = useSWR(`/api/destinations?lang=${lang}`, fetcher);

  return {
    destinations: data,
    isLoading: !error && !data,
    isError: error,
  };
};


