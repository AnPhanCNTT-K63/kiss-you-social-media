import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzZkNmJiOTFmNDlkMDdmOWRkM2U2ZTUiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6InBoYW5kdWNhbjE0N0BnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImFuZGVwdHJhaTEyMyIsImlhdCI6MTc0MzMxMzYyMiwiZXhwIjoxNzQ0MTc3NjIyfQ.gtR--sxJyXUg4ukrQKEhR9GVKgoaH4MqFGvAGCFP3tM";
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.log("No token found in localStorage or sessionStorage");
    }
    // console.log("Authorization header:", config.headers["Authorization"]);
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
