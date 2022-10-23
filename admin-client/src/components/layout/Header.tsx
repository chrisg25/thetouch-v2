import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import touchIcon from "../../assets/touch-icon.png";

const Header = () => {
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

  const headerLogo =
    pathname === "/login" ? (
      <img src={touchIcon} alt="touch-icon" style={{ marginRight: "20px" }} />
    ) : null;

  return (
    <header className="header">
      {headerLogo}
      <h1 className="header__title">
        The Touch Admin |{" "}
        <span className="header__sub-title">{currPathName}</span>
      </h1>
      <div>
        <button className="header__logout">Logout</button>
      </div>
    </header>
  );
};

export default Header;
