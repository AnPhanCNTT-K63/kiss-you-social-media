import React, { useEffect, useState, useContext, useRef } from "react";
import UserContext from "../../UserContext";
import ChangePasswordSection from "../../components/setting/ChangePassword";
import EditUsernameSection from "../../components/setting/EditUsername";
import ChangeEmailSection from "../../components/setting/ChangeEmail";
import NotificationsSection from "../../components/setting/NotificationSection";
import DangerZoneSection from "../../components/setting/DangerSection";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Divider,
  Card,
  CardContent,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./UseStyles";
import { getById, updateAccount } from "../../apis/services/UserService";

const Account = () => {
  const [info, setInfo] = useState({});
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const originalInfoRef = useRef({});

  const handleChangeUsername = (newUsername) => {
    setUsername(newUsername);
  };

  const handleChangeEmail = (newEmail) => {
    setEmail(newEmail);
  };

  const handleChangePassword = (newPassword) => {
    setPassword(newPassword);
  };

  useEffect(() => {
    const fetchAccountInfo = async () => {
      const res = await getById(user?._id);
      setInfo(res.data);
      originalInfoRef.current = res.data;
      setUsername(info.username || "");
      setEmail(info.email || "");
    };
    fetchAccountInfo();
  }, [user?._id]);

  const classes = useStyles();

  const handleAction = async () => {
    const userInfo = {
      username: username,
      email: email,
      password: password,
    };
    console.log(userInfo);
    try {
      await updateAccount(user?._id, userInfo);
      setOpenLogoutDialog(true);
    } catch (err) {
      console.error("Error updating account:", err);
      setSnackbarMessage("Error updating account. Please try again.");
      setOpenSnackbar(true);
    }
  };

  const handleCancel = () => {
    const original = originalInfoRef.current;
    setUsername(original.username || "");
    setEmail(original.email || "");
    setPassword("");
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
    window.location.reload();
    setOpenLogoutDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenLogoutDialog(false);
  };

  return (
    <Box className={classes.container} sx={{ marginTop: "50px" }}>
      {/* User Info Header */}
      <Box className={classes.header}>
        <Avatar
          className={classes.avatar}
          src={info.profile?.avatar?.filePath || "/noAvatar.png"}
          alt="User Avatar"
        />
        <Box>
          <Typography variant="h5" fontWeight="bold">
            {info.profile?.firstName} {info.profile?.lastName}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Là thành viên từ:{" "}
            {info.createdAt
              ? new Date(info.createdAt).toLocaleDateString()
              : "N/A"}
          </Typography>
        </Box>
      </Box>

      <Divider style={{ marginBottom: "30px" }} />

      {/* Account Settings Sections */}
      <Card className={classes.card}>
        <Box className={classes.sectionHeader}>
          <Typography variant="h6">Cài Đặt Tài Khoản</Typography>
        </Box>
        <CardContent className={classes.sectionContent}>
          <Typography variant="body1" color="textPrimary" fontWeight="bold">
            Quản Lý Cài Đặt
          </Typography>
          <Divider style={{ margin: "15px 0" }} />
          <Box display="flex" flexDirection="column" gap={2}>
            {/* Username Section */}
            <EditUsernameSection
              currentUserId={user?._id}
              currentUsername={info.username}
              handleChangeUsername={handleChangeUsername}
            />
            {/* Email Section */}
            <ChangeEmailSection
              currentUserId={user?._id}
              currentEmail={info.email}
              handleChangeEmail={handleChangeEmail}
            />
            {/* Password Section */}
            <ChangePasswordSection
              currentUserId={user?._id}
              handleChangePassword={handleChangePassword}
            />
          </Box>
        </CardContent>
      </Card>

      <NotificationsSection classes={classes} />
      <DangerZoneSection classes={classes} currentUserId={user?._id} />

      <Divider style={{ margin: "20px 0" }} />
      <Box display="flex" justifyContent="flex-end" gap={2}>
        {/* Cancel Button */}
        <Button variant="outlined" color="secondary" onClick={handleCancel}>
          Reset
        </Button>
        {/* Save Button */}
        <Button variant="contained" color="primary" onClick={handleAction}>
          Save
        </Button>
      </Box>

      {/* Snackbar for alert */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          sx={{
            width: "100%",
            fontSize: "1.25rem",
            padding: "20px",
            textAlign: "center",
            backgroundColor: "#f44336",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={openLogoutDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Log Out?"}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Changes were made. You will need to log in again. Do you want to log
            out now?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="secondary" autoFocus>
            Log Out
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Account;
