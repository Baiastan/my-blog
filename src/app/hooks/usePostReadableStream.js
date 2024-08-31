"use client";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";

export const usePostReadableStream = (endPoint, data) => {
  const [error, setError] = useState(null);
  const [value, setValue] = useState("");
  const [apiUrl, setApiUrl] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const envApiUrl =
      process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_DEV_API : process.env.NEXT_PUBLIC_PROD_API;

    setApiUrl(`${envApiUrl}${endPoint}`);
  }, [endPoint]);

  const mutation = useMutation(
    async (newMessages) => {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: newMessages }),
      });

      if (!response.ok) {
        throw new Error("Failed to stream response");
      }

      setIsDisabled(true);

      return response.body;
    },
    {
      onSuccess: async (body) => {
        const reader = body.pipeThrough(new TextDecoderStream()).getReader();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          setValue((prev) => prev + value);
        }

        setTimeout(() => {
          setIsDisabled(false);
        }, 10000);
      },
      onError: (error) => {
        setError(error.message);
      },
    }
  );

  const handleClick = async () => {
    if (!data || data.trim().length === 0) {
      setError("Input cannot be empty");
      return;
    }
    setValue("");
    setError(null);
    mutation.mutate(data);
  };

  return { stream: value, error, handleClick, disableAfterFirstResponse: isDisabled };
};
