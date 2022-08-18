import React, { ChangeEvent, FC, useRef } from "react";
import PlusIcon from "./icons/PlusIcon";

interface FileInputProps {
  label: string;
  photos: PhotoType[];
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  removePhoto: (id: string) => void;
}

interface PhotoType {
  id: string;
  photo: string;
}

const FileInput: FC<FileInputProps> = ({
  photos,
  onFileChange,
  removePhoto,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <h3 className="add-articles__category-label">Featured Photosss</h3>
      <div className="add-articles__photo-list-container">
        {Array.isArray(photos) &&
          photos.map((photo) => (
            <div className="add-articles__photo-container">
              <div
                className="add-articles__delete-photo-icon"
                onClick={() => removePhoto(photo.id)}
              ></div>
              <img src={photo.photo} className="add-articles__photo" />
            </div>
          ))}
        <div
          className={`add-articles__add-image-icon-container${
            photos.length === 0 ? " add-articles__add-image-icon-centered" : ""
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <PlusIcon />
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
