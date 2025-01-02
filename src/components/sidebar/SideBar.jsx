import React from "react";
import styles from "../../styles/sidebar.module.css";
import { FaHome, FaUsers, FaBell, FaCog, FaBookmark } from "react-icons/fa";

export default function SideBar() {
  return (
    <div className={styles.sideBar}>
      <div className={styles.logo}></div>
      <div className={styles.menu}>
        <div className={styles.menuItem}>
          <FaHome className={styles.icon} />
          <span className={styles.menuText}>Home</span>
        </div>
        <div className={styles.menuItem}>
          <FaUsers className={styles.icon} />
          <span className={styles.menuText}>Friends</span>
        </div>
        <div className={styles.menuItem}>
          <FaBell className={styles.icon} />
          <span className={styles.menuText}>Notifications</span>
        </div>
        <div className={styles.menuItem}>
          <FaBookmark className={styles.icon} />
          <span className={styles.menuText}>Saved</span>
        </div>
        <div className={styles.menuItem}>
          <FaCog className={styles.icon} />
          <span className={styles.menuText}>Settings</span>
        </div>
      </div>
    </div>
  );
}
