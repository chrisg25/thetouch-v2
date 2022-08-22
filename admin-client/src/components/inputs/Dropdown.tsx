import React, { FC, useState } from "react";
const dummyJournalists: Array<{ id: number; name: string }> = [
  {
    id: 3,
    name: "Jane Doe",
  },
  {
    id: 4,
    name: "John Doe",
  },
];

interface DropdownProps {
  inputName: string;
  value: string;
  showDropdown: boolean;
  setShowDropdown: () => void;
  onSelectedItemHandler?: (inputName: string, name: string, id: number) => void;
}

const Dropdown: FC<DropdownProps> = ({
  inputName,
  value,
  showDropdown,
  setShowDropdown,
  onSelectedItemHandler,
}) => {
  const filteredJournalist = dummyJournalists.filter((journalist) =>
    journalist.name.toLowerCase().includes(value.toLowerCase())
  );
  return (
    <ul className={`add-articles__graphics-artist`} hidden={!showDropdown}>
      {filteredJournalist.length >= 1 ? (
        filteredJournalist.map(({ id, name }) => (
          <li
            key={name}
            className="add-articles__graphics-artist-item"
            onClick={() => {
              onSelectedItemHandler?.(inputName, name, id);
              setShowDropdown();
            }}
          >
            <h1>{name}</h1>
          </li>
        ))
      ) : (
        <li
          onClick={() => setShowDropdown()}
          className="add-articles__graphics-artist-item"
        >
          <h1>No Journalist Found</h1>
        </li>
      )}
    </ul>
  );
};

export default Dropdown;
