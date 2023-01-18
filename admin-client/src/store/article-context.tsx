import React, { useEffect, useState, FC, ChangeEvent } from "react";
import {
  ArticleContextType,
  ArticleType,
  ErrorType,
  PhotoType,
} from "../types";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";

const ArticleContext = React.createContext<ArticleContextType | null>(null);

export const ArticleContextProvider: FC<{ children: any }> = ({ children }) => {
  // Article-Context specific states
  const [articleDetails, setArticleDetails] = useState<ArticleType>({
    category: "",
    headline: "",
    body: "",
    authored_by: "",
    authored_by_id: undefined,
    graphics_by: "",
    graphics_by_id: undefined,
    date: "",
    time: "",
  });
  const [articlePhotos, setArticlePhotos] = useState<Array<PhotoType>>([]);
  const [hasCustomDate, setHasCustomDate] = useState<boolean>(false);
  const [inputErrors, setInputErrors] = useState<ErrorType[]>([]);
  const [isSuccessfulUpload, setIsSuccessfulUpload] = useState<boolean>(false);
  const [isAddingArticle, setIsAddingArticle] = useState<boolean>(false);
  const [showUploadResultPrompt, setShowUploadResultPrompt] =
    useState<boolean>(false);

  // START - Input Error Related Methods
  const onErrorOccured = (errorDetails: ErrorType) => {
    setInputErrors((prevState) => {
      const idx = prevState.findIndex((errs) => errs.for === errorDetails.for);
      if (idx > -1) {
        return prevState;
      } else {
        return [...prevState, errorDetails];
      }
    });
  };

  const onRemoveError = (errorFor: string) => {
    setInputErrors((prevErrors) => [
      ...prevErrors.filter((error) => error.for !== errorFor),
    ]);
  };
  // END - Input Error Related Methods

  const inputValidator = (): boolean => {
    let isValidated = true;
    for (const detail in articleDetails) {
      if (hasCustomDate && (detail === "time" || detail === "date")) {
        if (articleDetails[detail]?.toString().trim() === "") {
          onErrorOccured({
            for: detail,
            message: "Field Required!",
          });
          isValidated = false;
        }
      } else {
        if (
          articleDetails[detail as keyof typeof articleDetails]
            ?.toString()
            .trim() === ""
        ) {
          onErrorOccured({
            for: detail,
            message: "Field Required!",
          });
          isValidated = false;
        }
      }
    }
    return isValidated;
  };

  // For TextInput.tsx
  const onInputChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setArticleDetails((prevDetails) => ({
      ...prevDetails,
      [event.target.name]: event.target.value,
    }));
  };

  // For DropdownSelectIputHandler.tsx
  const onDropdownItemSelectedHandler = (
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

  // For DateTimeInput.tsx
  const onToggleHasCustomDateHandler = () => {
    setHasCustomDate((prevState) => !prevState);
  };

  // For PhotoInpout.tsx
  const onAddPhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const reader = new FileReader();
    if (target.files !== null) {
      reader.readAsDataURL(target.files[0]);
      reader.onloadend = () => {
        setArticlePhotos(
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
  };

  // For PhotoInpout.tsx
  const onRemovePhoto = (id: string) => {
    setArticlePhotos((prevState) =>
      prevState.filter((photo) => photo.id !== id)
    );
  };

  const onClearInputFields = () => {
    setArticleDetails((prevDetails) => ({
      ...prevDetails,
      category: "",
      headline: "",
      body: "",
      authored_by: "",
      graphics_by: "",
      date: "",
      time: "",
    }));
  };

  const onAddArticle = async () => {
    const token = localStorage.getItem("admin_token_tt");
    const isValidated = inputValidator();
    if (isValidated) {
      let body = {
        ...articleDetails,
        photos: articlePhotos.map((photo) => photo.url),
        createdAt: hasCustomDate
          ? dayjs(`${articleDetails.date} ${articleDetails.time}`).format(
              "YYYY-MM-DD hh:mm"
            )
          : dayjs().format("YYYY-MM-DD hh:mm"),
      };
      delete body.date;
      delete body.time;
      try {
        setIsAddingArticle((prevState) => !prevState);
        const response = await fetch("http://localhost:5000/articles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });
        if (response.status === 201) {
          setIsSuccessfulUpload((prevState) => true);
        }
      } catch (error) {
        setIsSuccessfulUpload((prevState) => false);
      } finally {
        setIsAddingArticle((prevState) => false);
        setTimeout(() => {
          setShowUploadResultPrompt((prevState) => !prevState);
          onClearInputFields();
        }, 4000);
        setShowUploadResultPrompt((prevState) => !prevState);
      }
    } else {
      return;
    }
  };

  return (
    <ArticleContext.Provider
      value={{
        articleDetails,
        articlePhotos,
        hasCustomDate,
        inputErrors,
        isSuccessfulUpload,
        isAddingArticle,
        showUploadResultPrompt,
        onInputChangeHandler,
        onClearInputFields,
        onDropdownItemSelectedHandler,
        onToggleHasCustomDateHandler,
        onAddPhoto,
        onRemovePhoto,
        onAddArticle,
        onErrorOccured,
        onRemoveError,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
};

export default ArticleContext;
