import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../UserContext";
import OnlineFriends from "../../components/online-friends/OnlineFriendLs";
import { getAllFriends } from "../../apis/services/UserService";
import styles from "../../styles/right-sidebar.module.css";
import { getSocket } from "../../socket";
import {
  createConversation,
  getConversations,
} from "../../apis/services/ChatService";

export default function RightSidebar() {
  const socket = getSocket();
  const user = useContext(UserContext);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConversation = async () => {
      const res = await getConversations(user?._id);
      setConversations(res.data);
    };
    fetchConversation();
  }, []);

  useEffect(() => {
    if (user?._id) {
      socket.emit("addUser", user._id);
    }

    socket.on("getUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("getUsers");
    };
  }, [user, socket]);

  useEffect(() => {
    const fetchFriends = async () => {
      const res = await getAllFriends(user._id);
      setFriends(res.data);
    };
    if (user._id) fetchFriends();
  }, [user._id]);

  useEffect(() => {
    setOnlineFriends(
      friends.filter((f) => onlineUsers.some((user) => user.userId === f._id))
    );
  }, [friends, onlineUsers]);

  const handleOpenChatBox = async (friendId) => {
    if (conversations.find((c) => c.members.includes(friendId)))
      navigate(`/messenger/${friendId}`);
    else {
      await createConversation({ senderId: user?._id, receiverId: friendId });
      navigate(`/messenger/${friendId}`);
    }
  };

  return (
    <div className={styles.rightSidebar}>
      <div className={styles.onlineFriends}>
        <OnlineFriends
          friends={friends}
          onlineFriends={onlineFriends}
          handleOpenChatBox={handleOpenChatBox}
        />
      </div>
    </div>
  );
}
