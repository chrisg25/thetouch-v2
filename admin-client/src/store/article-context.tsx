import React, { useEffect, useState, FC, ChangeEvent } from "react";
import { ArticleContextType, ArticleType, PhotoType } from "../types";
import { v4 as uuid } from "uuid";

const ArticleContext = React.createContext<ArticleContextType | null>(null);

export const ArticleContextProvider: FC<{ children: any }> = ({ children }) => {
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
  const [articlePhotos, setArticlePhotos] = useState<PhotoType[]>();
  const [hasCustomDate, setHasCustomDate] = useState<boolean>(false);

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

  // TO BE ADDED
  // const onAddPhotos = (event: ChangeEvent<HTMLInputElement>) => {};

  return (
    <ArticleContext.Provider
      value={{
        articleDetails,
        hasCustomDate,
        onInputChangeHandler,
        onDropdownItemSelectedHandler,
        onToggleHasCustomDateHandler,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
};

export default ArticleContext;
