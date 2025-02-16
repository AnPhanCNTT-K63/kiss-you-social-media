import React, { useState } from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  Modal,
  TextField,
  IconButton,
  Box,
} from "@mui/material";
import {
  Close as CloseIcon,
  PhotoCamera as PhotoCameraIcon,
} from "@mui/icons-material";
import Swal from "sweetalert2";

import styles from "../../styles/create-post.module.css";

const CreatePost = ({ avatar, username, onPost }) => {
  const [open, setOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [postImage, setPostImage] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setPostContent("");
    setPostImage(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostImage(URL.createObjectURL(file));
      setImageUpload(file);
    }
  };

  const handlePost = () => {
    if (postContent.trim()) {
      // Hiển thị thông báo thành công bằng SweetAlert2
      Swal.fire({
        icon: "info",
        title: "Bài viết của bạn đang chờ phê duyệt.",
        text: "Bài viết sẽ được admin xem xét trước khi được đăng.",
        confirmButtonText: "OK",
      });

      onPost({
        content: postContent,
        image: imageUpload,
      });

      setImageUpload(null);
      handleClose();
    } else {
      Swal.fire({
        icon: "warning",
        title: "Bài viết trống",
        text: "Vui lòng viết gì đó trước khi đăng.",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <Card className={styles.card} onClick={handleOpen}>
        <CardContent className={styles.cardContent}>
          <Avatar alt={username} src={avatar} className={styles.avatar} />
          <Typography variant="body1" className={styles.placeholder}>
            Bạn đang nghĩ gì vậy, {username}?
          </Typography>
        </CardContent>
      </Card>

      {/* Modal tạo bài viết */}
      <Modal open={open} onClose={handleClose}>
        <Box className={styles.modal}>
          <Box className={styles.modalHeader}>
            <Typography variant="h6">Tạo bài viết</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <TextField
            className={styles.textField}
            placeholder="Bạn đang nghĩ gì?"
            multiline
            rows={4}
            variant="outlined"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />

          {postImage && (
            <Box className={styles.imagePreview}>
              <img
                src={postImage}
                alt="Xem trước"
                className={styles.previewImage}
              />
            </Box>
          )}

          <Box className={styles.actions}>
            <Button
              variant="contained"
              component="label"
              startIcon={<PhotoCameraIcon />}
              className={styles.uploadButton}
            >
              Tải lên hình ảnh
              <input type="file" hidden onChange={handleImageUpload} />
            </Button>
          </Box>

          <Box className={styles.buttonGroup}>
            <Button variant="contained" color="primary" onClick={handlePost}>
              Đăng
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Hủy
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CreatePost;
