import React, { useContext, useEffect, useState } from "react";
import {
  Toolbar,
  Typography,
  Box,
  InputBase,
  IconButton,
  Avatar,
  Badge,
} from "@mui/material";
import {
  Search as SearchIcon,
  Home as HomeIcon,
  Chat as ChatIcon,
  People as PeopleIcon,
  Storefront as StorefrontIcon,
  OndemandVideo,
} from "@mui/icons-material";
import styles from "../../styles/navbar.module.css";
import { Link } from "react-router-dom";
import ProfileMenu from "./menu/ProfileMenu";
import UserContext from "../../UserContext";
import { getById, ping } from "../../apis/services/UserService";
import NotificationDropdown from "../notification-dropdown/NotificationDropdown";

const Navbar = () => {
  const user = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const res = await ping(user?._id);
      } catch (error) {
        console.error("Error in heartbeat:", error.message || error);
      }
    }, process.env.REACT_APP_REFRESH_TIME);

    return () => {
      clearInterval(intervalId);
    };
  }, [user?._id]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getById(user?._id);
      setCurrentUser(res.data);
    };
    fetchUser();
  }, []);

  localStorage.setItem(
    "avatar",
    currentUser?.profile?.avatar?.filePath || "/noAvatar.png"
  );
  localStorage.setItem(
    "coverPhoto",
    currentUser?.profile?.coverPhoto?.filePath
  );

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
          <Link to={`/`}>
            <IconButton className={styles.iconButton}>
              <HomeIcon fontSize="large" />
            </IconButton>
          </Link>
          <Link to={`/friends`}>
            <IconButton className={styles.iconButton}>
              <PeopleIcon fontSize="large" />
            </IconButton>
          </Link>

          <IconButton className={styles.iconButton}>
            <OndemandVideo fontSize="large" />
          </IconButton>
          <IconButton className={styles.iconButton}>
            <StorefrontIcon fontSize="large" />
          </IconButton>
        </Box>

        {/* Right Icons */}
        <Box className={styles.iconContainer}>
          <Link to={`/messenger`}>
            <IconButton className={styles.iconButton}>
              <Badge color="error">
                <ChatIcon fontSize="large" />
              </Badge>
            </IconButton>
          </Link>

          <NotificationDropdown />

          <IconButton onClick={handleMenuOpen}>
            <Avatar
              alt="Profile Picture"
              src={localStorage.getItem("avatar")}
              className={styles.avatar}
            />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Dropdown Menu for Profile */}
      <ProfileMenu
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
        styles={styles}
      />
    </div>
  );
};

export default Navbar;
