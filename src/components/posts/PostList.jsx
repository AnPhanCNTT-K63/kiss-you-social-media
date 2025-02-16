import { useState, useContext, useEffect } from "react";
import PostCard from "./PostCard";
import CreatePost from "./CreatePost";
import UserContext from "../../UserContext";
import {
  createPost,
  getAll,
  getByUserId,
} from "../../apis/services/PostService";

export default function PostList({ userId }) {
  const user = useContext(UserContext);
  const [posts, setPosts] = useState([]);

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

  return (
    <div style={{ marginTop: "100px" }}>
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
        <PostCard
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
