/* eslint-disable import/prefer-default-export */
import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import fetcher from "../fetcher";

const useLevels = ({
  redirectTo,
  redirectIfFound,
  redirectIfUnauthorized
} = {}) => {
  const { data, error } = useSWR("/api/level", fetcher("levels"));
  const levels = data ?? null;
  const finished = Boolean(data || error);
  const hasLevels = Boolean(levels);
  const hasError = Boolean(error);

  useEffect(() => {
    if (!redirectTo || !finished) return;
    if (redirectIfUnauthorized && hasError && error.statusCode === 403) {
      Router.push(redirectTo);
    }
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasLevels) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasLevels)
    ) {
      Router.push(redirectTo);
    }
  }, [redirectTo, redirectIfFound, finished, hasLevels]);

  return error ? null : levels;
};

export { useLevels };
