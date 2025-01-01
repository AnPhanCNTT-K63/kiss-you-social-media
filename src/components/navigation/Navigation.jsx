import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import SignUp from "../../pages/sign-up/SignUp";
import SignIn from "../../pages/sign-in/SignIn";
import Home from "../../pages/home/Home";
import Messenger from "../../pages/messenger/Messenger";
import styles from "../../styles/scroll-up-button.module.css";

export default function Navigation() {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 2) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
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
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/messenger" element={<Messenger />} />
      </Routes>

      {showArrow && (
        <button onClick={handleScrollToTop} className={styles.button}>
          <ArrowCircleUpIcon fontSize="large" style={{ color: "white" }} />
        </button>
      )}
    </>
  );
}
