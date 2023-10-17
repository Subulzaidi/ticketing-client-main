import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

// Create AuthContext
export const AuthContext = createContext();

axios.defaults.baseURL = "http://localhost:9000/api";

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    let data = localStorage.getItem("auth");
    if (data) {
      setAuth(JSON.parse(data));
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};
