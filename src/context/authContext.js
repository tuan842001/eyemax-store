import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../axios";
// import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("nguoidung")) || null
  );

  const login = async (inputs) => {
    const res = await makeRequest.post("/auth/loginUser", inputs, {
      withCredentials: true,
    });
    setCurrentUser(res.data);
  };

  const logout = async (inputs) => {
    await makeRequest.post("/auth/logout");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("nguoidung", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
