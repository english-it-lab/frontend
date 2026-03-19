import Router from '../routers/Router';
import RedirectController from "./helpers/RedirectController";

import styles from './Layout.module.css';


const Layout = () => {
	return (
		<div className={styles.contentWrapper}>
			<Router />
			<RedirectController/>
		</div>
	);
}

export default Layout;
