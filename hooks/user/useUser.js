/* eslint-disable import/prefer-default-export */
import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import fetcher from "../fetcher";

const useUser = ({ redirectTo, redirectIfFound } = {}) => {
  const { data, error } = useSWR("/api/user", fetcher("user"));
  const user = data ?? null;
  const finished = Boolean(data);
  const hasUser = Boolean(user);

  useEffect(() => {
    if (!redirectTo || !finished) return;
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasUser) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasUser)
    ) {
      Router.push(redirectTo);
    }
  }, [redirectTo, redirectIfFound, finished, hasUser]);

  return error ? null : user;
};

export { useUser };
