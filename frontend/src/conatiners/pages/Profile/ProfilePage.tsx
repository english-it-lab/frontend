import { FC } from "react";

import ProfileBar from "components/profile/ProfileBar";

import styles from './ProfilePage.module.css';


const ProfilePage: FC = () => {
  return (
    <div className={styles.pageContainer}>
      <ProfileBar />
    </div>
  );
}

export default ProfilePage;
