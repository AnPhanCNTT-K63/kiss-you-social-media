import { useState, useContext, useEffect } from "react";
import CreatePost from "../posts/CreatePost";
import UserContext from "../../UserContext";
import {
  createPost,
  getAll,
  getByUserId,
} from "../../apis/services/PostService";
import ProfilePostCard from "./ProfilePostCard";
import { Search as SearchIcon } from "@mui/icons-material";
import { Box, InputBase } from "@mui/material";
import Swal from "sweetalert2";

export default function ProfilePostList({ userId }) {
  const user = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!user) {
      return;
    }

    if (!userId) {
      const fetchPosts = async () => {
        const res = await getAll({ isApproved: true, isDeleted: false });

        setPosts(res.data);
      };
      fetchPosts();
    } else {
      const fetchUserPosts = async () => {
        const res = await getByUserId(userId);

        setPosts(res.data);
      };
      fetchUserPosts();
    }
  }, [userId]);

  const handleNewPost = async (post) => {
    await createPost(post);
  };

  const handleSearchKeyPress = async (event) => {
    if (event.key === "Enter" && searchQuery.trim()) {
      try {
        const res = await getAll({ content: searchQuery });
        setPosts(res.data);
        setSearchQuery("");
      } catch (error) {
        console.error("Failed to search posts:", error.message || error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to search posts. Please try again.",
        });
      }
    }
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding="10px"
        bgcolor="#f0f2f5"
        borderRadius="8px"
        marginBottom="50px"
        boxShadow="0 2px 8px rgba(0, 0, 0, 0.1)"
      >
        <SearchIcon style={{ color: "#888", marginRight: "8px" }} />
        <InputBase
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleSearchKeyPress}
          sx={{
            width: "100%",
            fontSize: "16px",
            padding: "5px",
            outline: "none",
            border: "none",
          }}
        />
      </Box>

      {userId && userId == user._id && (
        <CreatePost
          avatar={localStorage.getItem("avatar" || "noAvatar.png")}
          username={user?.username || "No name"}
          onPost={handleNewPost}
        />
      )}

      {!userId && (
        <CreatePost
          avatar={localStorage.getItem("avatar" || "noAvatar.png")}
          username={user?.username || "No name"}
          onPost={handleNewPost}
        />
      )}

      {[...posts].reverse().map((post) => (
        <ProfilePostCard
          key={post?._id}
          id={post?._id}
          owner={post?.createdBy}
          avatar={post?.createdBy?.profile?.avatar?.filePath || "/noAvatar.png"}
          username={post?.createdBy.username || "No name"}
          timestamp={post?.createdAt}
          content={post?.content}
          image={post?.image?.filePath}
          likes={post?.likes}
          comments={post?.comments}
          shares={post?.shares}
          sharedPost={post?.sharedPost}
        />
      ))}
    </div>
  );
}
