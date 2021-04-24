/* eslint-disable import/prefer-default-export */
import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import fetcher from "../fetcher";

const useLevel = ({ levelId, redirectTo, redirectIfUnauthorized } = {}) => {
  const { data, error } = useSWR(`/api/level/${levelId}`, fetcher());
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

  return error ? null : levels;
};

export { useLevel };
