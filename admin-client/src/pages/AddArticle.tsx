import React, { useContext, useEffect, useState } from "react";
import CustomInput from "../components/inputs/CustomInput";
import useArticleInputHandler from "../hooks/useArticleInputHandler";
import useErrorHandler from "../hooks/useErrorHandler";
import * as dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import Layout from "../components/layout";
import Spinner from "../components/spinner";

interface Dropdown {
  id: number;
  name: string;
  position: string;
}

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
    onClearInputFields,
  } = useArticleInputHandler();

  const { errors, onErrorOccured, onRemoveError } = useErrorHandler();
  const [addingArticle, sestIsAddingArticle] = useState<boolean>(false);
  const [errorUploading, setErrorUploading] = useState<boolean>(false);
  const [successUploading, setSuccessUploading] = useState<boolean>(false);
  const [graphicsByOptions, setGraphicsByOptions] = useState<Dropdown[]>([]);
  const [authorOptions, setAuthorOptions] = useState<Dropdown[]>([]);

  useEffect(() => {
    const fetchdArticles = async () => {
      try {
        const res = await fetch("http://localhost:5000/journalists");
        const data = await res.json();
        setGraphicsByOptions(
          (prevJournalists) =>
            data
              .filter(
                (journalist: typeof data) =>
                  journalist.position === "Graphics Artist"
              )
              .map((journalist: typeof data) => ({
                id: journalist.id,
                name: `${journalist.first_name} ${journalist.last_name}`,
                position: journalist.position,
              })) as typeof data
        );
        setAuthorOptions(
          (prevJournalists) =>
            data.map((journalist: typeof data) => ({
              id: journalist.id,
              name: `${journalist.first_name} ${journalist.last_name}`,
              position: journalist.position,
            })) as typeof data
        );
      } catch (error) {
        console.log(error, "fetch journalists error on dropdown");
      }
    };
    fetchdArticles();
  }, []);

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
      const token = localStorage.getItem("admin_token_tt");
      sestIsAddingArticle((prevState) => true);
      try {
        const response = await fetch("http://localhost:5000/articles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });
        if (response.status === 201) {
          setErrorUploading((prevState) => false);
        }
        setTimeout(() => {
          setSuccessUploading((prevState) => false);
          onClearInputFields();
        }, 4000);
        setSuccessUploading((prevState) => true);
      } catch (error) {
        setTimeout(() => {
          setErrorUploading((prevState) => false);
        }, 4000);
        setErrorUploading((prevState) => true);
      }
    } else {
      return;
    }
    sestIsAddingArticle((prevState) => false);
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
          dropdownOptions={authorOptions}
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
          dropdownOptions={graphicsByOptions}
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
        {!addingArticle ? (
          <>
            <button
              className="add-articles__button"
              onClick={() => addArticle()}
            >
              Add Article
            </button>
            <button
              className="add-articles__button"
              onClick={() => onClearInputFields()}
            >
              Clear Fields
            </button>
          </>
        ) : (
          <Spinner />
        )}
      </div>
      {successUploading && (
        <div className="upload-status__success">
          <h1>Successfully Uploaded</h1>
        </div>
      )}
      {errorUploading && (
        <div className="upload-status__error">
          <h1>Error uploading article</h1>
        </div>
      )}
    </Layout>
  );
};

export default AddArticle;
