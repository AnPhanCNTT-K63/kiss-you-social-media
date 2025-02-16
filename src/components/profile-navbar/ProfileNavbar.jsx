import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/profile-navbar.module.css";

export default function ProfileNavbar({ id, location }) {
  return (
    <div className={styles.navBar}>
      <ul className={styles.navList}>
        <li
          className={`${styles.navItem} ${
            location.pathname === `/profile/${id}` ? styles.active : ""
          }`}
        >
          <Link to={`/profile/${id}`} className={styles.navLink}>
            Bài Viết
          </Link>
        </li>
        <li
          className={`${styles.navItem} ${
            location.pathname === `/profile/${id}/about` ? styles.active : ""
          }`}
        >
          <Link to={`/profile/${id}/about`} className={styles.navLink}>
            Thông Tin
          </Link>
        </li>
        <li
          className={`${styles.navItem} ${
            location.pathname === `/profile/${id}/friends` ? styles.active : ""
          }`}
        >
          <Link to={`/profile/${id}/friends`} className={styles.navLink}>
            Bạn Bè
          </Link>
        </li>
        <li
          className={`${styles.navItem} ${
            location.pathname === `/profile/${id}/photos` ? styles.active : ""
          }`}
        >
          <Link to={`/profile/${id}/photos`} className={styles.navLink}>
            Ảnh
          </Link>
        </li>
        <li
          className={`${styles.navItem} ${
            location.pathname === `/profile/${id}/check-ins`
              ? styles.active
              : ""
          }`}
        >
          <Link to={`/profile/${id}/check-ins`} className={styles.navLink}>
            Check-ins
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to={`/profile/${id}/more`} className={styles.navLink}>
            Thêm
          </Link>
        </li>
      </ul>
    </div>
  );
}
