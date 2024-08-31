"use client";
import { useState } from "react";
import { useMutation } from "react-query";

export const usePostReadableStream = (apiUrl, data) => {
  const [error, setError] = useState(null);
  const [value, setValue] = useState("");

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
      },
      onError: (error) => {
        setError(error.message);
      },
    }
  );

  const handleClick = async () => {
    if (!data) return;
    setValue("");
    mutation.mutate(data);
  };

  return { stream: value, error, handleClick };
};
