import { useState } from "react";
import {
  Card,
  Typography,
  Chip,
  Box,
  Button,
  Divider,
  Stack,
  Grid,
} from "@mui/material";

import EventApplicationDialog from "@/components/EventApplicationDialog/EventApplicationDialog";
import { eventTypeMap } from "@/constants/events.ts";
import type { IEvent } from "@/interfaces/eventInterface";

import styles from "./EventDetailsCard.module.scss";


type EventDetailsCardProps = {
  event: IEvent;
};

const EventDetailsCard = ({ event }: EventDetailsCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Card className={styles.detailsCard} elevation={0}>
        <Box className={styles.header}>
          <Typography variant="h4" component="h1" gutterBottom>
            {event.name}
          </Typography>
          <Chip
            label={eventTypeMap[event.type]}
            color="primary"
            variant="outlined"
            size="medium"
          />
        </Box>
        <Stack spacing={1} className={styles.metaContainer}>
          <Typography variant="body1" color="text.secondary">
            <b>Дата и время:</b> {event.date}, {event.time}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <b>Место проведения:</b> {event.location}
          </Typography>
        </Stack>
        <Divider className={styles.divider} />
        <Box className={styles.section}>
          <Typography variant="h6" component="h2" gutterBottom>
            О мероприятии
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
            {event.description}
          </Typography>
        </Box>
        <Divider className={styles.divider} />
        <Box className={styles.section}>
          <Typography variant="h6" component="h2" gutterBottom>
            Секции и направления
          </Typography>
          <Box className={styles.chipsContainer}>
            {event.sections.map((section) => (
              <Chip key={section} label={section} color="default" />
            ))}
          </Box>
        </Box>
        <Divider className={styles.divider} />
        <Box className={styles.section}>
          <Typography variant="h6" component="h2" gutterBottom>
            Информация для участников
          </Typography>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Целевые факультеты:
              </Typography>
              <Box className={styles.chipsContainer}>
                {event.registrationFields.faculties.map((f) => (
                  <Chip key={f} label={f} size="small" variant="outlined" />
                ))}
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Курсы:
              </Typography>
              <Box className={styles.chipsContainer}>
                {event.registrationFields.courses.map((c) => (
                  <Chip key={c} label={`${c} курс`} size="small" variant="outlined" />
                ))}
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Преподаватели / руководители:
              </Typography>
              <Box className={styles.chipsContainer}>
                {event.registrationFields.teachers.map((t) => (
                  <Chip key={t} label={t} size="small" variant="outlined" />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className={styles.footer}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() => setIsDialogOpen(true)}
          >
            Подать заявку
          </Button>
        </Box>
      </Card>

      <EventApplicationDialog
        event={event}
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
};

export default EventDetailsCard;