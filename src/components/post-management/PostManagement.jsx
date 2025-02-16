import React, { useEffect, useState } from "react";
import PostCardForApproval from "../approval-post-card/PostCardForApproval";
import Swal from "sweetalert2";
import { getAll, setApproval } from "../../apis/services/PostService";

const PostManagement = () => {
  const [unapprovedPosts, setUnapprovedPosts] = useState([]);

  useEffect(() => {
    const fetchUnapprovedPosts = async () => {
      const res = await getAll({ status: "pending" });
      setUnapprovedPosts(res.data);
    };
    fetchUnapprovedPosts();
  }, []);

  const handleApprove = async (postId) => {
    try {
      await setApproval(postId, 1);
      Swal.fire("Success", "Đã duyệt", "success");
      setUnapprovedPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== postId)
      );
    } catch (error) {
      Swal.fire("Error", "Đã tử chối", "error");
    }
  };

  const handleReject = async (postId) => {
    try {
      await setApproval(postId, 0);
      Swal.fire("Success", "Post rejected successfully", "success");
      setUnapprovedPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== postId)
      );
    } catch (error) {
      Swal.fire("Error", "Failed to reject post", "error");
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>Duyệt Bài Viết</h2>
      {unapprovedPosts.length > 0 ? (
        unapprovedPosts.map((post) => (
          <PostCardForApproval
            key={post._id}
            id={post._id}
            avatar={post.createdBy?.profile?.avatar?.filePath}
            username={post.createdBy?.username || "No name"}
            timestamp={post.createdAt}
            content={post.content}
            owner={post.createdBy}
            image={post.image?.filePath}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        ))
      ) : (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Không có Bài Viết để duyệt
        </p>
      )}
    </div>
  );
};

export default PostManagement;
