import { FC, Fragment } from "react";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import AddJournalist from "./pages/AddJournalist";
import { Routes, Route } from "react-router-dom";
import AddArticle from "./pages/AddArticle";
import Layout from "./components/layout";

const App: FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AddArticle />} />
        <Route path="/add-journalists" element={<AddJournalist />} />
      </Routes>
    </Layout>
  );
};

export default App;
