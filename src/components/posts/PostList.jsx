import { useState, useContext, useEffect } from "react";
import PostCard from "./PostCard";
import CreatePost from "./CreatePost";
import UserContext from "../../UserContext";
import { createPost, getAll } from "../../apis/services/PostService";

export default function PostList() {
  const user = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchPosts = async () => {
      const res = await getAll();

      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  const handleNewPost = async (post) => {
    const res = await createPost(post);

    console.log(res);

    if (res.message === "OK") {
      setPosts((prevPosts) => [...prevPosts, res.data]);
    }

    alert(res.message);
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <CreatePost
        avatar="https://via.placeholder.com/150"
        username={user?.username || "No name"}
        onPost={handleNewPost}
      />
      {[...posts].reverse().map((post) => (
        <PostCard
          key={post?._id}
          avatar={post?.avatar || "https://via.placeholder.com/150"}
          username={post?.createdBy.username || "No name"}
          timestamp={post?.createdAt}
          content={post?.content}
          image={post?.image?.filePath}
        />
      ))}
    </div>
  );
}
