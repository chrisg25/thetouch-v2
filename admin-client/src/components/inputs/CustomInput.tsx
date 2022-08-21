import React, {
  ChangeEvent,
  FC,
  Fragment,
  ReactNode,
  useRef,
  useState,
} from "react";
import Dropdown from "../Dropdown";
import PlusIcon from "../icons/PlusIcon";

interface CustomInputProps {
  labelPlaceholder: string;
  value?: string;
  photos?: PhotoType[];
  type: string;
  inputName: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onRemovePhoto?: (photoId: string) => void;
  onSelectedItemHandler?: (inputName: string, name: string, id: number) => void;
}
interface PhotoType {
  id: string;
  url: string;
}

const CustomInput: FC<CustomInputProps> = ({
  value,
  photos,
  labelPlaceholder,
  type,
  inputName,
  onChange,
  onRemovePhoto,
  onSelectedItemHandler,
}) => {
  // state for showing dropdown if inputType = "dropdown"
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  let inputComponent: ReactNode;
  if (type === "dropdown") {
    inputComponent = (
      <>
        <label className="add-articles__category-label" htmlFor="category">
          {labelPlaceholder}
          <input
            className="add-articles__input-field"
            name={inputName}
            type="text"
            placeholder={labelPlaceholder}
            value={value}
            onChange={onChange}
            onFocus={() => setShowDropdown((prevState) => true)}
          />
        </label>
        <Dropdown
          inputName={inputName}
          value={value as string}
          showDropdown={showDropdown}
          setShowDropdown={() => setShowDropdown((prevState) => !prevState)}
          onSelectedItemHandler={onSelectedItemHandler}
        />
      </>
    );
  }
  if (type === "file") {
    inputComponent = (
      <div>
        <h3 className="add-articles__category-label">Featured Photos</h3>
        <div className="add-articles__photo-list-container">
          {Array.isArray(photos) &&
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
  if (type === "text") {
    inputComponent = (
      <label className="add-articles__category-label" htmlFor="category">
        {labelPlaceholder}
        <input
          className="add-articles__input-field"
          name={inputName}
          type="text"
          placeholder={labelPlaceholder}
          value={value}
          onChange={onChange}
        />
      </label>
    );
  }
  if (type === "textarea") {
    inputComponent = (
      <label className="add-articles__category-label" htmlFor="category">
        {labelPlaceholder}
        <textarea
          className="add-articles__input-field"
          name={inputName}
          placeholder={labelPlaceholder}
          value={value}
          onChange={onChange}
        />
      </label>
    );
  }

  return <Fragment>{inputComponent}</Fragment>;
};

export default CustomInput;
