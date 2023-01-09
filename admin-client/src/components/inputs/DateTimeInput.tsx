import React, { useContext, useState } from "react";
import ArticleContext from "../../store/article-context";

const DateTimeInput = () => {
  const [hasCustomDate, setHasCustomDate] = useState<boolean>(false);
  const articleContext = useContext(ArticleContext);

  const onClickCheckboxHandler = () => {
    // might add another function to clear date fields
    setHasCustomDate((prevState) => !prevState);
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
      {hasCustomDate && (
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
                // onFocus={() => onRemoveError("date")}
                style={{ display: "block" }}
                autoComplete="off"
              />
            </label>
            {/* {hasCustomDate &&
              errors.findIndex((err) => err.for === "date") > -1 && (
                <h1 className="add-articles__error-message">Field Required!</h1>
              )} */}
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
                // onFocus={() => onRemoveError("time")}
                style={{ display: "block" }}
                autoComplete="off"
              />
              {/* {hasCustomDate &&
                errors.findIndex((err) => err.for === "time") > -1 && (
                  <h1 className="add-articles__error-message">
                    Field Required!
                  </h1>
                )} */}
            </label>
          </div>
        </>
      )}
    </>
  );
};

export default DateTimeInput;
