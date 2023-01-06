import React, { useContext, useEffect, useState } from "react";
import CustomInput from "../components/inputs/CustomInput";
import useArticleInputHandler from "../hooks/useArticleInputHandler";
import useErrorHandler from "../hooks/useErrorHandler";
import * as dayjs from "dayjs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
    removedPhotos,
    addedPhotos,
    hasDetailChanges,
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

  const { action } = useParams();
  const location = useLocation();

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

  const onAddArticle = async () => {
    const isValidated = inputValidator();

    if (isValidated) {
      let body = {
        ...articleDetails,
      } as any;
      body = {
        ...articleDetails,
        photos: articleDetails.photos.map((photo: any) => photo.url) as any,
        createdAt: !hasCustomDate
          ? dayjs().format("YYYY-MM-DD hh:mm")
          : dayjs(`${articleDetails.date} ${articleDetails.time}`).format(
              "YYYY-MM-DD hh:mm"
            ),
      } as any;
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

  const onUpdateArticle = async () => {
    if (!hasDetailChanges) {
      console.log("triggered");
      return;
    } else {
      const articleId = articleDetails.id;
      const token = localStorage.getItem("admin_token_tt");

      const currentArticleDetails: any = location.state;
      let body = {};

      for (const property in currentArticleDetails) {
        if (
          currentArticleDetails[property as keyof typeof location.state] !==
          articleDetails[property as keyof typeof articleDetails]
        ) {
          body = {
            ...body,
            [`${property}`]:
              articleDetails[property as keyof typeof location.state],
          };
        }
      }
      body = {
        ...body,
        addedPhotos,
        removedPhotos,
      };
      try {
        const response = await fetch(
          `http://localhost:5000/articles${articleId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
          }
        );
        console.log(body, "updated body");
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
        {action === "edit" &&
        !hasDetailChanges &&
        (addedPhotos.length === 0 || removedPhotos.length === 0) ? (
          <p>No changes has been made</p>
        ) : null}
        {!addingArticle ? (
          <>
            <button
              className="add-articles__button"
              onClick={() =>
                action === "add" ? onAddArticle() : onUpdateArticle()
              }
            >
              {action === "add" ? "Add Article" : "Update Article"}
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
