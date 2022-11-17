import React, { useEffect, useState } from "react";

export default function useFetch() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [statusCode, setStatusCode] = useState<number | undefined>();

  const token = localStorage.getItem("admin_token_tt");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const customFetch = async (url: string, method: string, body?: any) => {
    try {
      setIsLoading((prevState) => !prevState);
      const response = await fetch(url, {
        method: method.toUpperCase(),
        headers,
      });

      setStatusCode(response.status);
      console.log(response.status, "status code from hook");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading((prevState) => false);
      return {
        isLoading,
        data,
        statusCode,
        customFetch,
        clearState,
      };
    }
  };

  const clearState = () => {
    setData(null);
  };
  return {
    customFetch,
  };
}
