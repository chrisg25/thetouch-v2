import React, { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import ArticleContext from "../../store/article-context";
import { DropdownSelectInputPropType, ErrorType } from "../../types";
import { dummyJournalistsData as options } from "../../dummy-data";
import InputErrorUI from "../UI/InputErrorUI";

const DropwdownSelectInput: FC<DropdownSelectInputPropType> = ({
  labelPlaceholder,
  inputName,
}) => {
  const articleContext = useContext(ArticleContext);
  const inputErrors = articleContext?.inputErrors as ErrorType[];
  const [inputValue, setInputValue] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const filteredJournalist = options.filter((journalist) =>
    journalist.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const onItemSelectedHandler = (name: string, id: number) => {
    articleContext?.onDropdownItemSelectedHandler(inputName, name, id);
    setInputValue(name);
    onToggleDropdownHandler();
  };

  const onToggleDropdownHandler = () => {
    setShowDropdown((prevState) => !prevState);
  };

  return (
    <>
      <label className="add-articles__category-label" htmlFor="category">
        {labelPlaceholder}
        <div>
          <input
            className="add-articles__input-field"
            name={inputName}
            type="text"
            placeholder={labelPlaceholder}
            value={inputValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
            onFocus={onToggleDropdownHandler}
            autoComplete="off"
          />
        </div>
      </label>
      {inputErrors?.findIndex((err) => err.for === inputName) > -1 && (
        <InputErrorUI />
      )}
      <ul className={`add-articles__graphics-artist`} hidden={!showDropdown}>
        {filteredJournalist.length >= 1 ? (
          filteredJournalist.map(({ id, name }) => (
            <li
              key={id}
              className="add-articles__graphics-artist-item"
              onClick={() => {
                onItemSelectedHandler(name, id);
              }}
            >
              <h1>{name}</h1>
            </li>
          ))
        ) : (
          <li className="add-articles__graphics-artist-item">
            <h1>No Journalist Found</h1>
          </li>
        )}
      </ul>
    </>
  );
};

export default DropwdownSelectInput;
