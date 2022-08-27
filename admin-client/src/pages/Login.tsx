import React from "react";
import userLogo from "../assets/user-solid.svg";
import passwordLogo from "../assets/key-solid.svg";
import Header from "../components/layout/Header";
import touchIcon from "../assets/touch-icon.png";

const Login = () => {
  return (
    <>
      <header
        className="header"
        style={{ display: "flex", alignItems: "center" }}
      >
        <img src={touchIcon} alt="touch-icon" style={{ marginRight: "20px" }} />
        <h1 className="header__title">
          The Touch Admin | <span className="header__sub-title">Login</span>
        </h1>
      </header>
      <div className="login">
        <section>
          <h1 className="login__title">
            Good day Admin! Please Login to access the dashboard
          </h1>
          <div className="login__input-container">
            <div className="login__input-icon-container">
              <img src={userLogo} alt="" />
            </div>
            <input
              className="login__input"
              type={"text"}
              placeholder="Username"
            />
          </div>
          <div className="login__input-container">
            <div className="login__input-icon-container">
              <img src={passwordLogo} alt="" />
            </div>
            <input
              className="login__input"
              type={"password"}
              placeholder="Password"
            />
          </div>
          <button className="login__button">LOGIN</button>
        </section>
      </div>
      <footer className="login__footer">
        <h1>All Rights Reserved</h1>
      </footer>
    </>
  );
};

export default Login;
