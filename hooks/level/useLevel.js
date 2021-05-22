/* eslint-disable import/prefer-default-export */
import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import fetcher from "../fetcher";

const useLevel = ({ levelId, redirectTo, redirectIfUnauthorized } = {}) => {
  const { data, error } = useSWR(`/api/level/${levelId}`, fetcher(), {
    onErrorRetry: (_error, key, config, revalidate, { retryCount }) => {
      // Never retry on 404.
      if (_error.status === 404) return;

      // Never retry on 401.-> level is not authorized
      if (_error.status === 401) return;

      // Never retry for a specific key.
      // if (key === '/api/user') return

      // Only retry up to 5 times.
      if (retryCount >= 5) return;

      // Retry after 5 seconds.
      setTimeout(() => revalidate({ retryCount }), 5000);
    }
  });
  const levels = data ?? null;
  const level = data?.[0];

  const hasError = Boolean(error);
  const finished = Boolean(data || error);
  const hasLevel = Boolean(level);

  useEffect(() => {
    if (!redirectTo || !finished) return;
    if (redirectIfUnauthorized && hasError && error.status === 403) {
      Router.push(redirectTo);
    }
  }, [redirectTo, redirectIfUnauthorized, finished]);

  return { error, levelData: hasError ? null : levels };
};

export { useLevel };
