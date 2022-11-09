import React, { FC, useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import CustomInput from "../components/inputs/CustomInput";
import useErrorHandler from "../hooks/useInputErrorHandler";
import useJournalistInputHandler from "../hooks/useJournalistInputHandler";
import AuthContext from "../store/auth-context";
import Layout from "../components/layout";
import Spinner from "../components/spinner";

const AddJournalist: FC = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [errorUploading, setErrorUploading] = useState<boolean>(false);
  const [successUploading, setSuccessUploading] = useState<boolean>(false);
  const [addingJournalist, setIsAddingJournalsit] = useState<boolean>(false);

  useEffect(() => {
    if (!context?.isLoggedIn) {
      navigate("/login");
    }
  }, [context?.isLoggedIn]);

  const {
    journalistDetails,
    onInputChangeHandler,
    onSelectedItemHandler,
    onClearInputFields,
  } = useJournalistInputHandler();
  const { errors, onErrorOccured, onRemoveError } = useErrorHandler();

  const inputValidator = (): boolean => {
    let isValidated: boolean = true;
    for (const detail in journalistDetails) {
      if (
        Array.isArray(
          journalistDetails[detail as keyof typeof journalistDetails]
        ) &&
        journalistDetails[detail as keyof typeof journalistDetails].length === 0
      ) {
        onErrorOccured({
          for: detail,
          message: "Field Required",
        });
      }
      if (
        journalistDetails[detail as keyof typeof journalistDetails]
          .toString()
          .trim() === ""
      ) {
        onErrorOccured({
          for: detail,
          message: "Field Required!",
        });
        isValidated = false;
      }
    }
    return isValidated;
  };

  const addJournalist = async () => {
    const isValidated = inputValidator();

    if (isValidated) {
      let body = {
        ...journalistDetails,
      };
      body = {
        ...journalistDetails,
        photo: journalistDetails.photos[0].url,
      } as any;

      const token = localStorage.getItem("admin_token_tt");
      setIsAddingJournalsit((prevState) => true);
      try {
        const response = await fetch("http://localhost:5000/journalists", {
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
    setIsAddingJournalsit((prevState) => false);
  };

  return (
    <Layout>
      <div className="add-articles">
        <CustomInput
          value={journalistDetails.first_name}
          onChange={onInputChangeHandler}
          labelPlaceholder="First Name"
          inputName="first_name"
          type="text"
          errors={errors}
          onRemoveError={onRemoveError}
        />
        <CustomInput
          value={journalistDetails.last_name}
          onChange={onInputChangeHandler}
          labelPlaceholder="Last Name"
          inputName="last_name"
          type="text"
          errors={errors}
          onRemoveError={onRemoveError}
        />
        <CustomInput
          value={journalistDetails.course}
          onChange={onInputChangeHandler}
          labelPlaceholder="Course"
          inputName="course"
          type="dropdown"
          errors={errors}
          onRemoveError={onRemoveError}
          onSelectedItemHandler={onSelectedItemHandler}
        />
        <CustomInput
          value={journalistDetails.position}
          onChange={onInputChangeHandler}
          labelPlaceholder="Position"
          inputName="position"
          type="dropdown"
          errors={errors}
          onRemoveError={onRemoveError}
          onSelectedItemHandler={onSelectedItemHandler}
        />
        <CustomInput
          photos={journalistDetails.photos}
          onChange={onInputChangeHandler}
          labelPlaceholder="Photos"
          inputName="photos"
          type="file"
          errors={errors}
          onRemoveError={onRemoveError}
          singlePhoto={true}
        />
        {!addingJournalist ? (
          <>
            <button
              className="add-articles__button"
              onClick={() => addJournalist()}
            >
              Add Journalist
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

export default AddJournalist;
