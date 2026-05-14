import { type ChangeEvent, useState } from "react";
import { Grid, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";

import EventCard from "@/containers/Widgets/EventCard/EventCard.tsx";
import type { IEvent } from "@/interfaces/eventInterface.ts";

import styles from "./EventList.module.scss";

type EventsListProps = {
  events: IEvent[];
};

const EventsList = ({ events }: EventsListProps) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const handleCardClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  const pageCount = Math.ceil(events.length / itemsPerPage);
  const eventsOnPage = events.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div className={styles.eventListContainer}>
      <Grid container spacing={3}>
        {eventsOnPage.map((event) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={event.id}>
            <EventCard event={event} onClick={handleCardClick}/>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={pageCount}
        page={page}
        onChange={handlePageChange}
        className={styles.pagination}
      />
    </div>
  );
};

export default EventsList;
