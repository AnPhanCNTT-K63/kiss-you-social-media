import { useContext, useEffect, useState } from "react";
import { getNotFriends } from "../../apis/services/UserService";
import FriendSuggestions from "../../components/friend-suggestion/FriendSuggestions";
import SearchBar from "../../components/search-bar/SearchBar";
import styles from "../../styles/friend-page.module.css";
import UserContext from "../../UserContext";

export default function Friend() {
  const user = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getNotFriends(user?._id);
      setSuggestions(res.data.filter((u) => u._id !== user?._id));
    };
    fetchUser();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await getNotFriends(user?._id, {
        username: searchQuery,
      });
      setSuggestions(response.data.filter((u) => u._id !== user?._id));
    } catch (error) {
      console.error("Failed to search:", error);
    }
  };
  return (
    <div className={styles.friendPage}>
      {/* Left Sidebar */}
      <div className={styles.leftSidebar} style={{ marginTop: "100px" }}>
        <SearchBar
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          handleSearch={handleSearch}
        />
      </div>

      {/* Right Main Content */}
      <div className={styles.rightMain} style={{ marginTop: "50px" }}>
        <FriendSuggestions suggestions={suggestions} />
      </div>
    </div>
  );
}
