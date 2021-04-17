/* eslint-disable import/prefer-default-export */
import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import fetcher from "../fetcher";

const useLevel = ({ levelId } = {}) => {
  const { data, error } = useSWR(`/api/level/${levelId}`, fetcher());
  const levels = data ?? null;
  const level = data?.[0];

  const finished = Boolean(data);
  const hasLevel = Boolean(level);

  console.log(levels, finished, hasLevel);

  return error ? null : levels;
};

export { useLevel };
