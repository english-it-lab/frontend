import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks";
import {
  createSectionThunk,
  deleteSectionThunk,
  fetchSections,
  setSectionsError,
  updateSectionThunk,
} from "@/slices/sectionsSlice";
import type { Section } from "@/types/sectionTypes";

import type { GridColDef } from "@mui/x-data-grid";

type SectionFormState = {
  id: number | null;
  name: string;
  lectureHall: string;
  time: string;
};

const emptyForm: SectionFormState = {
  id: null,
  name: "",
  lectureHall: "",
  time: "",
};

const toDateTimeInputValue = (value: string | null) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const offset = date.getTimezoneOffset() * 60_000;
  const localDate = new Date(date.getTime() - offset);

  return localDate.toISOString().slice(0, 16);
};

const toApiDateTime = (value: string) => {
  if (!value) return null;

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date.toISOString();
};

const formatDateTime = (value: string | null) => {
  if (!value) return "Не задано";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
};

const AdminSectionsPage = () => {
  const dispatch = useAppDispatch();
  const {
    error,
    isLoading,
    isSaving,
    items: sections,
  } = useAppSelector((state) => state.sectionsReducer);
  const [form, setForm] = useState<SectionFormState>(emptyForm);

  const loadSections = () => {
    void dispatch(fetchSections());
  };

  useEffect(() => {
    void dispatch(fetchSections());
  }, [dispatch]);

  const resetForm = () => {
    setForm(emptyForm);
  };

  const handleEdit = (section: Section) => {
    setForm({
      id: section.id,
      name: section.name,
      lectureHall: section.lecture_hall ?? "",
      time: toDateTimeInputValue(section.time),
    });
  };

  const handleDelete = async (sectionId: number) => {
    const shouldDelete = window.confirm("Удалить секцию?");

    if (!shouldDelete) return;

    try {
      await dispatch(deleteSectionThunk(sectionId)).unwrap();

      if (form.id === sectionId) resetForm();
    } catch (deleteError) {
      console.error("Failed to delete section", deleteError);
    }
  };

  const handleSubmit = async () => {
    const name = form.name.trim();

    if (!name) {
      dispatch(setSectionsError("Название секции обязательно."));
      return;
    }

    const payload = {
      name,
      lecture_hall: form.lectureHall.trim() || null,
      time: toApiDateTime(form.time),
    };

    try {
      if (form.id === null) {
        await dispatch(createSectionThunk(payload)).unwrap();
      } else {
        await dispatch(
          updateSectionThunk({
            sectionId: form.id,
            data: payload,
          }),
        ).unwrap();
      }

      resetForm();
    } catch (saveError) {
      console.error("Failed to save section", saveError);
    }
  };

  const columns: GridColDef<Section>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "name",
      headerName: "Название",
      flex: 1,
      minWidth: 220,
    },
    {
      field: "lecture_hall",
      headerName: "Аудитория",
      flex: 1,
      minWidth: 180,
      valueGetter: (value: string | null) => value || "Не задана",
    },
    {
      field: "time",
      headerName: "Время",
      flex: 1,
      minWidth: 180,
      valueGetter: (value: string | null) => formatDateTime(value),
    },
    {
      field: "actions",
      headerName: "Действия",
      sortable: false,
      filterable: false,
      width: 190,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1}>
          <Button size="small" onClick={() => handleEdit(row)}>
            Изменить
          </Button>
          <Button
            color="error"
            size="small"
            onClick={() => void handleDelete(row.id)}
          >
            Удалить
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={3}>
        {error && <Alert severity="error">{error}</Alert>}

        <Paper sx={{ p: 2 }}>
          <Stack spacing={2}>
            <Box
              sx={{
                fontSize: "1.25rem",
                fontWeight: 500,
                lineHeight: 1.6,
              }}
            >
              {form.id === null ? "Новая секция" : `Редактирование #${form.id}`}
            </Box>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <TextField
                required
                label="Название"
                value={form.name}
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    name: event.target.value,
                  }))
                }
              />
              <TextField
                label="Аудитория"
                value={form.lectureHall}
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    lectureHall: event.target.value,
                  }))
                }
              />
              <TextField
                InputLabelProps={{ shrink: true }}
                label="Время"
                type="datetime-local"
                value={form.time}
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    time: event.target.value,
                  }))
                }
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <Button
                disabled={isSaving}
                variant="contained"
                onClick={() => void handleSubmit()}
              >
                {form.id === null ? "Создать" : "Сохранить"}
              </Button>
              {form.id !== null && (
                <Button disabled={isSaving} onClick={resetForm}>
                  Отменить
                </Button>
              )}
              <Button disabled={isLoading} onClick={() => void loadSections()}>
                Обновить
              </Button>
            </Stack>
          </Stack>
        </Paper>

        <Paper sx={{ height: 560 }}>
          <DataGrid
            rows={sections}
            columns={columns}
            loading={isLoading}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10, 25, 50]}
            disableRowSelectionOnClick
          />
        </Paper>
      </Stack>
    </Box>
  );
};

export default AdminSectionsPage;
