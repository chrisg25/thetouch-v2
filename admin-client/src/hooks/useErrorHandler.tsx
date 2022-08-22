import { useState } from "react";
import { ErrorType } from "../types";

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
