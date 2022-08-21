import React, { ChangeEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuid } from "uuid";

interface ArticleType {
  category: "";
  headline: string;
  body: string;
  authored_by: string;
  authored_by_id: number | null;
  graphics_by: string;
  graphics_by_id: number | null;
  photos: PhotoType[];
  date?: string;
  time?: string;
}

interface PhotoType {
  id: string;
  url: string;
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
  });
  const { pathname } = useLocation();

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
    }
  };

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

  return {
    articleDetails,
    onInputChangeHandler,
    onSelectedItemHandler,
    onRemovePhoto,
  };
};

export default useInputHandler;
