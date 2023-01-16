import React, { useEffect, useState, FC, ChangeEvent } from "react";
import {
  ArticleContextType,
  ArticleType,
  ErrorType,
  PhotoType,
} from "../types";
import { v4 as uuid } from "uuid";
import useErrorHandler from "../hooks/useErrorHandler";
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

  // START - Input Related Methods
  const onErrorOccured = (errorDetails: ErrorType) => {
    setInputErrors((prevState) => [...prevState, errorDetails]);
  };

  const onRemoveError = (errorFor: string) => {
    setInputErrors((prevErrors) => [
      ...prevErrors.filter((error) => error.for !== errorFor),
    ]);
  };
  // END - Input Related Methods

  const inputValidator = (): boolean => {
    let isValidated = true;
    for (const detail in articleDetails) {
      if (hasCustomDate && (detail === "time" || detail === "date")) {
        console.log("triggered datetime?");
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

  const onAddArticle = async () => {
    console.log("wtf");
    const isValidated = inputValidator();
  };

  return (
    <ArticleContext.Provider
      value={{
        articleDetails,
        articlePhotos,
        hasCustomDate,
        inputErrors,
        onInputChangeHandler,
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
