import React, { FC } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout: FC<{ children?: any }> = ({ children }) => {
  return (
    <>
      <Sidebar />
      <Header />
      {children}
      <Outlet />
    </>
  );
};

export default Layout;
