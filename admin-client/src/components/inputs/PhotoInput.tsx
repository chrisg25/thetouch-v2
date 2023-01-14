import React, { FC, useContext, useRef } from "react";
import ArticleContext from "../../store/article-context";
import PlusIcon from "../icons/PlusIcon";

const PhotoInput: FC<{ singlePhoto?: boolean }> = ({ singlePhoto = false }) => {
  const articleContext = useContext(ArticleContext);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const photos = articleContext?.articlePhotos;
  const component = singlePhoto;

  return (
    <div>
      <h3 className="add-articles__category-label">Featured Photos</h3>
      {!singlePhoto && (
        <div className="add-articles__photo-list-container">
          {Array.isArray(photos) &&
            !singlePhoto &&
            photos.map((photo) => (
              <div className="add-articles__photo-container" key={photo.id}>
                <div
                  key={photo.id}
                  className="add-articles__delete-photo-icon"
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
        </div>
      )}
      {singlePhoto && (
        <>
          <div className="add-articles__single-photo-list-container">
            {Array.isArray(photos) &&
              (photos.length >= 1 ? (
                <div
                  className="add-articles__single-photo-container"
                  key={photos[0].id}
                >
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
              ))}
          </div>
          {Array.isArray(photos) && photos?.length >= 0 && (
            <button
              className="add-articles__button"
              onClick={() => fileInputRef.current?.click()}
            >
              Select Photo
            </button>
          )}
        </>
      )}
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
