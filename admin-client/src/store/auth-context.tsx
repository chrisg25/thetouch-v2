import React, { FC, useEffect, useState } from "react";

export interface IAuth {
  isLoggedIn: boolean;
  onLogin: (credentials: { username: string; password: string }) => void;
  onLogOut: () => void;
  test: string;
}

const AuthContext = React.createContext<IAuth | null>(null);

export const AuthContextProvider: FC<{ children: any }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const authorizeUser = async () => {
      const token = localStorage.getItem("admin_token_tt");
      try {
        const response = await fetch("http://localhost:5000/auth", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data?.statusCode === 401) {
          localStorage.removeItem("admin_token_tt");
        }
      } catch (error) {
        setIsLoggedIn((prevState) => true);
      }
    };

    authorizeUser().catch((e) => console.log(e));
  }, []);

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
      if (error) {
      }
    }
  };

  const onLogOut = () => {
    setIsLoggedIn((prevState) => false);
    localStorage.removeItem("admin_token_tt");
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        onLogin,
        onLogOut,
        test: "wtf is not working?",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
