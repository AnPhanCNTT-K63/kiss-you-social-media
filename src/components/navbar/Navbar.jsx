import React from "react";
import {
  Toolbar,
  Typography,
  Box,
  InputBase,
  IconButton,
  Avatar,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Search as SearchIcon,
  Home as HomeIcon,
  Notifications as NotificationsIcon,
  Chat as ChatIcon,
  People as PeopleIcon,
  Storefront as StorefrontIcon,
  OndemandVideo,
} from "@mui/icons-material";
import styles from "../../styles/navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div position="sticky" className={styles.appBar}>
      <Toolbar>
        {/* Logo */}
        <Link to={`/home`} style={{ textDecoration: "none" }}>
          <Typography variant="h6" className={styles.logo}>
            KissYou
          </Typography>
        </Link>

        {/* Search Bar */}
        <Box className={styles.searchContainer}>
          <Box className={styles.searchBox}>
            <SearchIcon className={styles.searchIcon} />
            <InputBase placeholder="Search..." className={styles.searchInput} />
          </Box>
        </Box>

        {/* Centered Icons */}
        <Box className={styles.iconContainerCenter}>
          <IconButton className={styles.iconButton}>
            <HomeIcon fontSize="large" />
          </IconButton>
          <IconButton className={styles.iconButton}>
            <PeopleIcon fontSize="large" />
          </IconButton>
          <IconButton className={styles.iconButton}>
            <OndemandVideo fontSize="large" />
          </IconButton>
          <IconButton className={styles.iconButton}>
            <StorefrontIcon fontSize="large" />
          </IconButton>
        </Box>

        {/* Right Icons */}
        <Box className={styles.iconContainer}>
          <IconButton className={styles.iconButton}>
            <Badge badgeContent={4} color="error">
              <ChatIcon fontSize="large" />
            </Badge>
          </IconButton>
          <IconButton className={styles.iconButton}>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon fontSize="large" />
            </Badge>
          </IconButton>
          <IconButton onClick={handleMenuOpen}>
            <Avatar
              alt="Profile Picture"
              src="/noAvatar.png"
              className={styles.avatar}
            />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Dropdown Menu for Profile */}
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
    </div>
  );
};

export default Navbar;
