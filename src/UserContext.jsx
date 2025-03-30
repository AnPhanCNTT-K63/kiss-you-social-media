import React, { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const token =
    localStorage.getItem("token") ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzZkNmJiOTFmNDlkMDdmOWRkM2U2ZTUiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6InBoYW5kdWNhbjE0N0BnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImFuZGVwdHJhaTEyMyIsImlhdCI6MTc0MzMxMzYyMiwiZXhwIjoxNzQ0MTc3NjIyfQ.gtR--sxJyXUg4ukrQKEhR9GVKgoaH4MqFGvAGCFP3tM";
  const initialUser = token
    ? (() => {
        const decodedToken = jwtDecode(token);
        return {
          username: decodedToken.username,
          role: decodedToken.role,
          _id: decodedToken._id,
          email: decodedToken.email,
        };
      })()
    : null;

  const [user, setUser] = useState(initialUser);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserContext;
