import { useState, useEffect, useRef } from "react";

export const apiFunc = async (
  func,
  setData,
  setIsLoading,
  setError,
  ...params
) => {
  setError(undefined);
  try {
    setIsLoading(true);
    const data = await func(...params);
    setData(data);
  } catch (e) {
    setError(e);
  } finally {
    setIsLoading(false);
  }
};

export const useAPI = (func, ...params) => {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    apiFunc(func, setData, setIsLoading, setError, ...params);
  }, [func, ...params]); // eslint-disable-line

  return {
    data,
    isLoading,
    error,
    retry: () => apiFunc(func, setData, setIsLoading, setError, ...params),
  };
};

export const useAsyncReference = (value, isProp = false) => {
  const ref = useRef(value);
  const [, forceRender] = useState(false);

  function updateState(newState) {
    ref.current = newState;
    forceRender(s => !s);
  }

  if (isProp) {
    ref.current = value;
    return ref;
  }

  return [ref, updateState];
}