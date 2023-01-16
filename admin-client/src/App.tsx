import { FC, Fragment, useContext } from "react";
import AddJournalist from "./pages/AddJournalist";
import { Routes, Route } from "react-router-dom";
import AddArticle from "./pages/AddArticle";
import Login from "./pages/Login";
import Home from "./pages/Home";

import AuthContext, { AuthContextProvider } from "./store/auth-context";
import Journalists from "./pages/Journalists";
import { ArticleContextProvider } from "./store/article-context";

const App: FC = () => {
  const context = useContext(AuthContext);
  return (
    <AuthContextProvider>
      <ArticleContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/article/:action" element={<AddArticle />} />
          <Route path="/journalist/:action" element={<AddJournalist />} />
          <Route path="/journalists" element={<Journalists />} />
        </Routes>
      </ArticleContextProvider>
    </AuthContextProvider>
  );
};

export default App;
