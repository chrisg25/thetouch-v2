import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";
import AuthContext from "../store/auth-context";

interface JournalistType {
  first_name: string;
  last_name: string;
  course: string;
  position: string;
  photo: string;
}

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

  return (
    <Layout>
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
                    <button className="journalists__action">Edit</button>
                    <button className="journalists__action journalists__action--delete">
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
