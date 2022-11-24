import React, { useState, FC } from "react";
import Spinner from "../spinner";

interface BackdropPropTypes {
  isLoading: boolean;
  showModal: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const Backdrop: FC<BackdropPropTypes> = ({
  onCancel,
  onConfirm,
  showModal,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      {showModal && (
        <div className="backdrop" hidden={!showModal}>
          <div className="prompt">
            <h1 className="prompt__message">
              Are you sure you want to delete this article?
            </h1>
            <div className="prompt__actions-container">
              {!loading ? (
                <>
                  <button
                    className="prompt__action prompt__yes"
                    onClick={() => onConfirm()}
                  >
                    Yes
                  </button>
                  <button
                    className="prompt__action prompt__no"
                    onClick={() => onCancel()}
                  >
                    No
                  </button>
                </>
              ) : (
                <Spinner />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Backdrop;
