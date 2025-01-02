import { io } from "socket.io-client";
import { useState, useContext, useEffect, useRef } from "react";
import UserContext from "../../UserContext";
import styles from "../../styles/home.module.css";
import OnlineFriends from "../../components/online-friends/OnlineFriendLs";
import Feed from "../../components/feed/Feed";
import SideBar from "../../components/sidebar/SideBar";

export default function Home() {
  const socket = useRef();
  const user = useContext(UserContext);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.current = io("ws://localhost:3002");
  }, []);

  useEffect(() => {
    if (!user) return;
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  return (
    <div className={styles.homePage}>
      <div className={styles.leftSidebar}>
        <SideBar />
      </div>
      <div className={styles.middleContent}>
        <Feed />
      </div>
      <div className={styles.rightSidebar}>
        <OnlineFriends onlineUsers={onlineUsers} currentId={user._id} />
      </div>
    </div>
  );
}
