import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  IconButton,
  Divider,
  Modal,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ReplyIcon from "@mui/icons-material/Reply";
import styles from "../../styles/comment-model.module.css";
import {
  createComment,
  getAllComments,
  replyComment,
} from "../../apis/services/InteractionService";

const CommentModal = ({ owner, postId, open, onClose }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [newReply, setNewReply] = useState("");

  useEffect(() => {
    if (open) {
      const fetchComments = async () => {
        try {
          const res = await getAllComments(postId);
          setComments(res.data);
        } catch (error) {
          console.error("Failed to fetch comments:", error);
        }
      };

      fetchComments();
    }
  }, [open, postId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await createComment({
        content: newComment,
        post: postId,
        notification: {
          receiver: owner?._id,
          type: "comment",
        },
      });
      setComments((prevComments) => [...prevComments, res.data]);
      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const handleReply = async (commentId) => {
    if (!newReply.trim()) return;
    try {
      const res = await replyComment({
        content: newReply,
        comment: commentId,
        post: postId,
      });
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                responses: [...(comment.responses || []), res.data],
              }
            : comment
        )
      );
      setNewReply("");
      setReplyingTo(null);
    } catch (error) {
      alert("Failed to add reply:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={styles.modalContainer}>
        <Box className={styles.modalHeader}>
          <Typography variant="h6">Bình Luận</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box className={styles.commentList}>
          {comments.map((comment) => (
            <Box
              key={comment._id}
              display="flex"
              flexDirection="column"
              mb={2}
              className={styles.commentItem}
            >
              <Box display="flex" alignItems="flex-start">
                <Avatar
                  alt={comment.user?.username}
                  src={comment.user?.profile.avatar?.filePath}
                />
                <Box ml={2}>
                  <Typography variant="body2" fontWeight="bold">
                    {comment.user?.username}
                  </Typography>
                  <Typography variant="body2">{comment.content}</Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <IconButton
                      size="small"
                      onClick={() =>
                        setReplyingTo(
                          replyingTo === comment._id ? null : comment._id
                        )
                      }
                    >
                      <ReplyIcon fontSize="small" />
                    </IconButton>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      onClick={() =>
                        setReplyingTo(
                          replyingTo === comment._id ? null : comment._id
                        )
                      }
                      style={{ cursor: "pointer", marginLeft: "4px" }}
                    >
                      Phản Hồi
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Replies */}
              {comment.responses &&
                comment.responses.map((reply) => (
                  <Box
                    key={reply._id}
                    display="flex"
                    alignItems="flex-start"
                    ml={6}
                    mt={1}
                  >
                    <Avatar
                      alt={reply.user?.username}
                      src={reply.user?.profile?.avatar?.filePath}
                      sx={{ width: 30, height: 30 }}
                    />
                    <Box ml={2}>
                      <Typography variant="body2" fontWeight="bold">
                        {reply.user?.username}
                      </Typography>
                      <Typography variant="body2">{reply.content}</Typography>
                    </Box>
                  </Box>
                ))}

              {/* Reply Input */}
              {replyingTo === comment._id && (
                <Box display="flex" alignItems="center" mt={1} ml={6}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="Viết phản hồi..."
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleReply(comment._id)}
                    sx={{ ml: 1 }}
                  >
                    Reply
                  </Button>
                </Box>
              )}
            </Box>
          ))}
        </Box>
        <Divider />
        <Box display="flex" alignItems="center" mt={2}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Viết bình luận..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddComment}
            sx={{ ml: 1 }}
          >
            Post
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CommentModal;
