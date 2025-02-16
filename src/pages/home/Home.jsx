import styles from "../../styles/home.module.css";
import Feed from "../../components/feed/Feed";
import SideBar from "../../components/sidebar/SideBar";
import RightSidebar from "../../components/right-sidebar/RightSidebar";

export default function Home() {
  return (
    <div className={styles.homePage}>
      <div className={styles.leftSidebar}>
        <SideBar />
      </div>
      <div className={styles.middleContent}>
        <Feed />
      </div>
      <div className={styles.rightSidebar}>
        <RightSidebar />
      </div>
    </div>
  );
}
