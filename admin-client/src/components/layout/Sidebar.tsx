import React from "react";
import AddArticleIcon from "../icons/AddArticleIcon";
import AddJournalistIcon from "../icons/AddJournalistIcon";
import HomeIcon from "../icons/HomeIcon";
import touchIcon from "../../assets/touch-icon.png";
import { Link, NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="sidebar">
      <nav className="sidebar__nav">
        <ul>
          <li
            className={`sidebar__nav-item ${
              location.pathname === "/" ? "sidebar__nav-item-active" : ""
            }`}
          >
            <NavLink to={"/"}>
              <HomeIcon />
            </NavLink>
          </li>
          <li
            className={`sidebar__nav-item ${
              location.pathname === "/add-articles"
                ? "sidebar__nav-item-active"
                : ""
            }`}
          >
            <NavLink to={"/add-articles"}>
              <AddArticleIcon />
            </NavLink>
          </li>
          <li
            className={`sidebar__nav-item ${
              location.pathname === "/add-journalists"
                ? "sidebar__nav-item-active"
                : ""
            }`}
          >
            <NavLink to={"/add-journalists"}>
              <AddJournalistIcon />
            </NavLink>
          </li>
        </ul>
        <img src={touchIcon} alt="touch-icon" />
      </nav>
    </div>
  );
};

export default Sidebar;
