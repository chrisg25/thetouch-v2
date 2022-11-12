import React, { useEffect, useState } from "react";

export default function useFetch(url: string, method: string, body?: any) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [statusCode, setStatusCode] = useState<number | undefined>();

  const token = localStorage.getItem("admin_token_tt");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    (async function () {
      try {
        setIsLoading((prevState) => !prevState);
        const response = await fetch(url, {
          method: method.toUpperCase(),
          headers,
        });
        const resData = await response.json();
        setData(resData);
        console.log(resData, "from custom hook");
        setStatusCode(response.status);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading((prevState) => false);
      }
    })();
  }, [url]);

  return {
    isLoading,
    data,
    statusCode,
  };
}
