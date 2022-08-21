import React from "react";
import CustomInput from "../components/inputs/CustomInput";
import useArticleInputHandler from "../hooks/useArticleInputHandler";

const AddArticle = () => {
  const {
    articleDetails,
    onInputChangeHandler,
    onRemovePhoto,
    onSelectedItemHandler,
  } = useArticleInputHandler();

  return (
    <div className="add-articles">
      <CustomInput
        value={articleDetails.category}
        onChange={onInputChangeHandler}
        labelPlaceholder="Category"
        inputName="category"
        type="text"
      />
      <CustomInput
        value={articleDetails.headline}
        onChange={onInputChangeHandler}
        labelPlaceholder="Headline"
        inputName="headline"
        type="text"
      />
      <CustomInput
        value={articleDetails.body}
        onChange={onInputChangeHandler}
        labelPlaceholder="Body"
        inputName="body"
        type="textarea"
      />
      <CustomInput
        value={articleDetails.authored_by}
        onChange={onInputChangeHandler}
        labelPlaceholder="Author"
        inputName="authored_by"
        type="dropdown"
        onSelectedItemHandler={onSelectedItemHandler}
      />
      <CustomInput
        value={articleDetails.graphics_by}
        onChange={onInputChangeHandler}
        labelPlaceholder="Graphics Artist"
        inputName="graphics_by"
        type="dropdown"
        onSelectedItemHandler={onSelectedItemHandler}
      />
      <CustomInput
        photos={articleDetails.photos}
        onChange={onInputChangeHandler}
        labelPlaceholder="Photos"
        inputName="photos"
        type="file"
        onRemovePhoto={onRemovePhoto}
      />
    </div>
  );
};

export default AddArticle;
