import { useCallback, useState } from "react";

export const useHttp = () => {
  const [error1, setError] = useState(null);
  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      const response = await fetch(url, {
        method: method,
        headers: headers,
        body: body,
      });
      console.log(response);

      const responseData = await response.json();
   
      if (!response.ok) {
        setError({ message: responseData.message });
      }
      return { responseData, response };
    },
    []
  );
  const clearError = () => {
    setError(null);
  };
  return { error1, sendRequest, clearError };
};
