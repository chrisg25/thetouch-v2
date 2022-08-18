import React, { ChangeEvent, FC, useState } from "react";

const dummyJournalists: Array<{ id: number; name: string }> = [
  {
    id: 1,
    name: "Jane Doe",
  },
  {
    id: 2,
    name: "John Doe",
  },
];

interface InputProps {
  value: string;
  inputName: string;
  label: string;
  placeholder: string;
  isTextarea?: boolean;
  hasDropdown?: boolean;
  isDropdownShowed?: boolean;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  showDropdown?: () => void;
  setSelectedArtist?: (name: string, value: string) => void;
}

const Input: FC<InputProps> = ({
  label,
  placeholder,
  inputName,
  value,

  isTextarea = false,
  isDropdownShowed = false,
  onChange,
  //   showDropdown,
  setSelectedArtist,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const filteredJournalist = dummyJournalists.filter(({ name }) => {
    return name.toLowerCase().includes(`${value}`.toLowerCase());
  });
  const inputComponent = !isTextarea ? (
    <input
      className="add-articles__input-field"
      name={inputName}
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      onFocus={() => {
        if (isDropdownShowed) setShowDropdown((prevState) => true);
      }}
    />
  ) : (
    <textarea
      className="add-articles__input-field"
      name={inputName}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
  return (
    <>
      <label className="add-articles__category-label" htmlFor="category">
        {label}
      </label>
      {inputComponent}
      {showDropdown && (
        <ul className={`add-articles__graphics-artist`} hidden={!showDropdown}>
          {filteredJournalist.length >= 1 ? (
            filteredJournalist.map((journalistDetails) => (
              <li
                key={journalistDetails.name}
                className="add-articles__graphics-artist-item"
                onClick={() => {
                  setSelectedArtist?.(inputName, journalistDetails.name);
                  setShowDropdown((prevState) => false);
                }}
              >
                <h1>{journalistDetails.name}</h1>
              </li>
            ))
          ) : (
            <li
              onClick={() => setShowDropdown((prevState) => false)}
              className="add-articles__graphics-artist-item"
            >
              <h1>No Journalist Found</h1>
            </li>
          )}
        </ul>
      )}
    </>
  );
};

export default Input;
