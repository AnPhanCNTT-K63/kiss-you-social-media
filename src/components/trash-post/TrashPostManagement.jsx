import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  deletePost,
  getAll,
  setApproval,
  setDelete,
} from "../../apis/services/PostService";
import TrashPostCard from "../trash-post-card/TrashPostCard";

const TrashPostManagement = () => {
  const [unapprovedPosts, setUnapprovedPosts] = useState([]);

  useEffect(() => {
    const fetchUnapprovedPosts = async () => {
      const res = await getAll({ isDeleted: true });
      setUnapprovedPosts(res.data);
    };
    fetchUnapprovedPosts();
  }, []);

  const handleApprove = async (postId) => {
    try {
      await setDelete(postId, 0);
      Swal.fire("Success", "Post approved successfully", "success");
      setUnapprovedPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== postId)
      );
    } catch (error) {
      Swal.fire("Error", "Failed to approve post", "error");
    }
  };

  const handleReject = async (postId) => {
    try {
      await deletePost(postId);
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
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>Post Approval</h2>
      {unapprovedPosts.length > 0 ? (
        unapprovedPosts.map((post) => (
          <TrashPostCard
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
          No posts to approve
        </p>
      )}
    </div>
  );
};

export default TrashPostManagement;
