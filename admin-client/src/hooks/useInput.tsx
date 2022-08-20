import dayjs from "dayjs";
import React, { ChangeEvent, useState } from "react";
import { v4 as uuid } from "uuid";
interface AddArticleInputValuesTypes {
  category: string;
  headline: string;
  body: string;
  authored_by_id: number;
  authored_by: string;
  graphics_by_id: number;
  graphics_by: string;
  date?: string | null;
  time?: string | null;
  photos: PhotoType[];
  createdAt?: string | null;
}

interface PhotoType {
  id: string;
  photo: string;
}

const useInput = () => {
  const [articleDetails, setArticleDetails] =
    useState<AddArticleInputValuesTypes>({
      category: "",
      body: "",
      headline: "",
      authored_by: "",
      graphics_by: "",
      authored_by_id: 0,
      graphics_by_id: 0,
      date: null,
      time: null,
      photos: [] as PhotoType[],
    });

  const [isDropdownShowed, setIsDropdownShowed] = useState<boolean>(false);

  const detailsInputHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setArticleDetails((prevDetails) => ({
      ...prevDetails,
      [e.target.name]: e.target.value,
    }));
  };

  const fileInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    if (event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = () => {
        setArticleDetails((prevDetails) => ({
          ...prevDetails,
          photos: [
            ...prevDetails.photos,
            {
              id: uuid(),
              photo: reader.result,
            },
          ] as any,
        }));
      };
    }
  };

  const dateTimeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setArticleDetails((prevState) => {
      let inputValue;
      if (e.target.type === "date") {
        inputValue = dayjs(e.target.value).format("YYYY-MM-DD");
      }
      if (e.target.type === "time") {
        inputValue = dayjs(`June 18, 1999 ${e.target.value}`).format(
          "HH:mm:ss"
        );
      }
      return {
        ...prevState,
        [e.target.name]: inputValue,
      };
    });
  };

  const setSelectedOption = (name: string, value: string, id: number) => {
    setArticleDetails((prevState) => ({
      ...prevState,
      [name]: value,
      [`${name}`.concat("_id")]: id,
    }));
  };

  const removePhotoHandler = (id: string) => {
    setArticleDetails((prevState) => ({
      ...prevState,
      photos: prevState.photos.filter((photo) => photo.id !== id),
    }));
  };

  return {
    articleDetails,
    detailsInputHandler,
    setSelectedOption,
    fileInputHandler,
    removePhotoHandler,
    dateTimeInputHandler,
  };
};

export default useInput;
