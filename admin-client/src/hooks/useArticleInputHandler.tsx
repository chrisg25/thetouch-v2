import React, { ChangeEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuid } from "uuid";

interface ArticleType {
  category: string;
  headline: string;
  body: string;
  authored_by: string;
  authored_by_id: number | null;
  graphics_by: string;
  graphics_by_id: number | null;
  photos: PhotoType[];
  date?: string;
  time?: string;
  createdAt?: string;
  error?: string;
}

interface PhotoType {
  id: string;
  url: string;
}

interface ErrorType {
  for: string;
  message: string;
}

const useInputHandler = () => {
  const [articleDetails, setArticleDetails] = useState<ArticleType>({
    category: "",
    headline: "",
    body: "",
    authored_by: "",
    authored_by_id: null,
    graphics_by: "",
    graphics_by_id: null,
    photos: [],
    date: "",
    time: "",
  });
  const [errors, setErrors] = useState<ErrorType[]>([]);
  const { pathname } = useLocation();
  // state for showing custom date and time input
  const [hasCustomDate, setHasCustomDate] = useState<boolean>(false);
  useEffect(() => {
    // Fetch Article Details to be edited
  }, [pathname]);

  // Function for change handling
  const onInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.type === "file") {
      const target = e.target as HTMLInputElement;
      if (!target.files) {
        return;
      }
      if (target.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(target.files[0]);
        reader.onloadend = () => {
          setArticleDetails((prevDetails) => ({
            ...prevDetails,
            photos: [
              ...prevDetails.photos,
              {
                id: uuid(),
                url: reader.result,
              },
            ] as PhotoType[],
          }));
        };
      }
    } else {
      setArticleDetails((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
      setErrors((prevErrors) => [
        ...prevErrors.filter((err) => err.for !== e.target.name),
      ]);
    }
  };

  // Removes a photo from articleDetails.photo
  const onRemovePhoto = (photoId: string) => {
    setArticleDetails((prevState) => ({
      ...prevState,
      photos: prevState.photos.filter((photo) => photo.id !== photoId),
    }));
  };

  const onSelectedItemHandler = (
    inputName: string,
    name: string,
    id: number
  ) => {
    setArticleDetails((prevState) => ({
      ...prevState,
      [inputName]: name,
      [inputName.concat("_id")]: id,
    }));
  };

  const onClearDateTimeValues = () => {
    setArticleDetails((prevState) => ({
      ...prevState,
      date: "",
      time: "",
    }));
  };

  const onErrorOccured = (errorDetails: ErrorType) => {
    setErrors((prevState) => [...prevState, errorDetails]);
  };

  const onRemoveError = (errorFor: string) => {
    setErrors((prevErrors) => [
      ...prevErrors.filter((error) => error.for !== errorFor),
    ]);
  };

  const onHasCustomDateHandler = () => {
    setHasCustomDate((prevState) => !prevState);
  };

  return {
    articleDetails,
    errors,
    hasCustomDate,
    onInputChangeHandler,
    onSelectedItemHandler,
    onRemovePhoto,
    onClearDateTimeValues,
    onErrorOccured,
    onRemoveError,
    onHasCustomDateHandler,
  };
};

export default useInputHandler;
