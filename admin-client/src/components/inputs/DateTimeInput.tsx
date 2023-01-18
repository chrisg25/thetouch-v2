import React, { useContext, useState } from "react";
import ArticleContext from "../../store/article-context";
import InputErrorUI from "../UI/InputErrorUI";
import { ErrorType } from "../../types/index";

const DateTimeInput = () => {
  const articleContext = useContext(ArticleContext);
  const inputErrors = articleContext?.inputErrors as ErrorType[];
  const onClickCheckboxHandler = () => {
    // might add another function to clear date fields
    articleContext?.onToggleHasCustomDateHandler();
  };

  return (
    <>
      <label className="add-articles__category-label" htmlFor="checkbox">
        <input
          id="checkbox"
          name="checkboxx"
          type="checkbox"
          style={{ marginRight: "10px", marginTop: "4px" }}
          onClick={onClickCheckboxHandler}
          autoComplete="off"
        />
        Add custom date and time instead?
      </label>
      {articleContext?.hasCustomDate && (
        <>
          <div>
            <label className="add-articles__category-label" htmlFor="date">
              Date
              <input
                name="date"
                className="add-articles__input-field"
                type="date"
                onChange={articleContext?.onInputChangeHandler}
                value={articleContext?.articleDetails.date}
                onFocus={() => articleContext?.onRemoveError("date")}
                style={{ display: "block" }}
                autoComplete="off"
              />
            </label>
            {inputErrors?.findIndex((err) => err.for === "date") > -1 && (
              <InputErrorUI />
            )}
          </div>
          <div>
            <label className="add-articles__category-label" htmlFor="time">
              Time
              <input
                name="time"
                type="time"
                className="add-articles__input-field"
                onChange={articleContext?.onInputChangeHandler}
                value={articleContext?.articleDetails.time}
                onFocus={() => articleContext?.onRemoveError("time")}
                style={{ display: "block" }}
                autoComplete="off"
              />
              {inputErrors?.findIndex((err) => err.for === "date") > -1 && (
                <InputErrorUI />
              )}
            </label>
          </div>
        </>
      )}
    </>
  );
};

export default DateTimeInput;
