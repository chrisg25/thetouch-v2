import dayjs from "dayjs";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
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
  const [addedPhotos, setAddedPhotos] = useState<PhotoType[]>([]);
  const [removedPhotos, setRemovedPhotos] = useState<Array<number>>([]);
  const [fetchError, setFetchError] = useState<boolean>(false);
  const [hasDetailChanges, setHasDetailChanges] = useState<boolean>(false);

  const location: any = useLocation();
  const params: any = useParams();
  const [hasCustomDate, setHasCustomDate] = useState<boolean>(false); // state for showing custom date and time input

  // Check if page is on edit mode, details has changes
  useEffect(() => {
    onChechHasDetailChanges();
  }, [articleDetails, addedPhotos, removedPhotos]);

  // Fetch Article Details to be edited
  useEffect(() => {
    const fetchdArticles = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/articles/${location?.state?.id}`
        );
        const data: ArticleType[] = await res.json();
        setArticleDetails((prevState) => ({
          ...prevState,
          ...(location.state as any),
          date: dayjs(params.action?.createdAt).format("YYYY-MM-DD").toString(),
          time: dayjs(params.state?.createdAt).format("hh:mm").toString(),
        }));
      } catch (error) {
        setFetchError((prevErr) => !prevErr);
      }
    };
    fetchdArticles();
  }, [location.pathname, location.state]);

  // Function for change handling
  const onInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.type === "file") {
      const target = e.target as HTMLInputElement;
      if (!target.files) {
        return;
      }
      const reader = new FileReader();
      if (target.files[0] && params.action === "add") {
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
      if (target.files[0] && params.action === "edit") {
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
          setAddedPhotos(
            (prevState) =>
              [
                ...prevState,
                {
                  id: uuid(),
                  url: reader.result,
                },
              ] as PhotoType[]
          );
        };
      }
    }

    if (e.target.type !== "file") {
      setArticleDetails((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  // Removes a photo from articleDetails.photo
  const onRemovePhoto = (photoId: number) => {
    setArticleDetails((prevState) => ({
      ...prevState,
      photos: prevState.photos.filter((photo) => +photo.id !== photoId),
    }));
    if (params.action === "edit") {
      setRemovedPhotos((prevState) => [...prevState, +photoId]);
    }
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

  const onChechHasDetailChanges = () => {
    const currentArticleDetails = location.state;
    for (const property in currentArticleDetails) {
      if (
        currentArticleDetails[property as keyof typeof location.state] !==
        articleDetails[property as keyof typeof articleDetails]
      ) {
        setHasDetailChanges((prevState) => !prevState);
      }
    }
  };

  return {
    articleDetails,
    hasCustomDate,
    removedPhotos,
    addedPhotos,
    hasDetailChanges,
    onInputChangeHandler,
    onSelectedItemHandler,
    onRemovePhoto,
    onClearDateTimeValues,
    onHasCustomDateHandler,
    onClearInputFields,
  };
};

export default useInputHandler;
