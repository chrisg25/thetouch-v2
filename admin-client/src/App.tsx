import { FC, Fragment } from "react";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import AddArticles from "./pages/AddArticles";
import AddJournalist from "./pages/AddJournalist";
import { Routes, Route } from "react-router-dom";
import AddArticle from "./pages/AddArticle";

const App: FC = () => {
  return (
    <Fragment>
      <Sidebar />
      <Header />
      <Routes>
        <Route path="/" element={<AddArticle />} />
        <Route path="/add-articles" element={<AddArticles />} />
        <Route path="/add-journalists" element={<AddJournalist />} />
      </Routes>
    </Fragment>
  );
};

export default App;
