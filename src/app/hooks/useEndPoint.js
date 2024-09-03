import { useMemo } from "react";

export const useEndPoint = (endpoint) => {
  const apiUrl = useMemo(() => {
    const envApiUrl =
      process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_DEV_API : process.env.NEXT_PUBLIC_PROD_API;

    return `${envApiUrl}${endpoint}`;
  }, [endpoint]);

  return { url: apiUrl };
};
