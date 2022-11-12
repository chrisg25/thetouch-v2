import { FC, Fragment, useContext } from "react";
import AddJournalist from "./pages/AddJournalist";
import { Routes, Route } from "react-router-dom";
import AddArticle from "./pages/AddArticle";
import Login from "./pages/Login";
import Home from "./pages/Home";

import AuthContext, { AuthContextProvider } from "./store/auth-context";
import Journalists from "./pages/Journalists";

const App: FC = () => {
  const context = useContext(AuthContext);
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/add-articles" element={<AddArticle />} />
        <Route path="/add-journalists" element={<AddJournalist />} />
        <Route path="/journalists" element={<Journalists />} />
      </Routes>
    </AuthContextProvider>
  );
};

export default App;
