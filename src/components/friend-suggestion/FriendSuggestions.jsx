import React from "react";
import { Button, Box, Avatar, Typography } from "@mui/material";
import styles from "../../styles/friend-suggestion.module.css";
import { addFriend } from "../../apis/services/UserService";
import { Link } from "react-router-dom";

const FriendSuggestions = ({ suggestions }) => {
  const handleAddFriend = async (id) => {
    const data = {
      friendId: id,
      notification: {
        receiver: id,
        type: "add-friend",
      },
    };
    const res = await addFriend(data);
    alert(res.message);
    window.location.reload();
  };

  const handleRemoveSuggestion = (id) => {};

  return (
    <Box className={styles.container}>
      <Typography variant="h4" className={styles.title}>
        Gợi Ý Kết Bạn
      </Typography>
      <Box className={styles.cardContainer}>
        {suggestions.map((friend) => (
          <Box key={friend._id} className={styles.card}>
            <Link to={`/profile/${friend._id}`}>
              <Avatar
                src={friend.profile?.avatar?.filePath || "/noAvatar.png"}
                alt={`${friend.username}'s profile`}
                className={styles.avatar}
              />
            </Link>
            <Link to={`/profile/${friend._id}`}>
              <Box className={styles.info}>
                <Typography variant="h6" className={styles.name}>
                  {friend.username}
                </Typography>
                {/* <Typography variant="body2" color="textSecondary">
                {friend.mutualFriends} mutual friends
              </Typography> */}
              </Box>
            </Link>
            <Box className={styles.actions}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => handleAddFriend(friend._id)}
              >
                Thêm Bạn
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onClick={() => handleRemoveSuggestion(friend._id)}
                className={styles.removeButton}
              >
                Xóa Bạn
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FriendSuggestions;
