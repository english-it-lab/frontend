import { Typography } from "@mui/material";

import { mockEvents } from "@/constants/mockData.ts";
import EventsList from "@/containers/Widgets/EventsList/EventsList.tsx";

import styles from './EventsPage.module.scss';


const EventsPage = () => {
	return (
		<div className={styles.pageContainer}>
			<Typography variant="h4" component="h2">
				Мероприятия
			</Typography>
			<EventsList events={mockEvents} />
		</div>
	);
}

export default EventsPage;
