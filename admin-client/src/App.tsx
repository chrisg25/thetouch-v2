import { FC } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import AddArticles from "./pages/AddArticles";
import AddJournalist from "./pages/AddJournalist";

const App: FC = () => {
  return (
    <>
      <Sidebar />
      <Header />
      <AddArticles />
    </>
  );
};

export default App;
