import { FC, Fragment } from "react";
import AddJournalist from "./pages/AddJournalist";
import { Routes, Route } from "react-router-dom";
import AddArticle from "./pages/AddArticle";
import Layout from "./components/layout";
import Login from "./pages/Login";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route path="/add-articles" element={<AddArticle />} />
        <Route path="/add-journalists" element={<AddJournalist />} />
      </Route>
    </Routes>
  );
};

export default App;
