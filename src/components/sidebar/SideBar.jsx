import React from "react";
import styles from "../../styles/sidebar.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { FaHome, FaUsers, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <div className={styles.sideBar}>
      <div className={styles.logo}></div>
      <div className={styles.menu}>
        <Link to={"/"}>
          <div className={styles.menuItem}>
            <FaHome className={styles.icon} />
            <span className={styles.menuText}>Trang chủ</span>
          </div>
        </Link>
        <Link to={"/friends"}>
          <div className={styles.menuItem}>
            <FaUsers className={styles.icon} />
            <span className={styles.menuText}>Tìm kiếm bạn bè</span>
          </div>
        </Link>
        <Link to={`/trash-post`}>
          <div className={styles.menuItem}>
            <DeleteIcon className={styles.icon} />
            <span className={styles.menuText}>Bài viết đã xóa</span>
          </div>
        </Link>
        <Link to={`/account`}>
          <div className={styles.menuItem}>
            <FaCog className={styles.icon} />
            <span className={styles.menuText}>Cài đặt</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
