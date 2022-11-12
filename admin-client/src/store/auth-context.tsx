import React, { FC, useEffect, useState } from "react";

export interface IAuth {
  isLoggedIn: boolean;
  hasError: boolean;
  onLogin: (credentials: { username: string; password: string }) => void;
  onLogOut: () => void;
  removeError: () => void;
}

const AuthContext = React.createContext<IAuth | null>(null);

export const AuthContextProvider: FC<{ children: any }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const authorizeUser = async () => {
      try {
        const token = localStorage.getItem("admin_token_tt");
        const response = await fetch("http://localhost:5000/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 201) {
          setIsLoggedIn((prevState) => true);
        }
        if (response.status === 401) {
          setIsLoggedIn((prevState) => false);
          localStorage.removeItem("admin_token_tt");
        }
      } catch (error) {
        console.log(error);
        localStorage.removeItem("admin_token_tt");
      }
    };

    authorizeUser();
  }, [isLoggedIn]);

  const onLogin = async (credentials: {
    username: string;
    password: string;
  }) => {
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      if (data?.statusCode !== 401) {
        localStorage.setItem("admin_token_tt", data?.access_token);
        setIsLoggedIn(true);
      }
    } catch (error: any) {
      setHasError((prevState) => true);
    }
  };

  const onLogOut = () => {
    setIsLoggedIn((prevState) => false);
    localStorage.removeItem("admin_token_tt");
  };

  const removeError = () => {
    setHasError((prevState) => false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        hasError,
        onLogin,
        onLogOut,
        removeError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
