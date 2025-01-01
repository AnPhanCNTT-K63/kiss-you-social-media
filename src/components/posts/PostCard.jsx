import React from "react";
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
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  Share as ShareIcon,
} from "@mui/icons-material";
import styles from "../../styles/post-card.module.css";

const PostCard = ({ avatar, username, timestamp, content, image }) => {
  const [liked, setLiked] = React.useState(false);

  const handleLikeToggle = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  const handleImageLoad = () => {
    Swal.close();
  };

  const handleImageError = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Failed to load the image!",
    });
  };

  React.useEffect(() => {
    if (image) {
      Swal.fire({
        title: "Please wait...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }
    return () => Swal.close();
  }, [image]);

  return (
    <Card className={styles.card}>
      {/* Post Header */}
      <CardHeader
        avatar={<Avatar alt={username} src={avatar} />}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography variant="subtitle1" className={styles["card-header"]}>
            {username}
          </Typography>
        }
        subheader={
          <Typography variant="caption" className={styles["card-subheader"]}>
            {timestamp}
          </Typography>
        }
      />

      <Divider />

      {/* Post Content */}
      <CardContent>
        <Typography
          variant="body2"
          color="textPrimary"
          className={styles["card-content"]}
        >
          {content}
        </Typography>

        {image && (
          <Box
            component="img"
            src={image}
            alt="Post content"
            className={styles["card-image"]}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
      </CardContent>

      <Divider />

      {/* Post Actions */}
      <CardActions disableSpacing className={styles["card-actions"]}>
        <Box className={styles["action-button"]}>
          <IconButton
            onClick={handleLikeToggle}
            color={liked ? "error" : "default"}
          >
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <Typography variant="body2" className={styles["action-text"]}>
            {liked ? "1 Like" : "Like"}
          </Typography>
        </Box>

        <Box className={styles["action-button"]}>
          <IconButton>
            <ChatBubbleOutlineIcon />
          </IconButton>
          <Typography variant="body2" className={styles["action-text"]}>
            Comment
          </Typography>
        </Box>

        <Box className={styles["action-button"]}>
          <IconButton>
            <ShareIcon />
          </IconButton>
          <Typography variant="body2" className={styles["action-text"]}>
            Share
          </Typography>
        </Box>
      </CardActions>
    </Card>
  );
};

export default PostCard;
