import styles from "../../styles/message.module.css";
import { formatDistanceToNow, format } from "date-fns";

export default function Message({ message, own }) {
  const createdAt = new Date(message.createdAt);
  const timeDisplay =
    Date.now() - createdAt.getTime() < 24 * 60 * 60 * 1000
      ? formatDistanceToNow(createdAt, { addSuffix: true }) // "2 hours ago"
      : format(createdAt, "MMM d 'at' h:mm a"); // "Dec 28 at 3:45 PM"

  return (
    <div className={own ? `${styles.message} ${styles.own}` : styles.message}>
      <div className={styles.messageTop}>
        <img
          className={styles.messageImg}
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <p className={styles.messageText}>{message.text}</p>
      </div>
      <div className={styles.messageBottom}>{timeDisplay}</div>
    </div>
  );
}
