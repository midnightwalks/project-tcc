// src/auth/useAuth.js
// import { useContext } from "react";
import { useAuthContext } from "./AuthProvider";

const useAuth = () => {
  const { accessToken, login, logout, refreshAccessToken } = useAuthContext();

  return {
    accessToken,
    login,
    logout,
    refreshAccessToken,
    isAuthenticated: !!accessToken,
  };
};

export default useAuth;
