import ProfileBar from "@/components/profile/ProfileBar";

import styles from "./ProfilePage.module.scss";

const ProfilePage = () => {
  return (
    <div className={styles.pageContainer}>
      <ProfileBar />
    </div>
  );
};

export default ProfilePage;
