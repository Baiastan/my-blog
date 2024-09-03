"use client";
import { useState } from "react";
import { useMutation } from "react-query";
import { useEndPoint } from "./useEndPoint";

export const usePostReadableStream = (endPoint, data, setData) => {
  const [error, setError] = useState(null);
  const [value, setValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const { url } = useEndPoint(endPoint);

  const mutation = useMutation(
    async ({ newMessages, params = {} }) => {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: newMessages, params }),
      });

      if (!response.ok && response.status === 429) {
        throw new Error("You have exceeded the number of allowed requests to gpt. Please try again later.");
      }

      if (!response.ok) {
        throw new Error("Failed to stream response");
      }

      setIsDisabled(true);

      return response.body;
    },
    {
      onSuccess: async (body) => {
        const reader = body.getReader();
        const decoder = new TextDecoder();
        let done = false;
        while (!done) {
          const { done: doneReading, value } = await reader.read();
          done = doneReading;
          const chunkValue = decoder.decode(value);
          setValue((prev) => prev + chunkValue);
        }

        setTimeout(() => {
          setData("");
          setIsDisabled(false);
        }, 10000);
      },
      onError: (error) => {
        setError(error.message);
      },
    }
  );

  const handleClick = async (params = {}) => {
    if (!data || data.trim().length === 0) {
      setError("Input cannot be empty");
      setValue("");
      return;
    }
    setValue("");
    setError(null);
    mutation.mutate({ newMessages: data, params });
  };

  return { stream: value, error, handleClick, disableAfterFirstResponse: isDisabled, isLoading: mutation.isLoading };
};

//https://vercel.com/blog/gpt-3-app-next-js-vercel-edge-functions#the-frontend
