import { ChangeEvent, useState } from "react";
import { JournalistType, PhotoType } from "../types";
import { v4 as uuid } from "uuid";
import userPhotoPlaceHolder from "../assets/user-solid.svg";

const useJournalistInputHandler = () => {
  const [journalistDetails, setJournalistDetails] = useState<JournalistType>({
    first_name: "",
    last_name: "",
    course: "",
    position: "",
    photos: [] as PhotoType[],
  });

  const onInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.type === "file") {
      const target = e.target as HTMLInputElement;
      if (!target.files) {
        return;
      }
      if (target.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(target.files[0]);
        reader.onloadend = () => {
          setJournalistDetails((prevDetails) => ({
            ...prevDetails,
            photos: [
              {
                id: uuid(),
                url: reader.result,
              },
            ] as PhotoType[],
          }));
        };
      }
    } else {
      setJournalistDetails((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const onRemovePhoto = () => {
    setJournalistDetails((prevState) => ({
      ...prevState,
      photo: {
        id: "",
        url: "",
      },
    }));
  };

  const onSelectedItemHandler = (
    inputName: string,
    name: string,
    id?: number
  ) => {
    console.log(inputName, "input name");
    console.log(name, "name");
    setJournalistDetails((prevState) => ({
      ...prevState,
      [inputName]: name,
    }));
  };

  return {
    journalistDetails,
    onInputChangeHandler,
    onSelectedItemHandler,
  };
};

export default useJournalistInputHandler;
