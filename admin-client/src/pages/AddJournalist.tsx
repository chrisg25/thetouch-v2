import React, { FC, useRef, ChangeEvent, useState } from "react";
import CustomInput from "../components/inputs/CustomInput";
import useErrorHandler from "../hooks/useErrorHandler";
import useJournalistInputHandler from "../hooks/useJournalistInputHandler";

interface AddJournalistType {
  first_name: string;
  last_name: string;
  position: string;
  course: string;
  photo: string;
}

const AddJournalist: FC = () => {
  const { journalistDetails, onInputChangeHandler, onSelectedItemHandler } =
    useJournalistInputHandler();
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

  const addJournalist = () => {
    const isValidated = inputValidator();
  };

  return (
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
      <button className="add-articles__button" onClick={() => addJournalist()}>
        Add Article
      </button>
      <button className="add-articles__button">Clear Fields</button>
    </div>
  );
};

export default AddJournalist;
