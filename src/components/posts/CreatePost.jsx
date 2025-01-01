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
      onPost({
        content: postContent,
        image: imageUpload,
      });
      setImageUpload(null);
      handleClose();
    } else {
      alert("Please write something to post.");
    }
  };

  return (
    <>
      {/* Clickable Box */}
      <Card className={styles.card} onClick={handleOpen}>
        <CardContent className={styles.cardContent}>
          <Avatar alt={username} src={avatar} className={styles.avatar} />
          <Typography variant="body1" className={styles.placeholder}>
            What's on your mind, {username}?
          </Typography>
        </CardContent>
      </Card>

      {/* Modal for Creating Post */}
      <Modal open={open} onClose={handleClose}>
        <Box className={styles.modal}>
          <Box className={styles.modalHeader}>
            <Typography variant="h6">Create Post</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <TextField
            className={styles.textField}
            placeholder="What's on your mind?"
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
                alt="Preview"
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
              Upload Image
              <input type="file" hidden onChange={handleImageUpload} />
            </Button>
          </Box>

          <Box className={styles.buttonGroup}>
            <Button variant="contained" color="primary" onClick={handlePost}>
              Post
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CreatePost;
