import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import type { IEvent } from '@/interfaces/eventInterface';

import styles from './EventCard.module.scss';


type EventCardProps = {
	event: IEvent;
}

const eventTypeMap = {
	conference: 'Конференция',
	seminar: 'Семинар',
	roundTable: 'Круглый стол'
}

const EventCard = ({ event }: EventCardProps) => {
	const navigate = useNavigate();
	
	const handleCardClick = () => {
		// navigate(`/events/${event.id}`);
	};
	
	return (
		<Card className={styles.eventCard} onClick={handleCardClick}>
			<CardContent className={styles.cardContent}>
				<Box>
					<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
						<Typography variant="h6" component="h3" sx={{ pr: 1 }}>{event.name}</Typography>
						<Chip label={eventTypeMap[event.type]} size="small" variant="outlined" />
					</Box>
					<Typography variant="body2" color="text.secondary" gutterBottom className={`${styles.infoLine} ${styles.date}`}>
						{`${event.date}, ${event.time}`}
					</Typography>
					<Typography variant="body2" color="text.secondary" className={`${styles.infoLine} ${styles.location}`}>
						{`${event.location}`}
					</Typography>
				</Box>
				<Box sx={{ mt: 2 }}>
					<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
						{event.sections.map((section) => (
							<Chip key={section} label={section} size="small" />
						))}
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
};

export default EventCard;
