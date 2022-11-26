import React, { FC, useEffect, useState } from "react";
const dummyJournalists: Array<{ id: number; name: string }> = [
  {
    id: 7,
    name: "Jane Doe",
  },
  {
    id: 9,
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
  const [journalists, setJournalists] = useState<
    { id: number; name: string }[]
  >([]);
  useEffect(() => {
    const fetchdArticles = async () => {
      try {
        const res = await fetch("http://localhost:5000/journalists");
        const data = await res.json();
        console.log(data, "from drop");
        setJournalists(
          (prevJournalists) =>
            data.map((journalist: typeof data) => ({
              id: journalist.id,
              name: `${journalist.first_name} ${journalist.last_name}`,
            })) as typeof data
        );
      } catch (error) {
        console.log(error, "fetch journalists error on dropdown");
      }
    };
    fetchdArticles();
  }, []);

  const filteredJournalist = journalists.filter((journalist) =>
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
