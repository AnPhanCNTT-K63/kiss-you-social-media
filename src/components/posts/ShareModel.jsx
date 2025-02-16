import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Modal,
  Avatar,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CopyIcon from "@mui/icons-material/ContentCopy";
import UserContext from "../../UserContext";
import styles from "../../styles/share-model.module.css";
import { sharePost } from "../../apis/services/InteractionService";

const ShareModel = ({
  owner,
  postId,
  open,
  onClose,
  postContent,
  postImage,
  username,
}) => {
  const user = React.useContext(UserContext);
  const [shareText, setShareText] = useState("");

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Post link copied to clipboard!");
  };

  const handleSharePost = async () => {
    await sharePost({
      post: postId,
      content: shareText,
      notification: {
        receiver: owner?._id,
        type: "share",
      },
    });
    onClose();
    window.location.reload();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={styles.modalContainer}>
        <Box className={styles.modalHeader}>
          <Typography variant="h6">Chia sẻ bài viết</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box display="flex" alignItems="center" mt={2} mb={2}>
          <Avatar alt={user.username} src={user.profile?.avatar} />
          <Typography variant="body2" fontWeight="bold" ml={2}>
            {user.username}
          </Typography>
        </Box>
        <TextField
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          placeholder="Hãy viết gì đó về bài viết này..."
          value={shareText}
          onChange={(e) => setShareText(e.target.value)}
        />
        <Box mt={2}>
          <Typography variant="body2" fontWeight="bold">
            {username}
          </Typography>
          <Typography variant="body2" color="textSecondary" mt={1}>
            {postContent}
          </Typography>
          {postImage && (
            <img
              src={postImage}
              alt="Post"
              className={styles.postImagePreview}
            />
          )}
        </Box>
        <Divider sx={{ mt: 2 }} />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={handleSharePost}>
            Chia Sẻ
          </Button>
          <Button
            variant="outlined"
            startIcon={<CopyIcon />}
            onClick={handleCopyLink}
          >
            Sao Chép Link
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ShareModel;
