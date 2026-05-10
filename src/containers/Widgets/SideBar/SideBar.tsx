import { type ChangeEvent, type ReactNode } from "react";
import { Box, Tab, Tabs } from "@mui/material";

import UserCard from '@/containers/Widgets/UserCard/UserCard';
import { useAppSelector } from '@/hooks/redux_hooks';

import styles from './SideBar.module.scss';


export type Tab = {
	id: string,
	label: string,
	component: ReactNode
}

type SideBarProps = {
	tabs: Tab[],
	selectedTab: number;
	selectTab: (e: ChangeEvent<unknown>, newValue: number) => void;
}

const SideBar = ({ tabs, selectedTab, selectTab }: SideBarProps) => {
	const currentUser = useAppSelector((state) => state.userReducer.user);
	
	const user = {
		firstname: currentUser?.firstname ?? "Иван",
		lastname: currentUser?.lastname ?? "Иванов",
		phone: currentUser?.phone ?? "",
		email: currentUser?.email ?? "",
		id: currentUser?.id ?? "",
		currentRole: currentUser?.currentRole ?? "Участник",
	};
	
	return (
		<div className={styles.sideBarContainer}>
			<UserCard currentUser={user} />
			<Box sx={{ flexGrow: 1, display: 'flex' }}>
				<Tabs
					orientation="vertical"
					value={selectedTab}
					onChange={selectTab}
					sx={{ width: '100%', borderRight: 1, borderColor: 'divider' }}
				>
					{tabs.map(tab => <Tab key={tab.id} label={tab.label} />)}
				</Tabs>
			</Box>
		</div>
	);
}

export default SideBar;
