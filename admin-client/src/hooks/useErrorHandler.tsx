import { useState } from "react";

interface ErrorType {
  for: string;
  message: string;
}

const useErrorHandler = () => {
  const [errors, setErrors] = useState<ErrorType[]>([]);

  const onErrorOccured = (errorDetails: ErrorType) => {
    setErrors((prevState) => [...prevState, errorDetails]);
  };

  const onRemoveError = (errorFor: string) => {
    setErrors((prevErrors) => [
      ...prevErrors.filter((error) => error.for !== errorFor),
    ]);
  };

  return {
    errors,
    onErrorOccured,
    onRemoveError,
  };
};

export default useErrorHandler;
