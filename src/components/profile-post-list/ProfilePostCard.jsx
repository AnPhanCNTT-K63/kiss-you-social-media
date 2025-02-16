import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton,
  Box,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  Share as ShareIcon,
} from "@mui/icons-material";
import styles from "../../styles/post-card.module.css";
import {
  getCommentCount,
  getLikeRecord,
  getShareCount,
  like,
  unlike,
} from "../../apis/services/InteractionService";
import UserContext from "../../UserContext";
import CommentModal from "../posts/CommentModel";
import ShareModel from "../posts/ShareModel";
import PostCard from "../posts/PostCard";
import { setDelete } from "../../apis/services/PostService";
import { Link, useNavigate } from "react-router-dom";

const ProfilePostCard = ({
  id,
  owner,
  avatar,
  username,
  timestamp,
  content,
  image,
  likes,
  comments,
  shares,
  sharedPost,
  isSharedContent = false,
}) => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);
  const [commentsCount, setCommentsCount] = useState(comments);
  const [sharesCount, setShareCount] = useState(shares);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isShareModelOpen, setisShareModelOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSave = () => {
    handleMenuClose();
  };

  const handleDelete = async () => {
    await setDelete(id, 1);
    navigate(`/trash-post`);

    handleMenuClose();
  };

  const fetchLikeRecord = async () => {
    try {
      const res = await getLikeRecord(id);
      const hasLiked = res.data.some((record) => record.user === user?._id);
      setLiked(hasLiked);
      setLikesCount(res.data.length);
    } catch (error) {
      console.error("Failed to fetch like record:", error);
    }
  };

  const fetchCommentCount = async () => {
    try {
      const res = await getCommentCount(id);
      setCommentsCount(res.data);
    } catch (error) {
      console.error("Failed to fetch comment count:", error);
    }
  };

  const fetchShareCount = async () => {
    try {
      const res = await getShareCount(id);
      setShareCount(res.data);
    } catch (error) {
      console.error("Failed to fetch share count:", error);
    }
  };

  useEffect(() => {
    fetchLikeRecord();
    fetchCommentCount();
    fetchShareCount();

    const intervalId = setInterval(() => {
      fetchLikeRecord();
      fetchCommentCount();
      fetchShareCount();
    }, process.env.REACT_APP_REFRESH_TIME);

    return () => clearInterval(intervalId);
  }, [id, user]);

  const handleLikeToggle = async () => {
    try {
      const data = {
        post: id,
        notification: {
          receiver: owner?._id,
          type: "like",
        },
      };
      if (liked) {
        await unlike(data);
        setLikesCount((prevCount) => prevCount - 1);
      } else {
        await like(data);
        setLikesCount((prevCount) => prevCount + 1);
      }
      setLiked((prevLiked) => !prevLiked);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to update like. Please try again.",
      });
    }
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Failed to load the image!",
    });
  };

  return (
    <Card className={styles.card}>
      {/* Post Header */}
      <CardHeader
        avatar={<Avatar alt={username} src={avatar} />}
        action={
          <IconButton onClick={handleMenuOpen}>
            {!isSharedContent && <MoreVertIcon />}
          </IconButton>
        }
        title={
          <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
            <Link to={`/profile/${owner?._id}`}>
              {username}{" "}
              {sharedPost && (
                <span style={{ fontWeight: "normal", color: "gray" }}>
                  Đã chia sẻ bài viết
                </span>
              )}
            </Link>
          </Typography>
        }
        subheader={
          <Typography variant="caption" style={{ color: "gray" }}>
            {timestamp}
          </Typography>
        }
      />

      {/* Move the Menu outside the CardHeader */}
      <Menu
        disableScrollLock
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleSave}>Lưu</MenuItem>
        <MenuItem onClick={handleDelete}>Xóa</MenuItem>
      </Menu>

      <Divider />

      {/* Post Content */}
      <CardContent>
        {sharedPost ? (
          <Box className={styles["shared-post-container"]}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {content}
            </Typography>
            <PostCard
              id={sharedPost._id}
              avatar={sharedPost.createdBy?.profile?.avatar?.filePath}
              username={sharedPost.createdBy?.username || "No name"}
              timestamp={sharedPost.createdAt}
              content={sharedPost.content}
              owner={sharedPost.createdBy}
              image={sharedPost.image?.filePath}
              likes={sharedPost.likes}
              comments={sharedPost.comments}
              shares={sharedPost.shares}
              isSharedContent={true}
            />
          </Box>
        ) : (
          <>
            <Typography
              variant="body2"
              color="textPrimary"
              className={styles["card-content"]}
            >
              {content}
            </Typography>

            {image && (
              <Box className={styles["image-container"]}>
                {isImageLoading && (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className={styles["loading-text"]}
                  >
                    Loading...
                  </Typography>
                )}
                <img
                  src={image}
                  alt="Post content"
                  className={styles["card-image"]}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  style={{ display: isImageLoading ? "none" : "block" }}
                />
              </Box>
            )}
          </>
        )}
      </CardContent>

      <Divider />

      {/* Post Actions - Only show if it's not shared content */}
      {!isSharedContent && (
        <CardActions disableSpacing className={styles["card-actions"]}>
          <Box className={styles["action-button"]}>
            <IconButton
              onClick={handleLikeToggle}
              color={liked ? "error" : "default"}
            >
              {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <Typography variant="body2" className={styles["action-text"]}>
              {likesCount}{" "}
              {likesCount === 1 || likesCount === 0 ? "Like" : "Likes"}
            </Typography>
          </Box>

          <Box className={styles["action-button"]}>
            <IconButton onClick={() => setIsCommentModalOpen(true)}>
              <ChatBubbleOutlineIcon />
            </IconButton>
            <Typography variant="body2" className={styles["action-text"]}>
              {commentsCount}{" "}
              {commentsCount === 1 || commentsCount === 0
                ? "Comment"
                : "Comments"}
            </Typography>
          </Box>

          <Box className={styles["action-button"]}>
            <IconButton onClick={() => setisShareModelOpen(true)}>
              <ShareIcon />
            </IconButton>
            <Typography variant="body2" className={styles["action-text"]}>
              {sharesCount}{" "}
              {sharesCount === 1 || sharesCount === 0 ? "Share" : "Shares"}
            </Typography>
          </Box>
        </CardActions>
      )}

      {/* Modals */}
      <CommentModal
        postId={id}
        open={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        owner={owner}
      />
      <ShareModel
        postId={id}
        open={isShareModelOpen}
        onClose={() => setisShareModelOpen(false)}
        postContent={content}
        postImage={image}
        username={username}
        owner={owner}
      />
    </Card>
  );
};

export default ProfilePostCard;
