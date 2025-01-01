import PostList from "../../components/posts/PostList";
import { io } from "socket.io-client";
import { useState, useContext, useEffect, useRef } from "react";
import UserContext from "../../UserContext";
import styles from "../../styles/home.module.css";
import OnlineFriends from "../../components/online-friends/OnlineFriendLs";
import LeftBar from "../../components/left-bar/LeftBar";

export default function Home() {
  const socket = useRef();
  const user = useContext(UserContext);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.current = io("ws://localhost:3002");
  }, []);

  useEffect(() => {
    if (!user) return;
  });

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  return (
    <>
      <div>
        <LeftBar />
      </div>
      <div>
        <PostList />
      </div>
      <div>
        <div>
          <OnlineFriends onlineUsers={onlineUsers} currentId={user._id} />
        </div>
      </div>
    </>
  );
}
