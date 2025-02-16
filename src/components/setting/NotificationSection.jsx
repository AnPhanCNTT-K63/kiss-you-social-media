import React, { useState } from "react";
import { Box, Typography, Button, Divider, Card } from "@mui/material";

const NotificationsSection = ({ classes }) => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    promotional: true,
    security: true,
  });

  const handleToggle = (type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <Card className={classes.card}>
      <Box>
        <Box className={classes.sectionHeader}>
          <Typography variant="h6">Thông báo</Typography>
        </Box>
        <Box className={classes.sectionContent}>
          <Typography variant="body1" color="textPrimary" fontWeight="bold">
            Thiết lập tùy chọn thông báo cho tài khoản của bạn.
          </Typography>
          <Divider style={{ margin: "15px 0" }} />
          <Box display="flex" flexDirection="column" gap={2}>
            {/* Thông báo qua Email */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2">
                Thông báo qua Email: {notifications.email ? "Bật" : "Tắt"}
              </Typography>
              <Button
                size="small"
                className={
                  notifications.email
                    ? classes.warningButton
                    : classes.actionButton
                }
                onClick={() => handleToggle("email")}
              >
                {notifications.email ? "Tắt" : "Bật"}
              </Button>
            </Box>

            {/* Thông báo qua SMS */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2">
                Thông báo qua SMS: {notifications.sms ? "Bật" : "Tắt"}
              </Typography>
              <Button
                size="small"
                className={
                  notifications.sms
                    ? classes.warningButton
                    : classes.actionButton
                }
                onClick={() => handleToggle("sms")}
              >
                {notifications.sms ? "Tắt" : "Bật"}
              </Button>
            </Box>

            {/* Thông báo đẩy */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2">
                Thông báo đẩy: {notifications.push ? "Bật" : "Tắt"}
              </Typography>
              <Button
                size="small"
                className={
                  notifications.push
                    ? classes.warningButton
                    : classes.actionButton
                }
                onClick={() => handleToggle("push")}
              >
                {notifications.push ? "Tắt" : "Bật"}
              </Button>
            </Box>

            {/* Ưu đãi khuyến mãi */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2">
                Ưu đãi khuyến mãi: {notifications.promotional ? "Bật" : "Tắt"}
              </Typography>
              <Button
                size="small"
                className={
                  notifications.promotional
                    ? classes.warningButton
                    : classes.actionButton
                }
                onClick={() => handleToggle("promotional")}
              >
                {notifications.promotional ? "Tắt" : "Bật"}
              </Button>
            </Box>

            {/* Cảnh báo bảo mật */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2">
                Cảnh báo bảo mật: {notifications.security ? "Bật" : "Tắt"}
              </Typography>
              <Button
                size="small"
                className={
                  notifications.security
                    ? classes.warningButton
                    : classes.actionButton
                }
                onClick={() => handleToggle("security")}
              >
                {notifications.security ? "Tắt" : "Bật"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default NotificationsSection;
