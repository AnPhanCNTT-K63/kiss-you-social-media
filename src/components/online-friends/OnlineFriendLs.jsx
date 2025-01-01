import { useEffect, useState } from "react";
import styles from "../../styles/online-friends.module.css";
import { getAllFriends } from "../../apis/services/UserService";

export default function OnlineFriends({
  onlineUsers,
  currentId,
  setCurrentChat,
}) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await getAllFriends(currentId);

      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(
      friends.filter((f) => onlineUsers.some((user) => user.userId === f._id))
    );
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    // try {
    //   const res = await axios.get(
    //     `/conversations/find/${currentId}/${user._id}`
    //   );
    //   setCurrentChat(res.data);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <div className={styles.chatOnline}>
      {onlineFriends.map((o) => (
        <div
          key={o._id}
          className={styles.chatOnlineFriend}
          onClick={() => handleClick(o)}
        >
          <div className={styles.chatOnlineImgContainer}>
            <img
              className={styles.chatOnlineImg}
              src={"/noAvatar.png"}
              alt=""
            />
            <div className={styles.chatOnlineBadge}></div>
          </div>
          <span className={styles.chatOnlineName}>{o?.username}</span>
        </div>
      ))}
    </div>
  );
}
