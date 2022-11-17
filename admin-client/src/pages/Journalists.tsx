import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";
import AuthContext from "../store/auth-context";
import { JournalistType } from "../types";

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
        const res = await fetch("http://localhost:5000/articles/pagination/0");
        const data: JournalistType[] = await res.json();
        setJournalists(() => [...data]);
      } catch (error) {
        setFetchError((prevErr) => !prevErr);
      }
    };
    fetchdArticles();
  }, []);

  return (
    <Layout>
      <div className="journalists">
        <div className="journalists__card">
          <div className="journalists__actions-container">
            <button className="journalists__action">Edit</button>
            <button className="journalists__action journalists__action--delete">
              Delete
            </button>
          </div>
          <div className="journalists__info">
            <h1>Rhyz Jovanni Arong</h1>
            <p>Software Engineer</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Journalists;
