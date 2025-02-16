import { useState, useEffect, useRef } from "react";
import {
  Avatar,
  IconButton,
  Typography,
  TextField,
  Button,
  Divider,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SendIcon from "@mui/icons-material/Send";
import styles from "../../styles/chat-box.module.css";

export default function ChatBox({
  friend,
  messages,
  handleSendMessage,
  handleClose,
}) {
  const [newMessage, setNewMessage] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    handleSendMessage(friend, newMessage);
    setNewMessage("");
  };

  return (
    <Box className={styles.chatBox}>
      {/* Chat Header */}
      <Box className={styles.chatBoxHeader}>
        <Box display="flex" alignItems="center" gap="10px">
          <Avatar alt={friend.username} src="/noAvatar.png" />
          <Typography variant="subtitle1">{friend.username}</Typography>
        </Box>
        <Box>
          <IconButton onClick={() => setIsMinimized(!isMinimized)}>
            {isMinimized ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
          <IconButton onClick={() => handleClose(friend._id)}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      {!isMinimized && (
        <>
          {/* Chat Content */}
          <Box className={styles.chatBoxContent}>
            {messages.map((m, key) => (
              <Box
                key={key}
                className={
                  m.senderId === friend._id
                    ? styles.chatBoxMessage
                    : styles.chatBoxMessageOwn
                }
                ref={scrollRef}
              >
                <Typography>{m.text}</Typography>
              </Box>
            ))}
          </Box>

          <Divider />

          {/* Message Input */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            className={styles.chatBoxInputContainer}
          >
            <TextField
              variant="outlined"
              placeholder="Type a message..."
              fullWidth
              size="small"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className={styles.chatBoxInput}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<SendIcon />}
              className={styles.chatBoxSendButton}
            >
              Send
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
