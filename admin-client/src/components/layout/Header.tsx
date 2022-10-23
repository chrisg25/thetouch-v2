import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import touchIcon from "../../assets/touch-icon.png";
import AuthContext, { AuthContextProvider } from "../../store/auth-context";

const Header = () => {
  const context = useContext(AuthContext);
  const { pathname } = useLocation();
  const [currPathName, setCurrPathName] = useState<string>("Home");

  useEffect(() => {
    setCurrPathName(() => {
      return pathname !== "/"
        ? pathname
            .replace("/", "")
            .split("-")
            .map((chr) => chr.charAt(0).toUpperCase() + chr.slice(1))
            .join(" ")
        : "Home";
    });
  }, []);

  const logoutButton = context?.isLoggedIn ? (
    <button className="header__logout" onClick={() => context.onLogOut()}>
      Logout
    </button>
  ) : (
    <div></div>
  );

  const headerLogo =
    pathname === "/login" ? (
      <img src={touchIcon} alt="touch-icon" style={{ marginRight: "20px" }} />
    ) : null;

  return (
    <AuthContextProvider>
      <header className="header">
        <div className="header__page-title">
          {headerLogo}
          <h1 className="header__title">
            The Touch Admin |
            <span className="header__sub-title">{currPathName}</span>
          </h1>
        </div>
        <div>{logoutButton}</div>
      </header>
    </AuthContextProvider>
  );
};

export default Header;
