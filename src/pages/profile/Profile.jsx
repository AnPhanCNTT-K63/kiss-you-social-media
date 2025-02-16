import React, { useContext, useEffect, useState } from "react";
import ProfileHeader from "../../components/profile-header/ProfileHeader";
import ProfileLeftBar from "../../components/profile-leftbar/ProfileLeftBar";
import styles from "../../styles/profile.module.css";
import { useLocation, useParams } from "react-router-dom";
import { getAllFriends, getById } from "../../apis/services/UserService";
import UserContext from "../../UserContext";
import ProfileAbout from "../../components/profile-about/ProfileAbout";
import ProfileFriendList from "../../components/profile-friend-list/ProfileFriendList";
import ProfilePostList from "../../components/profile-post-list/ProfilePostList";

const Profile = () => {
  const { id } = useParams();
  const location = useLocation();
  const user = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({});
  const [userFriends, setUserFriends] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const res = await getById(user?._id);
      setCurrentUser(res.data);
    };
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getById(id);
      setUserInfo(res.data);
    };
    fetchUser();
  }, [id]);

  useEffect(() => {
    const fetchFriends = async () => {
      const res = await getAllFriends(id);
      setUserFriends(res.data);
    };
    fetchFriends();
  }, [id]);

  return (
    <div className={styles.profilePage}>
      <ProfileHeader
        id={id}
        user={user}
        currentUser={currentUser}
        userInfo={userInfo}
        userFriends={userFriends}
        location={location}
      />
      <div className={styles.body}>
        <div className={styles.leftBar}>
          <ProfileLeftBar userFriends={userFriends} />
        </div>
        <div className={styles.content}>
          {location.pathname === `/profile/${id}` && (
            <ProfilePostList userId={id} />
          )}
          {location.pathname === `/profile/${id}/about` && (
            <ProfileAbout userInfo={userInfo} id={id} />
          )}
          {location.pathname === `/profile/${id}/friends` && (
            <ProfileFriendList userFriends={userFriends} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
