import { useEffect, useState } from "react";
import styles from "../../styles/message.module.css";
import { formatDistanceToNow, format } from "date-fns";
import { getById } from "../../apis/services/UserService";

export default function Message({ message, own, currentUser, friend }) {
  const [friendd, setFriend] = useState({});
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchFriend = async () => {
      try {
        const res = await getById(friend);
        setFriend(res.data);
      } catch (error) {
        console.error("Error fetching friend data:", error);
      }
    };

    if (friend) {
      fetchFriend();
    }
  }, [friend]);

  const createdAt = new Date(message.createdAt);
  const timeDisplay =
    Date.now() - createdAt.getTime() < 24 * 60 * 60 * 1000
      ? formatDistanceToNow(createdAt, { addSuffix: true })
      : format(createdAt, "MMM d 'at' h:mm a");

  const imageUrl = own
    ? currentUser?.profile?.avatar?.filePath || "/noAvatar.png"
    : friendd?.profile?.avatar?.filePath || "/noAvatar.png";

  const handleImageError = (e) => {
    e.target.src = "/noAvatar.png";
  };

  return (
    <div className={own ? `${styles.message} ${styles.own}` : styles.message}>
      <div className={styles.messageTop}>
        <img
          className={styles.messageImg}
          src={imageUrl}
          alt={own ? "Your profile" : "Friend's profile"}
          onError={handleImageError}
          onLoad={() => setImageLoaded(true)}
          style={{ opacity: imageLoaded ? 1 : 0 }}
        />
        <div className={styles.messageText}>{message.text}</div>
      </div>
      <div className={styles.messageBottom}>{timeDisplay}</div>
    </div>
  );
}
