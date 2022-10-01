import React, { FC, useEffect, useState } from "react";

export interface IAuth {
  isLoggedIn: boolean;
  onLogin: (credentials: { username: string; password: string }) => void;
  onLogOut: () => void;
}

const AuthContext = React.createContext<IAuth | null>(null);

export const AuthContextProvider: FC<{ children: any }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const storedUserLoggedInInformation =
      localStorage.getItem("admin_token_tt");

    if (storedUserLoggedInInformation) {
      setIsLoggedIn(true);
    }
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
      const token = await res.json();
      localStorage.setItem("admin_token_tt", token?.access_token);
      setIsLoggedIn((prevState) => true);
    } catch (error: any) {
      if (error) {
        console.error(error, "error occured?");
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
