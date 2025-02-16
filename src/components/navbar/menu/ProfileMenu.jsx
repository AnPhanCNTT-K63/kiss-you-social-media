import React, { useContext } from "react";
import { Menu, MenuItem } from "@mui/material";
import UserContext from "../../../UserContext";
import { Link, useNavigate } from "react-router-dom";

export default function ProfileMenu({ anchorEl, handleMenuClose, styles }) {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      className={styles.menu}
      classes={{ paper: styles.menuPaper }}
      disableScrollLock
    >
      <Link to={`/profile/${user._id}`} onClick={handleMenuClose}>
        <MenuItem className={styles.menuItem}>Trang Cá Nhân</MenuItem>
      </Link>
      <Link to={`/account`} onClick={handleMenuClose}>
        <MenuItem className={styles.menuItem}>Cài Đặt</MenuItem>
      </Link>
      {user?.role === "admin" && (
        <Link to={`/admin/dashboard`} onClick={handleMenuClose}>
          <MenuItem className={styles.menuItem}>Admin</MenuItem>
        </Link>
      )}
      {user?.role === "admin" && (
        <Link to={`/statistics`} onClick={handleMenuClose}>
          <MenuItem className={styles.menuItem}>Statistics</MenuItem>
        </Link>
      )}
      <MenuItem onClick={handleLogout} className={styles.menuItem}>
        Đăng Xuất
      </MenuItem>
    </Menu>
  );
}
