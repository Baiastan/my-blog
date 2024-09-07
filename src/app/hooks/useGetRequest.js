"use client";
import { useState } from "react";
import { useQuery } from "react-query";
import { useEndPoint } from "./useEndPoint";

export const useGetRequest = (endPoint) => {
  const [error, setError] = useState(null);
  const [responseValue, setResponseValue] = useState("");
  const { url } = useEndPoint(endPoint);

  const {
    isLoading,
    data,
    error: queryError,
    refetch,
  } = useQuery(
    ["getRequest", url],
    async () => {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const responseData = await response.json();

      if (responseData.error) {
        throw new Error(responseData.error);
      }

      return responseData;
    },
    {
      enabled: false, // Disable automatic fetching, can call refetch manually
      onSuccess: (data) => {
        setResponseValue(data);
      },
      onError: (error) => {
        setError(error.message);
      },
    }
  );

  const handleClick = () => {
    setResponseValue("");
    setError(null);
    refetch(); // Trigger the GET request manually
  };

  return {
    response: responseValue || data,
    isLoading,
    error: error || queryError?.message,
    handleClick,
  };
};
