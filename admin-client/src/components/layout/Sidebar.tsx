import React from "react";
import AddArticleIcon from "../icons/AddArticleIcon";
import AddJournalistIcon from "../icons/AddJournalistIcon";
import HomeIcon from "../icons/HomeIcon";
import touchIcon from "../../assets/touch-icon.png";
import { NavLink, useLocation } from "react-router-dom";
import Users from "../icons/Users";

const Sidebar = () => {
  const location = useLocation();

  const linkDetails = [
    { pathName: "/", icon: <HomeIcon /> },
    { pathName: "/article/add", icon: <AddArticleIcon /> },
    { pathName: "/journalist/add", icon: <AddJournalistIcon /> },
    { pathName: "/journalists", icon: <Users /> },
  ];

  const component =
    location.pathname !== "/login" ? (
      <div className="sidebar">
        <nav className="sidebar__nav">
          <ul>
            {linkDetails.map((link) => {
              return (
                <NavLink to={link.pathName}>
                  <li
                    className={`sidebar__nav-item ${
                      location.pathname === link.pathName
                        ? "sidebar__nav-item-active"
                        : ""
                    }`}
                  >
                    {link.icon}
                  </li>
                </NavLink>
              );
            })}
          </ul>
          <img src={touchIcon} alt="touch-icon" />
        </nav>
      </div>
    ) : null;

  return component;
};

export default Sidebar;
