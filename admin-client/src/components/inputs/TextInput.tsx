import React, { ChangeEvent, FC, useContext, useEffect } from "react";
import ArticleContext from "../../store/article-context";
import { ErrorType, TextInputPropType } from "../../types";
import InputErrorUI from "../UI/InputErrorUI";

const TextInput: FC<TextInputPropType> = ({
  labelPlaceholder,
  inputName,
  isTextarea = false,
}) => {
  const articleContext = useContext(ArticleContext);
  const inputErrors = articleContext?.inputErrors as ErrorType[];
  // conditionally store an input type if it's a textarea or not
  const inputComponent = isTextarea ? (
    <textarea
      className="add-articles__input-field"
      name={inputName}
      placeholder={labelPlaceholder}
      value={
        articleContext?.articleDetails[
          inputName as keyof typeof articleContext.articleDetails
        ]
      }
      onChange={articleContext?.onInputChangeHandler}
      autoComplete="off"
    />
  ) : (
    <input
      className="add-articles__input-field"
      name={inputName}
      type="text"
      placeholder={labelPlaceholder}
      value={
        articleContext?.articleDetails[
          inputName as keyof typeof articleContext.articleDetails
        ]
      }
      onChange={articleContext?.onInputChangeHandler}
      autoComplete="off"
    />
  );

  return (
    <>
      <label className="add-articles__category-label" htmlFor="category">
        {labelPlaceholder}
        {inputComponent}
      </label>
      {inputErrors?.findIndex((err) => err.for === inputName) > -1 && (
        <InputErrorUI />
      )}
    </>
  );
};

export default TextInput;
