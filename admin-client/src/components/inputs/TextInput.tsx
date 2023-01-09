import React, { ChangeEvent, FC, useContext, useEffect } from "react";
import ArticleContext from "../../store/article-context";
import { TextInputPropType } from "../../types";

const TextInput: FC<TextInputPropType> = ({
  labelPlaceholder,
  inputName,
  hasError,
  isTextarea = false,
}) => {
  const articleContext = useContext(ArticleContext);

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
      {hasError && (
        <h1 className="add-articles__error-message">Field Required!</h1>
      )}
    </>
  );
};

export default TextInput;
