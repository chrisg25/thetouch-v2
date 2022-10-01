import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import userLogo from "../assets/user-solid.svg";
import passwordLogo from "../assets/key-solid.svg";
// import touchIcon from "../assets/touch-icon.png";
import touchIcon from "../assets/touch-icon.png";
import AuthContext from "../store/auth-context";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (context?.isLoggedIn) {
      navigate("/");
    }
  }, [context?.isLoggedIn]);

  const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const login = () => {
    context?.onLogin(credentials);
  };

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
              name="username"
              className="login__input"
              type={"text"}
              placeholder="Username"
              onChange={onInputChangeHandler}
            />
          </div>
          <div className="login__input-container">
            <div className="login__input-icon-container">
              <img src={passwordLogo} alt="" />
            </div>
            <input
              name="password"
              className="login__input"
              type={"password"}
              placeholder="Password"
              onChange={onInputChangeHandler}
            />
          </div>
          <button className="login__button" onClick={login}>
            LOGIN
          </button>
        </section>
      </div>
      <footer className="login__footer">
        <h1>All Rights Reserved</h1>
      </footer>
    </>
  );
};

export default Login;
