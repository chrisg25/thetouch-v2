import React, { useContext, useEffect, useState } from "react";
import CustomInput from "../components/inputs/CustomInput";
import useArticleInputHandler from "../hooks/useArticleInputHandler";
import useErrorHandler from "../hooks/useErrorHandler";
import * as dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import Layout from "../components/layout";

const AddArticle = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!context?.isLoggedIn) {
      navigate("/login");
    }
  }, [context?.isLoggedIn]);
  const {
    articleDetails,
    hasCustomDate,
    onInputChangeHandler,
    onRemovePhoto,
    onSelectedItemHandler,
    onHasCustomDateHandler,
  } = useArticleInputHandler();

  const { errors, onErrorOccured, onRemoveError } = useErrorHandler();

  const inputValidator = (): boolean => {
    let isValidated = true;
    for (const detail in articleDetails) {
      if (
        articleDetails[detail as keyof typeof articleDetails]
          ?.toString()
          .trim() === "" &&
        detail !== "photos" &&
        detail !== "time" &&
        detail !== "date"
      ) {
        onErrorOccured({
          for: detail,
          message: "Field Required!",
        });
        isValidated = false;
      }
      if (hasCustomDate) {
        if (articleDetails["date"]?.toString().trim() === "") {
          onErrorOccured({
            for: "date",
            message: "Field Required!",
          });
          isValidated = false;
        }
        if (articleDetails["time"]?.toString().trim() === "") {
          onErrorOccured({
            for: "time",
            message: "Field Required!",
          });
          isValidated = false;
        }
      }
    }
    return isValidated;
  };

  const addArticle = async () => {
    const isValidated = inputValidator();

    if (isValidated) {
      let body = {
        ...articleDetails,
      };
      body = {
        ...articleDetails,
        photos: articleDetails.photos.map((photo) => photo.url) as any,
        createdAt: !hasCustomDate
          ? dayjs().format("YYYY-MM-DD hh:mm")
          : dayjs(`${articleDetails.date} ${articleDetails.time}`).format(
              "YYYY-MM-DD hh:mm"
            ),
      };
      delete body.date;
      delete body.time;
      console.log(body.createdAt, "body");
      const response = await fetch("http://localhost:5000/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
    } else {
      return;
    }
  };

  return (
    <Layout>
      <div className="add-articles">
        <CustomInput
          value={articleDetails.category}
          onChange={onInputChangeHandler}
          labelPlaceholder="Category"
          inputName="category"
          type="text"
          errors={errors}
          onRemoveError={onRemoveError}
        />
        <CustomInput
          value={articleDetails.headline}
          onChange={onInputChangeHandler}
          labelPlaceholder="Headline"
          inputName="headline"
          type="text"
          errors={errors}
          onRemoveError={onRemoveError}
        />
        <CustomInput
          value={articleDetails.body}
          onChange={onInputChangeHandler}
          labelPlaceholder="Body"
          inputName="body"
          type="textarea"
          errors={errors}
          onRemoveError={onRemoveError}
        />
        <CustomInput
          value={articleDetails.authored_by}
          onChange={onInputChangeHandler}
          labelPlaceholder="Author"
          inputName="authored_by"
          type="dropdown"
          onSelectedItemHandler={onSelectedItemHandler}
          errors={errors}
          onRemoveError={onRemoveError}
        />
        <CustomInput
          value={articleDetails.graphics_by}
          onChange={onInputChangeHandler}
          labelPlaceholder="Graphics Artist"
          inputName="graphics_by"
          type="dropdown"
          onSelectedItemHandler={onSelectedItemHandler}
          errors={errors}
          onRemoveError={onRemoveError}
        />
        <CustomInput
          onChange={onInputChangeHandler}
          labelPlaceholder="Graphics Artist"
          inputName="graphics_by"
          type="dateTime"
          dateValue={articleDetails.date}
          timeValue={articleDetails.time}
          errors={errors}
          hasCustomDate={hasCustomDate}
          onHasCustomDateHandler={onHasCustomDateHandler}
          onRemoveError={onRemoveError}
        />
        <CustomInput
          photos={articleDetails.photos}
          onChange={onInputChangeHandler}
          labelPlaceholder="Photos"
          inputName="photos"
          type="file"
          onRemovePhoto={onRemovePhoto}
          errors={errors}
          onRemoveError={onRemoveError}
        />
        <button className="add-articles__button" onClick={() => addArticle()}>
          Add Article
        </button>
        <button className="add-articles__button">Clear Fields</button>
      </div>
    </Layout>
  );
};

export default AddArticle;
