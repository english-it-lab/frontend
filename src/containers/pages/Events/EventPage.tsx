import { Alert, Stack } from "@mui/material";
import { useParams } from "react-router-dom";

import { mockEvents } from "@/constants/mockData.ts";
import EventDetailsCard from "@/containers/Widgets/EventCard/EventDetailsCard.tsx";

import styles from "./EventsPage.module.scss";


const EventPage = () => {
  console.log('EventPage')
  const { eventId } = useParams();
  const event = mockEvents.find(event => event.id === eventId);
  console.log('event')
  return (
    <div className={styles.pageContainer}>
      <Stack spacing={3}>
        { event
          ? <EventDetailsCard event={event}/>
          : <Alert severity="error">Мероприятие не найдено</Alert>
        }
      </Stack>
    </div>
  );
};

export default EventPage;
