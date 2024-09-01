"use client";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";

export const usePostRequest = (endPoint, data) => {
  const [error, setError] = useState(null);
  const [responseValue, setResponseValue] = useState("");
  const [apiUrl, setApiUrl] = useState("");

  useEffect(() => {
    const envApiUrl =
      process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_DEV_API : process.env.NEXT_PUBLIC_PROD_API;

    setApiUrl(`${envApiUrl}${endPoint}`);
  }, [endPoint]);

  const mutation = useMutation(
    async (data) => {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const responseData = await response.json();

      if (responseData.error) {
        throw new Error(error.message);
      }

      return responseData;
    },
    {
      onSuccess: (data) => {
        setResponseValue(data); // Assuming the server sends back JSON data
      },
      onError: (error) => {
        setError(error.message);
      },
    }
  );

  const handleClick = () => {
    if (!data) return;
    setResponseValue(""); // Clear previous response
    setError(null);
    mutation.mutate(data);
  };

  return {
    response: responseValue,
    isLoading: mutation.isLoading,
    error,
    handleClick,
  };
};
