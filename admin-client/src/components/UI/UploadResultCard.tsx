import React, { FC, useEffect } from "react";

const UploadResultCard: FC<{ isSuccess: boolean }> = ({ isSuccess }) => {
  return (
    <div className={`upload-status${isSuccess ? "__success" : "__error"}`}>
      <h1>{isSuccess ? "Successfully Uploaded" : "Error uploading article"}</h1>
    </div>
  );
};

export default UploadResultCard;
