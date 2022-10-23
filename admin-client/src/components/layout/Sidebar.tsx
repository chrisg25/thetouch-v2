import React from "react";
import AddArticleIcon from "../icons/AddArticleIcon";
import AddJournalistIcon from "../icons/AddJournalistIcon";
import HomeIcon from "../icons/HomeIcon";
import touchIcon from "../../assets/touch-icon.png";
import { Link, NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const component =
    location.pathname !== "/login" ? (
      <div className="sidebar">
        <nav className="sidebar__nav">
          <ul>
            <NavLink to={"/"}>
              <li
                className={`sidebar__nav-item ${
                  location.pathname === "/" ? "sidebar__nav-item-active" : ""
                }`}
              >
                <HomeIcon />
              </li>
            </NavLink>
            <NavLink to={"/add-articles"}>
              <li
                className={`sidebar__nav-item ${
                  location.pathname === "/add-articles"
                    ? "sidebar__nav-item-active"
                    : ""
                }`}
              >
                <AddArticleIcon />
              </li>
            </NavLink>
            <NavLink to={"/add-journalists"}>
              <li
                className={`sidebar__nav-item ${
                  location.pathname === "/add-journalists"
                    ? "sidebar__nav-item-active"
                    : ""
                }`}
              >
                <AddJournalistIcon />
              </li>
            </NavLink>
          </ul>
          <img src={touchIcon} alt="touch-icon" />
        </nav>
      </div>
    ) : null;

  return component;
};

export default Sidebar;
