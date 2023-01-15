import React, { FC, useContext, useRef } from "react";
import ArticleContext from "../../store/article-context";
import { PhotoInputPropType } from "../../types";
import PlusIcon from "../icons/PlusIcon";

const PhotoInput: FC<PhotoInputPropType> = ({
  singlePhoto = false,
  inputName,
}) => {
  const articleContext = useContext(ArticleContext);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const photos = articleContext?.articlePhotos;
  const component = singlePhoto;

  return (
    <div>
      <h3 className="add-articles__category-label">{inputName}</h3>
      <div
        className={
          singlePhoto
            ? "add-articles__single-photo-list-container"
            : "add-articles__photo-list-container"
        }
      >
        {/* 
          Guide to it's conditional rendering 
          singlePhoto === true 
            ? map photos 
            : photos.length >= 1 
              ? show single photo 
              : show add icon
        */}
        {!singlePhoto ? (
          <>
            {photos?.map((photo) => (
              <div className="add-articles__photo-container" key={photo.id}>
                <div
                  className={"add-articles__delete-photo-icon"}
                  onClick={() => articleContext?.onRemovePhoto(photo.id)}
                ></div>
                <img src={photo.url} className="add-articles__photo" />
              </div>
            ))}
            <div
              className={`add-articles__add-image-icon-container${
                photos?.length === 0
                  ? " add-articles__add-image-icon-centered"
                  : ""
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <PlusIcon />
            </div>
          </>
        ) : Array.isArray(photos) && photos.length >= 1 ? (
          <div
            className="add-articles__single-photo-container"
            key={photos[0].id}
          >
            <div
              className={"add-articles__delete-photo-icon"}
              onClick={() => articleContext?.onRemovePhoto(photos[0].id)}
            ></div>
            <img src={photos[0].url} className="add-articles__photo" />
          </div>
        ) : (
          <div
            className={`add-articles__add-image-icon-container${
              photos?.length === 0
                ? " add-articles__add-image-icon-centered"
                : ""
            }`}
            style={{ marginTop: "100px" }}
            onClick={() => fileInputRef.current?.click()}
          >
            <PlusIcon />
          </div>
        )}
      </div>
      {/* 
        This one is not rendered on the screen, 
        instead I used a ref to trigger a click 
      */}
      <input
        type="file"
        accept="image/*"
        hidden={true}
        ref={fileInputRef}
        onChange={articleContext?.onAddPhoto}
      />
    </div>
  );
};

export default PhotoInput;
