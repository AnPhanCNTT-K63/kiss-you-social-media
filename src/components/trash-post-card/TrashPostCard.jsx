import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  Box,
  Divider,
  Button,
} from "@mui/material";
import styles from "../../styles/post-card.module.css";
import { Link } from "react-router-dom";

const TrashPostCard = ({
  id,
  avatar,
  username,
  timestamp,
  content,
  image,
  owner,
  onApprove,
  onReject,
}) => {
  return (
    <Card className={styles.card}>
      {/* Post Header */}
      <CardHeader
        avatar={<Avatar alt={username} src={avatar} />}
        title={
          <Typography variant="subtitle1" className={styles["card-header"]}>
            <Link to={`/profile/${owner?._id}`}>{username}</Link>
          </Typography>
        }
        subheader={
          <Typography variant="caption" className={styles["card-subheader"]}>
            {new Date(timestamp).toLocaleString()}
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
          <Box className={styles["image-container"]}>
            <img
              src={image}
              alt="Post content"
              className={styles["card-image"]}
            />
          </Box>
        )}
      </CardContent>

      <Divider />

      {/* Approve/Reject Buttons */}
      <Box display="flex" justifyContent="space-around" padding="10px">
        <Button
          variant="contained"
          color="primary"
          onClick={() => onApprove(id)}
        >
          Khôi Phục
        </Button>
        <Button variant="contained" color="error" onClick={() => onReject(id)}>
          Xóa Vĩnh Viễn
        </Button>
      </Box>
    </Card>
  );
};

export default TrashPostCard;
