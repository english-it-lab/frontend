import { useEffect, useState } from "react";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks";
import { fetchSections } from "@/slices/sectionsSlice";
import {
  createTopicThunk,
  deleteTopicThunk,
  fetchTopics,
  setTopicsError,
  updateTopicThunk,
} from "@/slices/topicsSlice";
import type { Section } from "@/types/sectionTypes";
import type { Topic } from "@/types/topicTypes";

import type { GridColDef } from "@mui/x-data-grid";

type TopicFormState = {
  id: number | null;
  name: string;
  sectionId: number | null;
};

const emptyForm: TopicFormState = {
  id: null,
  name: "",
  sectionId: null,
};

const getSectionLabel = (section: Section) => section.name;

const AdminTopicsPage = () => {
  const dispatch = useAppDispatch();
  const {
    error,
    isLoading,
    isSaving,
    items: topics,
  } = useAppSelector((state) => state.topicsReducer);
  const { items: sections, isLoading: isSectionsLoading } = useAppSelector(
    (state) => state.sectionsReducer,
  );
  const [form, setForm] = useState<TopicFormState>(emptyForm);

  const selectedSection = form.sectionId
    ? sections.find((section) => section.id === form.sectionId) ?? null
    : null;

  const loadTopics = () => {
    void dispatch(fetchTopics(form.sectionId));
  };

  useEffect(() => {
    void dispatch(fetchTopics());
    void dispatch(fetchSections());
  }, [dispatch]);

  const resetForm = () => {
    setForm(emptyForm);
  };

  const handleEdit = (topic: Topic) => {
    setForm({
      id: topic.id,
      name: topic.name,
      sectionId: topic.sectionId,
    });
  };

  const handleDelete = async (topicId: number) => {
    const shouldDelete = window.confirm("Удалить топик?");

    if (!shouldDelete) return;

    try {
      await dispatch(deleteTopicThunk(topicId)).unwrap();

      if (form.id === topicId) resetForm();
    } catch (deleteError) {
      console.error("Failed to delete topic", deleteError);
    }
  };

  const handleSubmit = async () => {
    const name = form.name.trim();

    if (!name) {
      dispatch(setTopicsError("Название топика обязательно."));
      return;
    }

    if (form.sectionId === null) {
      dispatch(setTopicsError("Секция обязательна."));
      return;
    }

    const payload = {
      name,
      sectionId: form.sectionId,
    };

    try {
      if (form.id === null) {
        await dispatch(createTopicThunk(payload)).unwrap();
      } else {
        await dispatch(
          updateTopicThunk({
            topicId: form.id,
            data: payload,
          }),
        ).unwrap();
      }

      resetForm();
    } catch (saveError) {
      console.error("Failed to save topic", saveError);
    }
  };

  const columns: GridColDef<Topic>[] = [
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
      field: "sectionId",
      headerName: "Секция",
      flex: 1,
      minWidth: 220,
      valueGetter: (value: number | null) => {
        if (value === null) return "Не задана";

        const section = sections.find((item) => item.id === value);

        return section ? section.name : `#${value}`;
      },
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
              {form.id === null ? "Новый топик" : `Редактирование #${form.id}`}
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
              <Autocomplete
                getOptionLabel={getSectionLabel}
                loading={isSectionsLoading}
                options={sections}
                sx={{ minWidth: 260 }}
                value={selectedSection}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(_, section) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    sectionId: section?.id ?? null,
                  }))
                }
                renderInput={(params) => <TextField {...params} label="Секция" />}
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
              <Button disabled={isLoading} onClick={() => void loadTopics()}>
                Обновить
              </Button>
            </Stack>
          </Stack>
        </Paper>

        <Paper sx={{ height: 560 }}>
          <DataGrid
            rows={topics}
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

export default AdminTopicsPage;
