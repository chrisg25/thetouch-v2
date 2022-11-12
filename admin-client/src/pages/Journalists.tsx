import React from "react";
import Layout from "../components/layout";

const Journalists = () => {
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
