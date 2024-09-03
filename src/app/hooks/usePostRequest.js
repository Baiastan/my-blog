"use client";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useEndPoint } from "./useEndPoint";

export const usePostRequest = (endPoint, data) => {
  const [error, setError] = useState(null);
  const [responseValue, setResponseValue] = useState("");
  const { url } = useEndPoint(endPoint);

  const mutation = useMutation(
    async (data) => {
      const response = await fetch(url, {
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
        throw new Error(responseData.error);
      }

      return responseData;
    },
    {
      onSuccess: (data) => {
        setResponseValue(data);
      },
      onError: (error) => {
        setError(error.message);
      },
    }
  );

  const handleClick = () => {
    if (!data || data.trim().length === 0) {
      setError("Input cannot be empty");
      return;
    }
    setResponseValue("");
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
