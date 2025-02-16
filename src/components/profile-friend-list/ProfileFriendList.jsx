import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function ProfileFriendList({ userFriends = [] }) {
  if (!userFriends.length) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" color="textSecondary">
          No friends to display
        </Typography>
      </Box>
    );
  }

  return (
    <Box mt={4}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Friends
      </Typography>
      <Grid container spacing={2}>
        {userFriends.map((friend) => (
          <Grid item xs={12} sm={8} md={6} key={friend.id}>
            <Card sx={{ display: "flex", alignItems: "center", padding: 2 }}>
              <Avatar
                src={friend.profilePic}
                alt={friend.username}
                sx={{ width: 60, height: 60, marginRight: 2 }}
              />
              <Box flexGrow={1}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {friend.username}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {friend.mutualFriends} mutual friends
                </Typography>
              </Box>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
