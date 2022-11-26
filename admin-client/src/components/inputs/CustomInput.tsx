import React, {
  ChangeEvent,
  FC,
  Fragment,
  ReactNode,
  useRef,
  useState,
} from "react";
import Dropdown from "./Dropdown";
import PlusIcon from "../icons/PlusIcon";

interface CustomInputProps {
  labelPlaceholder: string;
  value?: string;
  dateValue?: string;
  timeValue?: string;
  photos?: PhotoType[];
  type: string;
  inputName: string;
  hasCustomDate?: boolean;
  errors: ErrorType[];
  singlePhoto?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onRemovePhoto?: (photoId: string) => void;
  onSelectedItemHandler?: (inputName: string, name: string, id: number) => void;
  onClearDateTimeValues?: () => void;
  onHasCustomDateHandler?: () => void;
  onRemoveError: (errorFor: string) => void;
}
interface PhotoType {
  id: string;
  url: string;
}

interface ErrorType {
  for: string;
  message: string;
}

const CustomInput: FC<CustomInputProps> = ({
  value,
  photos,
  labelPlaceholder,
  type,
  inputName,
  dateValue,
  timeValue,
  errors,
  hasCustomDate,
  singlePhoto = false,
  onChange,
  onRemovePhoto,
  onSelectedItemHandler,
  onClearDateTimeValues,
  onHasCustomDateHandler,
  onRemoveError,
}) => {
  // state for showing dropdown if inputType = "dropdown"
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const hasError: boolean =
    errors.findIndex((err) => err.for === inputName) > -1;

  let inputComponent: ReactNode;
  if (type === "text") {
    inputComponent = (
      <div>
        <label className="add-articles__category-label" htmlFor="category">
          {labelPlaceholder}
          <input
            className="add-articles__input-field"
            name={inputName}
            type="text"
            placeholder={labelPlaceholder}
            value={value}
            onChange={onChange}
            onFocus={() => onRemoveError(inputName)}
            autoComplete="off"
          />
        </label>
        {hasError && (
          <h1 className="add-articles__error-message">Field Required!</h1>
        )}
      </div>
    );
  }
  if (type === "dropdown") {
    inputComponent = (
      <div>
        <label className="add-articles__category-label" htmlFor="category">
          {labelPlaceholder}
          <input
            className="add-articles__input-field"
            name={inputName}
            type="text"
            placeholder={labelPlaceholder}
            value={value}
            onChange={onChange}
            onFocus={() => {
              onRemoveError(inputName);
              setShowDropdown((prevState) => true);
            }}
            autoComplete="off"
          />
        </label>
        {hasError && (
          <h1 className="add-articles__error-message">Field Required!</h1>
        )}
        <Dropdown
          inputName={inputName}
          value={value as string}
          showDropdown={showDropdown}
          setShowDropdown={() => setShowDropdown((prevState) => !prevState)}
          onSelectedItemHandler={onSelectedItemHandler}
        />
      </div>
    );
  }
  if (type === "dateTime") {
    inputComponent = (
      <>
        <label className="add-articles__category-label" htmlFor="checkbox">
          <input
            id="checkbox"
            name="checkboxx"
            type="checkbox"
            style={{ marginRight: "10px", marginTop: "4px" }}
            onClick={() => {
              onHasCustomDateHandler?.();
              onClearDateTimeValues?.();
            }}
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
                  onChange={onChange}
                  value={dateValue}
                  onFocus={() => onRemoveError("date")}
                  style={{ display: "block" }}
                  autoComplete="off"
                />
              </label>
              {hasCustomDate &&
                errors.findIndex((err) => err.for === "date") > -1 && (
                  <h1 className="add-articles__error-message">
                    Field Required!
                  </h1>
                )}
            </div>
            <div>
              <label className="add-articles__category-label" htmlFor="time">
                Time
                <input
                  name="time"
                  type="time"
                  className="add-articles__input-field"
                  onChange={onChange}
                  value={timeValue}
                  onFocus={() => onRemoveError("time")}
                  style={{ display: "block" }}
                  autoComplete="off"
                />
                {hasCustomDate &&
                  errors.findIndex((err) => err.for === "time") > -1 && (
                    <h1 className="add-articles__error-message">
                      Field Required!
                    </h1>
                  )}
              </label>
            </div>
          </>
        )}
      </>
    );
  }
  if (type === "file") {
    inputComponent = (
      <div>
        <h3 className="add-articles__category-label">Featured Photos</h3>
        {!singlePhoto && (
          <div className="add-articles__photo-list-container">
            {Array.isArray(photos) &&
              !singlePhoto &&
              photos.map((photo) => (
                <div className="add-articles__photo-container" key={photo.id}>
                  <div
                    key={photo.id}
                    className="add-articles__delete-photo-icon"
                    onClick={() => onRemovePhoto?.(photo.id)}
                  ></div>
                  <img src={photo.url} className="add-articles__photo" />
                </div>
              ))}
            <div
              className={`add-articles__add-image-icon-container${
                photos?.length === 0
                  ? " add-articles__add-image-icon-centered"
                  : ""
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <PlusIcon />
            </div>
          </div>
        )}
        {singlePhoto && (
          <>
            <div className="add-articles__single-photo-list-container">
              {Array.isArray(photos) &&
                (photos.length >= 1 ? (
                  <div
                    className="add-articles__single-photo-container"
                    key={photos[0].id}
                  >
                    <img src={photos[0].url} className="add-articles__photo" />
                  </div>
                ) : (
                  <div
                    className={`add-articles__add-image-icon-container${
                      photos?.length === 0
                        ? " add-articles__add-image-icon-centered"
                        : ""
                    }`}
                    style={{ marginTop: "100px" }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <PlusIcon />
                  </div>
                ))}
            </div>
            {Array.isArray(photos) && photos?.length >= 0 && (
              <button
                className="add-articles__button"
                onClick={() => fileInputRef.current?.click()}
              >
                Select Photo
              </button>
            )}
          </>
        )}
        <input
          type="file"
          accept="image/*"
          hidden={true}
          ref={fileInputRef}
          onChange={onChange}
        />
      </div>
    );
  }

  if (type === "textarea") {
    inputComponent = (
      <>
        <label className="add-articles__category-label" htmlFor="category">
          {labelPlaceholder}
          <textarea
            className="add-articles__input-field"
            name={inputName}
            placeholder={labelPlaceholder}
            value={value}
            onChange={onChange}
            onFocus={() => onRemoveError(inputName)}
          />
        </label>
        {hasError && (
          <h1 className="add-articles__error-message">Field Required!</h1>
        )}
      </>
    );
  }

  return <Fragment>{inputComponent}</Fragment>;
};

export default CustomInput;
