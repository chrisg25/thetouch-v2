import React from "react";
import AddArticleIcon from "./icons/AddArticleIcon";
import AddJournalistIcon from "./icons/AddJournalistIcon";
import HomeIcon from "./icons/HomeIcon";
import touchIcon from "../assets/touch-icon.png";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav className="sidebar__nav">
        <ul>
          <li className="sidebar__nav-item sidebar__nav-item-active">
            <HomeIcon />
          </li>
          <li className="sidebar__nav-item">
            <AddArticleIcon />
          </li>
          <li className="sidebar__nav-item">
            <AddJournalistIcon />
          </li>
        </ul>
        <img src={touchIcon} alt="touch-icon" />
      </nav>
    </div>
  );
};

export default Sidebar;
