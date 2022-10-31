import { ChangeEvent, useContext, useEffect, useState } from "react";
import userLogo from "../assets/user-solid.svg";
import passwordLogo from "../assets/key-solid.svg";
import AuthContext from "../store/auth-context";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";

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
    <Layout>
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
              onFocus={() => context?.removeError()}
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
              onFocus={() => context?.removeError()}
            />
          </div>
          <div>
            {context?.hasError && (
              <p className="login__error-message">Server is down!</p>
            )}
          </div>
          <button
            style={{ marginTop: `${context?.hasError ? "0px" : "29px"}` }}
            className="login__button"
            onClick={login}
          >
            LOGIN
          </button>
        </section>
      </div>
      <footer className="login__footer">
        <h1>All Rights Reserved</h1>
      </footer>
    </Layout>
  );
};

export default Login;
