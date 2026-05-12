import { useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import type { IEvent } from "@/interfaces/eventInterface";
import {
  getEventApplicationErrorMessage,
  submitEventApplication,
} from "@/services/eventApplicationService";
import type { EventApplicationData } from "@/types/eventApplicationTypes";

import styles from "./EventApplicationDialog.module.scss";

type EventApplicationDialogProps = {
  event: IEvent;
  open: boolean;
  onClose: () => void;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EventApplicationDialog = ({
  event,
  open,
  onClose,
}: EventApplicationDialogProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EventApplicationData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { registrationFields } = event;

  const handleClose = () => {
    reset();
    setSubmitError("");
    setIsSubmitted(false);
    onClose();
  };

  const onSubmit = async (data: EventApplicationData) => {
    setSubmitError("");
    setIsSubmitting(true);

    try {
      await submitEventApplication(event.id, data);
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitError(getEventApplicationErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Заявка на участие: {event.name}</DialogTitle>

      {isSubmitted ? (
        <DialogContent>
          <Typography>
            Заявка на «{event.name}» отправлена. Мы свяжемся с вами по
            указанному адресу электронной почты.
          </Typography>
        </DialogContent>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Stack spacing={2} className={styles.formFields}>
              <TextField
                label="ФИО"
                fullWidth
                error={Boolean(errors.fullName)}
                helperText={errors.fullName?.message}
                {...register("fullName", {
                  required: "Укажите ФИО",
                })}
              />

              <TextField
                label="Электронная почта"
                type="email"
                fullWidth
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                {...register("email", {
                  required: "Укажите адрес электронной почты",
                  pattern: {
                    value: EMAIL_PATTERN,
                    message: "Введите корректный адрес электронной почты",
                  },
                })}
              />

              <TextField
                label="Факультет"
                select
                fullWidth
                defaultValue=""
                error={Boolean(errors.faculty)}
                helperText={errors.faculty?.message}
                {...register("faculty", { required: "Выберите факультет" })}
              >
                {registrationFields.faculties.map((faculty) => (
                  <MenuItem key={faculty} value={faculty}>
                    {faculty}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Курс"
                select
                fullWidth
                defaultValue=""
                error={Boolean(errors.course)}
                helperText={errors.course?.message}
                {...register("course", { required: "Выберите курс" })}
              >
                {registrationFields.courses.map((course) => (
                  <MenuItem key={course} value={course}>
                    {course}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Научный руководитель"
                select
                fullWidth
                defaultValue=""
                error={Boolean(errors.teacher)}
                helperText={errors.teacher?.message}
                {...register("teacher", {
                  required: "Выберите научного руководителя",
                })}
              >
                {registrationFields.teachers.map((teacher) => (
                  <MenuItem key={teacher} value={teacher}>
                    {teacher}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Секция выступления"
                select
                fullWidth
                defaultValue=""
                error={Boolean(errors.presentationSection)}
                helperText={errors.presentationSection?.message}
                {...register("presentationSection", {
                  required: "Выберите секцию выступления",
                })}
              >
                {registrationFields.presentationSections.map((section) => (
                  <MenuItem key={section} value={section}>
                    {section}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Тема выступления"
                fullWidth
                multiline
                minRows={2}
                error={Boolean(errors.presentationTopic)}
                helperText={errors.presentationTopic?.message}
                {...register("presentationTopic", {
                  required: "Укажите тему выступления",
                })}
              />

              {registrationFields.englishLevels?.length ? (
                <TextField
                  label="Уровень английского языка"
                  select
                  fullWidth
                  defaultValue=""
                  error={Boolean(errors.englishLevel)}
                  helperText={errors.englishLevel?.message}
                  {...register("englishLevel", {
                    required: "Выберите уровень английского языка",
                  })}
                >
                  {registrationFields.englishLevels.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </TextField>
              ) : null}

              {registrationFields.needsTranslator ? (
                <Controller
                  name="needsTranslator"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Boolean(field.value)}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      }
                      label="Требуется переводчик"
                    />
                  )}
                />
              ) : null}

              {registrationFields.hasTranslatorEducation ? (
                <Controller
                  name="hasTranslatorEducation"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Boolean(field.value)}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      }
                      label="Есть переводческое образование"
                    />
                  )}
                />
              ) : null}

              {submitError ? (
                <Typography color="error">{submitError}</Typography>
              ) : null}
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} disabled={isSubmitting}>
              Отмена
            </Button>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {isSubmitting ? "Отправляем..." : "Отправить заявку"}
            </Button>
          </DialogActions>
        </form>
      )}

      {isSubmitted ? (
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Закрыть
          </Button>
        </DialogActions>
      ) : null}
    </Dialog>
  );
};

export default EventApplicationDialog;
