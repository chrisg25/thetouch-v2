import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";
import AuthContext from "../store/auth-context";

const Journalists = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authContext?.isLoggedIn) {
      navigate("/login");
    }
  }, [authContext?.isLoggedIn]);
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
