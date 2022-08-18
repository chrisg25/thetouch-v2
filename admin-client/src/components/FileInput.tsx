import React, { ChangeEvent, FC, useRef, useState } from "react";
import ImageLogoIcon from "../components/icons/ImageLogoIcon";

interface FileInputProps {
  label: string;
  photos: Array<string>;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: FC<FileInputProps> = ({ photos, onFileChange }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <h3 className="add-articles__category-label">Featured Photos</h3>
      <div className="add-articles__photo-list-container">
        {Array.isArray(photos) ? (
          photos.map((photo) => (
            <div className="add-articles__photo-container">
              <div className="add-articles__delete-photo-icon"></div>
              <img src={photo} className="add-articles__photo" />
            </div>
          ))
        ) : (
          <div style={{ width: "30px", height: "30px" }}>
            <ImageLogoIcon />
          </div>
        )}
        <div>
          <h1 onClick={() => fileInputRef.current?.click()}>Add More</h1>
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        hidden={true}
        ref={fileInputRef}
        onChange={onFileChange}
      />
      <button className="add-articles__button">Add Article</button>
      <button className="add-articles__button">Clear Fields</button>
    </>
  );
};

export default FileInput;

// onClick={addArticle}
// onClick={addArticle}
