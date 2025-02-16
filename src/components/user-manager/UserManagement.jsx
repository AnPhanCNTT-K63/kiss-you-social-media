import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  Avatar,
  IconButton,
  Snackbar,
  Alert,
  TextField,
} from "@mui/material";
import { Visibility, Block, AccountCircle } from "@mui/icons-material";
import { useStyles } from "./UseStyles";
import FilterBox from "../filter-box/FilterBox";
import {
  getAll,
  setSoftDelete,
  updateBanUser,
} from "../../apis/services/UserService";

const UserManagement = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    try {
      const response = await getAll({ username: searchQuery });
      setUsers(response.data);
      setAllUsers(response.data);
    } catch (error) {
      console.error("Failed to search:", error);
    }
  };

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAll();
        setUsers(response.data);
        setAllUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
    const intervalId = setInterval(fetchUsers, 30000);
    return () => clearInterval(intervalId);
  }, []);

  const handleFilter = async (filterType) => {
    try {
      let res;
      switch (filterType) {
        case "all":
          res = await getAll();
          break;
        case "online":
          res = await getAll({ isOnline: true });
          break;
        case "offline":
          res = await getAll({ isOnline: false });
          break;
        case "banned":
          res = await getAll();
          break;
        case "softDeleted":
          res = await getAll({ isDeleted: true });
          break;
        case "blockedProfile":
          res = await getAll();
          break;
        default:
          throw new Error("Invalid filter type");
      }
      setUsers(res.data);
      setAllUsers(res.data);
    } catch (error) {}
  };

  const handleViewUser = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const restoreUserAccount = async (userId) => {
    const confirmRestore = await Swal.fire({
      title: "Bạn chắc không?",
      text: "Phục hồi tài khoản!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, restore it!",
    });
    if (confirmRestore.isConfirmed) {
      try {
        const res = await setSoftDelete(userId, 0);
        if (res.message === "OK") {
          Swal.fire("Restored!", "Tài khoản đã phục hồi", "success");
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === userId ? { ...user, isDeleted: false } : user
            )
          );
        }
      } catch (error) {
        Swal.fire("Error!", "Failed to restore user account.", "error");
      }
    }
  };

  const onBanUser = async (user_id) => {
    const result = await Swal.fire({
      title: "Bạn có chắc?",
      text: "Bạn có chắc muốn ban người này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, ban them!",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      try {
        const res = await updateBanUser(user_id, 1);
        console.log(res.data);

        if (res.message === "OK") {
          Swal.fire({
            title: "Đã Ban!",
            text: "Người này đã bị ban",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === user_id ? { ...user, isBanned: true } : user
            )
          );
        } else {
          Swal.fire({
            title: "Error",
            text: "Failed to ban the user. Please try again.",
            icon: "error",
            confirmButtonColor: "#3085d6",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: `An error occurred: ${error.message}`,
          icon: "error",
          confirmButtonColor: "#3085d6",
        });
      }
    }
  };

  const onUnBlock = async (user_id) => {};

  const onUnbanUser = async (userId) => {
    const result = await Swal.fire({
      title: "Bạn có chắc?",
      text: "Bạn có muốn mở chặn người này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, unban them!",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      try {
        const res = await updateBanUser(userId, 0);
        if (res.message === "OK") {
          Swal.fire({
            title: "Thành công!",
            text: "Đã bỏ chặn",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === userId ? { ...user, isBanned: false } : user
            )
          );
        } else {
          Swal.fire({
            title: "Error",
            text: "Failed to ban the user. Please try again.",
            icon: "error",
            confirmButtonColor: "#3085d6",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: `An error occurred: ${error.message}`,
          icon: "error",
          confirmButtonColor: "#3085d6",
        });
      }
    }
  };

  const deletePermanently = async (id) => {};

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const renderUsers = (users) =>
    users.map((user) => (
      <TableRow key={user._id}>
        <TableCell>
          <Box display="flex" alignItems="center">
            <Avatar className={classes.avatar}>
              <AccountCircle />
            </Avatar>
            {user.username}
          </Box>
        </TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>
          {user.isOnline ? (
            <span className={classes.onlineStatus}>Trực Tuyến</span>
          ) : (
            <span className={classes.offlineStatus}>Ngoại Tuyến</span>
          )}
        </TableCell>
        <TableCell className={classes.actionsCell}>
          <IconButton
            color="primary"
            size="small"
            onClick={() => handleViewUser(user._id)}
          >
            <Visibility />
          </IconButton>
          <IconButton
            color="error"
            size="small"
            onClick={() => onBanUser(user?._id)}
          >
            <Block />
          </IconButton>
        </TableCell>
        <TableCell>
          {user.isDeleted && (
            <Typography color="red" sx={{ marginBottom: "20px" }}>
              Xóa Mềm{" "}
              <Button
                sx={{ marginLeft: "20px" }}
                color="success"
                variant="contained"
                onClick={() => restoreUserAccount(user._id)}
              >
                Phục Hồi
              </Button>
              <Button
                sx={{ marginLeft: "20px" }}
                color="danger"
                variant="outlined"
                onClick={() => deletePermanently(user._id)}
              >
                Xóa Vĩnh Viễn
              </Button>
            </Typography>
          )}

          {user.isBanned && (
            <Typography color="red" sx={{ marginBottom: "20px" }}>
              Chặn
              <Button
                sx={{ marginLeft: "20px" }}
                color="success"
                variant="contained"
                onClick={() => onUnbanUser(user._id)}
              >
                Bỏ Chặn
              </Button>
            </Typography>
          )}

          {user.IsProfileBlocked && (
            <Typography color="red" sx={{ marginBottom: "20px" }}>
              Profile Block
              <Button
                sx={{ marginLeft: "20px" }}
                color="success"
                variant="contained"
                onClick={() => onUnBlock(user._id)}
              >
                Unblock Profile
              </Button>
            </Typography>
          )}
        </TableCell>
      </TableRow>
    ));

  return (
    <Box marginRight={"-110px"} marginTop={"100px"}>
      <Typography variant="h4" gutterBottom align="center">
        Quản Lý Người Dùng
      </Typography>

      {/* Search Bar */}
      <Box display="flex" justifyContent="center" marginBottom={2}>
        <TextField
          label="Search by Username"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: "300px" }}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "20px" }}
          onClick={handleSearch}
          sx={{ height: "40px" }}
        >
          Tìm Kiếm
        </Button>
      </Box>

      <Box display="flex" justifyContent="center" marginBottom={2}>
        <FilterBox handleFilter={handleFilter} />
      </Box>

      <TableContainer component={Paper} elevation={5}>
        <Box className={classes.sectionHeader}>Quản Trị Viên</Box>
        <Table className={classes.table} aria-label="admin user table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Trạng Thái Trực Tuyến</TableCell>
              <TableCell>Hành Động</TableCell>
              <TableCell>Trạng Thái Tài Khoản</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderUsers(users.filter((user) => user.role === "admin"))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer
        component={Paper}
        elevation={5}
        sx={{ marginTop: "20px" }}
      >
        <Box className={classes.sectionHeaderUser}>Người Dùng</Box>
        <Table className={classes.table} aria-label="regular user table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Trạng Thái Trực Tuyếns</TableCell>
              <TableCell>Hành Động</TableCell>
              <TableCell>Trạng Thái Tài Khoản</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderUsers(users.filter((user) => user.role === "user"))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserManagement;
