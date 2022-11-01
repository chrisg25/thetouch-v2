import React, { ChangeEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { ArticleType, PhotoType } from "../types";

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

  const { pathname, state } = useLocation();
  // state for showing custom date and time input
  const [hasCustomDate, setHasCustomDate] = useState<boolean>(false);
  useEffect(() => {
    // Fetch Article Details to be edited
    setArticleDetails((prevState) => ({
      ...prevState,
      ...(state as ArticleType),
    }));
  }, [pathname, state]);

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

  const onHasCustomDateHandler = () => {
    setHasCustomDate((prevState) => !prevState);
  };

  const onClearInputFields = () => {
    setArticleDetails((prevDetails) => ({
      ...prevDetails,
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
    }));
  };

  return {
    articleDetails,
    hasCustomDate,
    onInputChangeHandler,
    onSelectedItemHandler,
    onRemovePhoto,
    onClearDateTimeValues,
    onHasCustomDateHandler,
    onClearInputFields,
  };
};

export default useInputHandler;
