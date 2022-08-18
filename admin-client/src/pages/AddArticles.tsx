import { FC, useState, useRef } from "react";
import DateTimeInput from "../components/DateTimeInput";
import FileInput from "../components/FileInput";
import Input from "../components/Input";
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

  const addArticle = async () => {
    const response = await fetch("http://localhost:5000/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    const data = await response.json();
    console.log(data, "response");
  };

  return (
    <div className="add-articles">
      <h1 className="add-articles__title">Add article details below</h1>
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
        inputName="author_id"
        value={articleDetails.author_id}
        hasDropdown
        isDropdownShowed={true}
        setSelectedArtist={setSelectedOption}
      />

      <Input
        label="Graphics Artist"
        inputName="graphics_artist_id"
        placeholder="Graphics Artist"
        onChange={detailsInputHandler}
        value={articleDetails.graphics_artist_id}
        hasDropdown
        isDropdownShowed={true}
        setSelectedArtist={setSelectedOption}
      />

      <DateTimeInput
        setDateTime={dateTimeInputHandler}
        dateValue={articleDetails.date}
        timeValue={articleDetails.time}
      />

      <FileInput
        onFileChange={fileInputHandler}
        label="Add Photos"
        photos={articleDetails.photos}
        removePhoto={removePhotoHandler}
      />
    </div>
  );
};

export default AddArticles;
