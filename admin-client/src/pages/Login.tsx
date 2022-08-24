import React from "react";
import CustomInput from "../components/inputs/CustomInput";

const Login = () => {
  return (
    <div>
      <h1>Good day Admin! Please Login to access the dashboard</h1>
      <input type={"text"} placeholder="User Name" />
      <input type={"password"} placeholder="Password" />
    </div>
  );
};

export default Login;
