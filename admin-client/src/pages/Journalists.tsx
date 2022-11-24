import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";
import AuthContext from "../store/auth-context";
import Spinner from "../components/spinner";
interface JournalistType {
  id?: number;
  first_name: string;
  last_name: string;
  course: string;
  position: string;
  photo: string;
}

const TOKEN = localStorage.getItem("admin_token_tt");
const Journalists = () => {
  const authContext = useContext(AuthContext);
  const [journalists, setJournalists] = useState<JournalistType[]>([]);
  const [fetchError, setFetchError] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [toBeDeletedJournalist, setToBeDeletedJournalist] = useState<
    number | null
  >(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authContext?.isLoggedIn) {
      navigate("/login");
    }
  }, [authContext?.isLoggedIn]);

  useEffect(() => {
    const fetchdArticles = async () => {
      try {
        const res = await fetch("http://localhost:5000/journalists");
        const data = await res.json();
        setJournalists(() => [...data] as typeof data);
      } catch (error) {
        setFetchError((prevErr) => !prevErr);
      }
    };
    fetchdArticles();
  }, []);

  const onEditJournalists = (articleDetails: any) => {
    navigate("/add-journalists", {
      state: articleDetails,
    });
  };

  const onDeleteJournalist = async (articleId: number) => {
    setToBeDeletedJournalist(articleId);
    setShowModal((prevState) => !prevState);
  };

  const onConfirimedDeleteJournalist = async () => {
    try {
      setIsDeleting((prevState) => true);
      await fetch(
        `http://localhost:5000/journalists/${toBeDeletedJournalist}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      setJournalists((prevState) =>
        prevState.filter(
          (journalist) => journalist.id !== toBeDeletedJournalist
        )
      );
      setIsDeleting((prevState) => false);
      setShowModal((prevState) => !prevState);
    } catch (error) {
      setFetchError((prevErr) => !prevErr);
    }
  };

  const onCancelDeletion = () => {
    setToBeDeletedJournalist(null);
    setShowModal((prevState) => false);
  };

  const modal = showModal && (
    <div className="backdrop">
      <div className="prompt">
        <h1 className="prompt__message">
          Are you sure you want to delete this article?
        </h1>
        <div className="prompt__actions-container">
          {!isDeleting ? (
            <>
              <button
                className="prompt__action prompt__yes"
                onClick={() => onConfirimedDeleteJournalist()}
              >
                Yes
              </button>
              <button
                className="prompt__action prompt__no"
                onClick={() => onCancelDeletion()}
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
  );

  return (
    <Layout>
      {modal}
      <div className="journalists">
        {journalists.length >= 1
          ? journalists.map((journalist) => {
              return (
                <div
                  className="journalists__card"
                  style={{
                    backgroundImage: `url(${journalist.photo})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="journalists__actions-container">
                    <button
                      className="journalists__action"
                      onClick={() => onEditJournalists(journalist)}
                    >
                      Edit
                    </button>
                    <button
                      className="journalists__action journalists__action--delete"
                      onClick={() =>
                        onDeleteJournalist(journalist.id as number)
                      }
                    >
                      Delete
                    </button>
                  </div>
                  <div className="journalists__info">
                    <h1>{journalist.first_name}</h1>
                    <p>{journalist.position}</p>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </Layout>
  );
};

export default Journalists;
