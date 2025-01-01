import React from "react";
import { Menu, MenuItem } from "@mui/material";
import styles from "../styles/navbar.module.css";

export default ProfileMenu = ({ anchorEl, handleMenuClose }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      className={styles.menu}
      classes={{ paper: styles.menuPaper }}
      disableScrollLock
    >
      <MenuItem onClick={handleMenuClose} className={styles.menuItem}>
        Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose} className={styles.menuItem}>
        Settings
      </MenuItem>
      <MenuItem onClick={handleMenuClose} className={styles.menuItem}>
        Logout
      </MenuItem>
    </Menu>
  );
};
