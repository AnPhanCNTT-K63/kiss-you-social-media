import styles from "../../styles/online-friends.module.css";

export default function OnlineFriends({
  onlineFriends,
  handleOpenChatBox,
  friends,
}) {
  return (
    <div className={styles.chatOnline}>
      {friends.map((friend) => {
        const isOnline = onlineFriends.some((o) => o._id === friend._id);

        return (
          <div
            key={friend._id}
            className={styles.chatOnlineFriend}
            onClick={() => handleOpenChatBox(friend._id)}
          >
            <div className={styles.chatOnlineImgContainer}>
              <img
                className={styles.chatOnlineImg}
                src={friend.profile?.avatar?.filePath || "/noAvatar.png"}
                alt={friend.username}
              />
              {isOnline && <div className={styles.chatOnlineBadge}></div>}
            </div>
            <span className={styles.chatOnlineName}>{friend?.username}</span>
          </div>
        );
      })}
    </div>
  );
}
