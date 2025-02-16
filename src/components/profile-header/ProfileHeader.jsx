import React, { useState } from "react";
import styles from "../../styles/profile-header.module.css";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import {
  addFriend,
  uploadAvatar,
  uploadCoverPhoto,
} from "../../apis/services/UserService";
import ProfileNavbar from "../profile-navbar/ProfileNavbar";
import { Modal, Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ProfileHeader = ({
  id,
  user,
  userInfo,
  currentUser,
  userFriends,
  location,
}) => {
  const [avatarImage, setAvatarImage] = useState(
    userInfo.profile?.avatar?.filePath || null
  );
  const [coverImage, setCoverImage] = useState(
    userInfo.profile?.coverPhoto?.filePath || null
  );
  const [avatarUpload, setAvaterUpload] = useState(null);
  const [coverUpload, setCoverUpload] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewType, setPreviewType] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const onclickAddFriend = async () => {
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

  const handleUploadAvatar = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
      setPreviewType("avatar");
      setAvaterUpload(file);
      setIsPreviewOpen(true);
    }
  };

  const handleUploadCover = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
      setPreviewType("cover");
      setCoverUpload(file);
      setIsPreviewOpen(true);
    }
  };

  const handleApplyImage = async () => {
    if (previewType === "avatar") {
      const res = await uploadAvatar(avatarUpload);
      setAvatarImage(previewImage);
      alert(res.message);
    } else if (previewType === "cover") {
      const res = await uploadCoverPhoto(coverUpload);
      setCoverImage(previewImage);
      alert(res.message);
    }
    setIsPreviewOpen(false);
    setPreviewImage(null);
    setPreviewType(null);
  };

  const handleCancelPreview = () => {
    setIsPreviewOpen(false);
    setPreviewImage(null);
    setPreviewType(null);
    setAvaterUpload(null);
    setCoverUpload(null);
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        {/* Cover Photo Section */}
        <div className={styles.coverPhoto}>
          <img
            src={
              coverImage ||
              userInfo.profile?.coverPhoto?.filePath ||
              "https://placehold.co/1000x450"
            }
            alt="Cover"
            className={styles.coverImg}
          />
          {id === user._id && (
            <>
              <input
                type="file"
                id="coverPhotoInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleUploadCover}
              />
              <label htmlFor="coverPhotoInput" className={styles.addCoverBtn}>
                <CameraAltIcon fontSize="large" color="primary" />
              </label>
            </>
          )}
        </div>

        {/* Profile Section */}
        <div className={styles.profileSection}>
          <div className={styles.avatarContainer}>
            <img
              src={
                avatarImage ||
                userInfo.profile?.avatar?.filePath ||
                "/noAvatar.png"
              }
              alt="Avatar"
              className={styles.avatar}
            />
            {id === user._id && (
              <>
                <input
                  type="file"
                  id="avatarInput"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleUploadAvatar}
                />
                <label htmlFor="avatarInput" className={styles.editAvatarBtn}>
                  <CameraAltIcon fontSize="large" color="primary" />
                </label>
              </>
            )}
          </div>
          <div className={styles.info}>
            <h2 className={styles.name}>{userInfo.username}</h2>
            <p className={styles.friendsCount}>{userFriends.length} bạn bè</p>
            <div className={styles.friendAvatars}>
              {userFriends.length > 8
                ? [userFriends(8)].map((friend, index) => (
                    <img
                      key={index}
                      src={friend.profile?.avatar?.filePath || "/noAvatar.png"}
                      alt="friend"
                      className={styles.friendAvatar}
                    />
                  ))
                : userFriends.map((friend, index) => (
                    <img
                      key={index}
                      src={friend.profile?.avatar?.filePath || "/noAvatar.png"}
                      alt="friend"
                      className={styles.friendAvatar}
                    />
                  ))}
            </div>
          </div>
          <div className={styles.actions}>
            {id === user._id ? (
              <>
                <button className={styles.addStoryBtn}>+ Thêm vào Story</button>
                <button className={styles.editProfileBtn}>
                  Chỉnh sửa profile
                </button>
                <button className={styles.moreBtn}>▼</button>
              </>
            ) : (
              <>
                {currentUser.friends?.some((f) => f === id) ? (
                  <div>✅ Đã là bạn bè</div>
                ) : (
                  <button
                    className={styles.addStoryBtn}
                    onClick={onclickAddFriend}
                  >
                    + Thêm Bạn
                  </button>
                )}

                <Link to={`/messenger/${id}`}>
                  <button className={styles.addStoryBtn}>Nhắn Tin</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <ProfileNavbar id={id} styles={styles} location={location} />

      {/* Image Preview Modal */}
      <Modal open={isPreviewOpen} onClose={handleCancelPreview}>
        <Box className={styles.previewModal}>
          <Typography variant="h6" gutterBottom>
            Preview {previewType === "avatar" ? "Avatar" : "Cover Photo"}
          </Typography>
          <div
            className={
              previewType === "avatar"
                ? styles.previewAvatarContainer
                : styles.previewCoverContainer
            }
          >
            <img
              src={previewImage}
              alt="Preview"
              className={
                previewType === "avatar"
                  ? styles.previewAvatar
                  : styles.previewCover
              }
            />
          </div>
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              onClick={handleApplyImage}
            >
              Apply
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCancelPreview}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfileHeader;
