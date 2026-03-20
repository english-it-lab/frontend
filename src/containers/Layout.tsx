import RedirectController from "@/containers/helpers/RedirectController";
import Router from "@/routers/Router";

import styles from "./Layout.module.scss";

const Layout = () => {
  return (
    <div className={styles.contentWrapper}>
      <Router />
      <RedirectController />
    </div>
  );
};

export default Layout;
