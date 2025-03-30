import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import SignUp from "../../pages/sign-up/SignUp";
import SignIn from "../../pages/sign-in/SignIn";
import Home from "../../pages/home/Home";
import Messenger from "../../pages/messenger/Messenger";
import styles from "../../styles/scroll-up-button.module.css";
import Profile from "../../pages/profile/Profile";
import Admin from "../../pages/admin/Admin";
import Account from "../../pages/account/Account";
import UserManagement from "../user-manager/UserManagement";
import PostManagement from "../post-management/PostManagement";
import TrashPostManagement from "../trash-post/TrashPostManagement";
import Friend from "../../pages/friend/Friend";
import Statistics from "../../pages/statistics/Statistics";
import RegisterChart from "../statistics-graph/register-statistics/RegisterChart";

export default function Navigation() {
  const [showArrow, setShowArrow] = useState(false);
  const isAuthenticated = !!localStorage.getItem("token"); // Convert to boolean

  useEffect(() => {
    const handleScroll = () => {
      setShowArrow(window.scrollY > window.innerHeight / 2);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Routes>
        {/* Use a separate route for authentication check */}
        <Route path="/" element={isAuthenticated ? <Home /> : <SignIn />} />

        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/messenger" element={<Messenger />} />
        <Route path="/friends" element={<Friend />} />
        <Route path="/account" element={<Account />} />
        <Route path="/admin/dashboard" element={<Admin />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/user-manager" element={<UserManagement />} />
        <Route path="/post-manager" element={<PostManagement />} />
        <Route path="/trash-post" element={<TrashPostManagement />} />
        <Route path="/statistics/user/:year" element={<RegisterChart />} />
        <Route path="/messenger/:friendId" element={<Messenger />} />
        <Route path="/profile/:id/about" element={<Profile />} />
        <Route path="/profile/:id/friends" element={<Profile />} />
        <Route path="/profile/:id/photos" element={<Profile />} />
        <Route path="/profile/:id/check-ins" element={<Profile />} />
        <Route path="/profile/:id/more" element={<Profile />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>

      {showArrow && (
        <button onClick={handleScrollToTop} className={styles.button}>
          <ArrowCircleUpIcon fontSize="large" style={{ color: "white" }} />
        </button>
      )}
    </>
  );
}
