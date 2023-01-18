import React, { FC, useContext, useState } from "react";
import ArticleContext from "../../store/article-context";

const InputErrorUI: FC = () => {
  return (
    <>
      <h1 className="add-articles__error-message">Field Required!</h1>
    </>
  );
};

export default InputErrorUI;
