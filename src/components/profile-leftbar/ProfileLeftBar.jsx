import React from "react";
import styles from "../../styles/profile-leftbar.module.css";
import { Link } from "react-router-dom";

const ProfileLeftBar = ({ userFriends }) => {
  return (
    <div className={styles.leftBar}>
      <h3 className={styles.title}>Bạn Bè</h3>
      <ul className={styles.friendList}>
        {userFriends.map((friend) => (
          <Link to={`/profile/${friend._id}`}>
            <li key={friend._id} className={styles.friendItem}>
              <img
                src={friend.profile?.avatar?.filePath || "/noAvatar.png"}
                alt={friend.username}
                className={styles.friendPic}
              />
              <span className={styles.friendName}>{friend.username}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ProfileLeftBar;
