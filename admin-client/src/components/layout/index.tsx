import React, { FC } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout: FC<{ children?: any }> = ({ children }) => {
  return (
    <>
      <Sidebar />
      <Header />
      {children}
    </>
  );
};

export default Layout;
