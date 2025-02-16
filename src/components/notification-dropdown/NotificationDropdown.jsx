import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Divider,
  Popover,
  Badge,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import styles from "../../styles/notification-dropdown.module.css";
import { getNotifications } from "../../apis/services/NotificationService";
import UserContext from "../../UserContext";
import { formatDistanceToNow, format } from "date-fns";

const NotificationDropdown = () => {
  const user = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await getNotifications(user?._id);
      setNotifications(res.data.filter((n) => n.sender._id != user?._id));
      setUnreadCount(res.data.filter((n) => n.sender._id != user?._id).length);
    };
    fetchNotifications();
  }, []);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "notification-popover" : undefined;

  return (
    <div>
      <IconButton className={styles.iconButton} onClick={handleOpen}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon fontSize="large" />
        </Badge>
      </IconButton>

      <Popover
        disableScrollLock
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          style: { width: 300, position: "absolute", zIndex: 1300 },
        }}
      >
        <Box className={styles.notificationContainer}>
          <Typography variant="h6" className={styles.header}>
            Thông Báo Của Bạn
          </Typography>
          <Divider />
          <Box className={styles.notificationList}>
            {notifications.length > 0 ? (
              [...notifications].reverse().map((notification) => (
                <Box
                  key={notification.id}
                  className={`${styles.notificationItem} ${
                    notification.isRead ? "" : styles.unread
                  }`}
                >
                  <Avatar
                    alt="User Avatar"
                    src={
                      notification.sender.profile.avatar?.filePath ||
                      "noAvatar.png"
                    }
                    className={styles.avatar}
                  />
                  <Box ml={2}>
                    <Typography variant="body2" fontWeight="bold">
                      {notification.type === "like" &&
                        notification.sender.username +
                          " đã like bài viết của bạn"}
                      {notification.type === "comment" &&
                        notification.sender.username +
                          " đã bình luận vào bài viết của bạn"}
                      {notification.type === "share" &&
                        notification.sender.username +
                          " đã chia sẻ bài viết của bạn"}
                      {notification.type === "add-friend" &&
                        notification.sender.username + " đã kết bạn với bạn"}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {Date.now() - new Date(notification.createdAt).getTime() <
                      24 * 60 * 60 * 1000
                        ? formatDistanceToNow(
                            new Date(notification.createdAt),
                            {
                              addSuffix: true,
                            }
                          )
                        : format(
                            new Date(notification.createdAt),
                            "MMM d 'at' h:mm a"
                          )}
                    </Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography
                variant="body2"
                color="textSecondary"
                className={styles.noNotifications}
              >
                No new notifications
              </Typography>
            )}
          </Box>
        </Box>
      </Popover>
    </div>
  );
};

export default NotificationDropdown;
