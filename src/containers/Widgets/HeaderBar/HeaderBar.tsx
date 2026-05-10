import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import { adminPageEnabled } from "@/config/app-config";
import UserCard from "@/containers/Widgets/UserCard/UserCard.tsx";
import { useAppSelector } from "@/hooks/redux_hooks.ts";

import styles from './HeaderBar.module.scss';


const HeaderBar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const currentUser = useAppSelector((state) => state.userReducer.user);
	
	if (!currentUser) return null;
	
	return (
		<AppBar position="sticky" style={{ height: 70, background: "#6a11cb" }}>
			<Toolbar className={styles.toolbar}>
				<Box className={styles.navLinks}>
					<Button
						data-active={location.pathname.startsWith('/events')}
						color="inherit"
						className={styles.navButton}
						onClick={() => navigate('/events')}
					>
						Мероприятия
					</Button>
					<Button
						color="inherit"
						data-active={location.pathname.startsWith('/registrations')}
						className={styles.navButton}
						onClick={() => navigate('/registrations')}
					>
						Мои заявки
					</Button>
					{adminPageEnabled && (
						<Button
							color="inherit"
							data-active={location.pathname.startsWith('/admin')}
							className={styles.navButton}
							onClick={() => navigate('/admin/sections')}
						>
							Админка
						</Button>
					)}
				</Box>
				<UserCard currentUser={currentUser} />
			</Toolbar>
		</AppBar>
	);
};

export default HeaderBar;
