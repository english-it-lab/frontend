import RedirectController from "@/containers/helpers/RedirectController";
import HeaderBar from "@/containers/Widgets/HeaderBar/HeaderBar.tsx";
import Router from "@/routers/Router";

import styles from "./Layout.module.scss";


const Layout = () => {
  return (
    <div className={styles.contentWrapper}>
      <HeaderBar />
      <Router />
      <RedirectController />
    </div>
  );
};

export default Layout;
