import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Box,
  Typography,
  Button,
  Divider,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import { setSoftDelete } from "../../apis/services/UserService";

const DangerZoneSection = ({ classes, currentUserId }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [countdown, setCountdown] = useState(30);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (openSnackbar && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          const newCountdown = prev - 1;
          setSnackbarMessage(
            `Tài khoản của bạn đã bị xóa thành công. Bạn có thể khôi phục lại trong vòng 30 ngày bằng cách liên hệ bộ phận hỗ trợ. Sau đó, tài khoản của bạn sẽ bị xóa vĩnh viễn. Nhấn vào vùng bất kỳ để hủy quá trình, tự động đăng xuất sau: ${newCountdown} giây`
          );
          return newCountdown;
        });
      }, 1000);
    } else if (countdown === 0) {
      localStorage.removeItem("token");
      navigate("/signin");
      window.location.reload();
    }
    return () => clearInterval(timer);
  }, [openSnackbar, countdown, navigate]);

  const handleDelete = async () => {
    try {
      const res = await setSoftDelete(currentUserId, 1);
      if (res.message === "OK") {
        setSnackbarMessage(
          `Tài khoản của bạn đã bị xóa thành công. Bạn có thể khôi phục lại trong vòng 30 ngày bằng cách liên hệ bộ phận hỗ trợ. Sau đó, tài khoản của bạn sẽ bị xóa vĩnh viễn. Nhấn vào vùng bất kỳ để hủy quá trình, tự động đăng xuất sau: ${countdown} giây`
        );
        setOpenSnackbar(true); // Hiển thị Snackbar
      }
    } catch (err) {
      console.error(err);
      setSnackbarMessage(
        "Đã xảy ra lỗi khi xóa tài khoản của bạn. Vui lòng thử lại."
      );
      setOpenSnackbar(true); // Hiển thị Snackbar
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const confirmDelete = () => {
    handleDelete();
    handleCloseDialog();
  };

  const onBlockProfile = async () => {
    alert("Tính năng chặn hồ sơ sẽ sớm ra mắt!");
  };

  const dangerActions = [
    {
      label: "Chặn hồ sơ",
      description: "Ngăn mọi tương tác với hồ sơ của bạn.",
      action: "Chặn hồ sơ",
      buttonText: "Chặn trang hồ sơ",
      onClick: onBlockProfile,
    },
    {
      label: "Báo cáo hồ sơ",
      description: "Đánh dấu hoạt động đáng ngờ hoặc hành vi không phù hợp.",
      action: "Báo cáo hồ sơ",
      buttonText: "Báo cáo",
      onClick: () => alert("Tính năng báo cáo hồ sơ sẽ sớm ra mắt!"),
    },
    {
      label: "Xóa tài khoản",
      description: "Xóa vĩnh viễn tài khoản và tất cả dữ liệu liên quan.",
      action: "Xóa tài khoản",
      buttonText: "Xóa",
      onClick: handleOpenDialog,
      buttonClass: classes.dangerButton,
    },
  ];

  return (
    <>
      <Card className={classes.card}>
        <Box className={classes.sectionHeader}>
          <Typography variant="h6" color="error">
            Vùng nguy hiểm
          </Typography>
        </Box>
        <CardContent className={classes.sectionContent}>
          <Typography
            variant="body1"
            style={{ color: "#d32f2f" }}
            fontWeight="bold"
          >
            Vui lòng cẩn thận với các hành động bên dưới. Các hành động này
            không thể hoàn tác và có thể dẫn đến thay đổi vĩnh viễn đối với tài
            khoản của bạn.
          </Typography>
          <Divider style={{ margin: "15px 0" }} />
          <Box display="flex" flexDirection="column" gap={2}>
            {dangerActions.map(
              ({
                label,
                description,
                buttonText,
                onClick,
                buttonClass = classes.warningButton,
              }) => (
                <Box
                  key={label}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body2" style={{ color: "#d32f2f" }}>
                    {description}
                  </Typography>
                  <Button
                    size="small"
                    className={buttonClass}
                    onClick={onClick}
                  >
                    {buttonText}
                  </Button>
                </Box>
              )
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Hộp thoại xác nhận xóa */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle style={{ color: "#d32f2f" }}>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa vĩnh viễn tài khoản của mình không? Hành
            động này không thể hoàn tác và tất cả dữ liệu của bạn sẽ bị xóa vĩnh
            viễn.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Hủy bỏ
          </Button>
          <Button onClick={confirmDelete} className={classes.dangerButton}>
            Xác nhận xóa
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar cho thông báo thành công/lỗi */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={null}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          zIndex: 9999,
        }}
      >
        <Alert
          severity="error"
          sx={{
            width: "100%",
            fontSize: "1.25rem",
            padding: "20px",
            textAlign: "center",
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DangerZoneSection;
