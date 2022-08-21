import dayjs from "dayjs";
import { FC, useState, useRef } from "react";
import DateTimeInput from "../components/inputs/DateTimeInput";
import FileInput from "../components/inputs/FileInput";
import Input from "../components/inputs/Input";
import useInput from "../hooks/useInput";

const AddArticles: FC = () => {
  const {
    articleDetails,
    detailsInputHandler,
    setSelectedOption,
    fileInputHandler,
    removePhotoHandler,
    dateTimeInputHandler,
  } = useInput();

  const [showModal, setShowModal] = useState(false);

  const addArticle = async () => {
    let body = {
      ...articleDetails,
    };
    if (articleDetails.date === null && articleDetails.time === null) {
      body = {
        ...articleDetails,
        photos: articleDetails.photos.map((photo) => photo.photo) as any,
        createdAt: dayjs().format(),
      };
    }
    delete body.date;
    delete body.time;
    console.log(body);
    const response = await fetch("http://localhost:5000/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
  };

  return (
    <div className="add-articles">
      <h1 className="add-articles__title">Add article details below</h1>
      <Input
        label="Category"
        onChange={detailsInputHandler}
        placeholder={"Category"}
        inputName="category"
        value={articleDetails.category}
      />
      <Input
        label="Headline"
        onChange={detailsInputHandler}
        placeholder={"Headline"}
        inputName="headline"
        value={articleDetails.headline}
      />
      <Input
        label="Body"
        onChange={detailsInputHandler}
        placeholder={"Body"}
        inputName="body"
        value={articleDetails.body}
        isTextarea
      />

      <Input
        label="Author"
        onChange={detailsInputHandler}
        placeholder={"Author"}
        inputName="authored_by"
        value={articleDetails.authored_by}
        hasDropdown
        isDropdownShowed={true}
        setSelectedOption={setSelectedOption}
      />

      <Input
        label="Graphics Artist"
        inputName="graphics_by"
        placeholder="Graphics Artist"
        onChange={detailsInputHandler}
        value={articleDetails.graphics_by}
        hasDropdown
        isDropdownShowed={true}
        setSelectedOption={setSelectedOption}
      />

      <DateTimeInput
        setDateTime={dateTimeInputHandler}
        dateValue={articleDetails.date!}
        timeValue={articleDetails.time!}
      />

      <FileInput
        onFileChange={fileInputHandler}
        label="Add Photos"
        photos={articleDetails.photos}
        removePhoto={removePhotoHandler}
      />

      <button className="add-articles__button" onClick={() => addArticle()}>
        Add Article
      </button>
      <button className="add-articles__button">Clear Fields</button>
    </div>
  );
};

export default AddArticles;
