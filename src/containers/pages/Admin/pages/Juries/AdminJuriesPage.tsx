import { useEffect, useState } from "react";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks";
import {
  createJuryThunk,
  deleteJuryThunk,
  fetchJuries,
  setJuriesError,
  updateJuryThunk,
} from "@/slices/juriesSlice";
import { fetchUniversities } from "@/slices/universitiesSlice";
import type { Jury } from "@/types/juryTypes";
import type { University } from "@/types/universityTypes";

import type { GridColDef } from "@mui/x-data-grid";

type JuryFormState = {
  id: number | null;
  universityId: number | null;
  personId: string;
  isChairman: boolean;
  accessKey: string;
};

const emptyForm: JuryFormState = {
  id: null,
  universityId: null,
  personId: "",
  isChairman: false,
  accessKey: "",
};

const toOptionalNumber = (value: string) => {
  const normalizedValue = value.trim();

  if (!normalizedValue) return null;

  const parsedValue = Number(normalizedValue);

  return Number.isNaN(parsedValue) ? null : parsedValue;
};

const formatNullableNumber = (value: number | null) =>
  value === null ? "Не задано" : value;

const getUniversityLabel = (university: University) => university.name;

const AdminJuriesPage = () => {
  const dispatch = useAppDispatch();
  const {
    error,
    isLoading,
    isSaving,
    items: juries,
  } = useAppSelector((state) => state.juriesReducer);
  const { items: universities, isLoading: isUniversitiesLoading } =
    useAppSelector((state) => state.universitiesReducer);
  const [form, setForm] = useState<JuryFormState>(emptyForm);
  const [expandedJuryId, setExpandedJuryId] = useState<number | null>(null);

  const selectedJury = juries.find((jury) => jury.id === expandedJuryId);
  const selectedUniversity = form.universityId
    ? (universities.find((university) => university.id === form.universityId) ??
      null)
    : null;

  const loadJuries = () => {
    void dispatch(fetchJuries());
  };

  useEffect(() => {
    void dispatch(fetchJuries());
    void dispatch(fetchUniversities());
  }, [dispatch]);

  const resetForm = () => {
    setForm(emptyForm);
  };

  const handleEdit = (jury: Jury) => {
    setForm({
      id: jury.id,
      universityId: jury.university_id,
      personId: jury.person_id?.toString() ?? "",
      isChairman: jury.is_chairman,
      accessKey: jury.access_key?.toString() ?? "",
    });
  };

  const handleDelete = async (juryId: number) => {
    const shouldDelete = window.confirm("Удалить члена жюри?");

    if (!shouldDelete) return;

    try {
      await dispatch(deleteJuryThunk(juryId)).unwrap();

      if (form.id === juryId) resetForm();
    } catch (deleteError) {
      console.error("Failed to delete jury", deleteError);
    }
  };

  const handleSubmit = async () => {
    const personId = toOptionalNumber(form.personId);
    const accessKey = toOptionalNumber(form.accessKey);

    if (
      (form.personId.trim() && personId === null) ||
      (form.accessKey.trim() && accessKey === null)
    ) {
      dispatch(
        setJuriesError("ID персоны и ключ доступа должны быть числами."),
      );
      return;
    }

    const payload = {
      university_id: form.universityId,
      person_id: personId,
      is_chairman: form.isChairman,
      access_key: accessKey,
    };

    try {
      if (form.id === null) {
        await dispatch(createJuryThunk(payload)).unwrap();
      } else {
        await dispatch(
          updateJuryThunk({
            juryId: form.id,
            data: payload,
          }),
        ).unwrap();
      }

      resetForm();
    } catch (saveError) {
      console.error("Failed to save jury", saveError);
    }
  };

  const columns: GridColDef<Jury>[] = [
    {
      field: "expand",
      headerName: "",
      sortable: false,
      filterable: false,
      width: 64,
      renderCell: ({ row }) => (
        <Button
          size="small"
          onClick={() =>
            setExpandedJuryId((currentId) =>
              currentId === row.id ? null : row.id,
            )
          }
        >
          {expandedJuryId === row.id ? "−" : "+"}
        </Button>
      ),
    },
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "university_id",
      headerName: "Университет",
      flex: 1,
      minWidth: 220,
      valueGetter: (value: number | null) => {
        if (value === null) return "Не задано";

        const university = universities.find((item) => item.id === value);

        return university ? university.name : `#${value}`;
      },
    },
    {
      field: "person_id",
      headerName: "Персона",
      flex: 1,
      minWidth: 150,
      valueGetter: (value: number | null) =>
        value === null ? "Не задана" : `#${value}`,
    },
    {
      field: "is_chairman",
      headerName: "Председатель",
      flex: 1,
      minWidth: 150,
      valueGetter: (value: boolean) => (value ? "Да" : "Нет"),
    },
    {
      field: "access_key",
      headerName: "Ключ доступа",
      flex: 1,
      minWidth: 160,
      valueGetter: (value: number | null) => formatNullableNumber(value),
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
              {form.id === null
                ? "Новый член жюри"
                : `Редактирование #${form.id}`}
            </Box>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <Autocomplete
                getOptionLabel={getUniversityLabel}
                loading={isUniversitiesLoading}
                options={universities}
                sx={{ minWidth: 260 }}
                value={selectedUniversity}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(_, university) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    universityId: university?.id ?? null,
                  }))
                }
                renderInput={(params) => (
                  <TextField {...params} label="Университет" />
                )}
              />
              <TextField
                label="ID персоны"
                type="number"
                value={form.personId}
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    personId: event.target.value,
                  }))
                }
              />
              <TextField
                label="Ключ доступа"
                type="number"
                value={form.accessKey}
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    accessKey: event.target.value,
                  }))
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.isChairman}
                    onChange={(event) =>
                      setForm((currentForm) => ({
                        ...currentForm,
                        isChairman: event.target.checked,
                      }))
                    }
                  />
                }
                label="Председатель"
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
              <Button disabled={isLoading} onClick={() => void loadJuries()}>
                Обновить
              </Button>
            </Stack>
          </Stack>
        </Paper>

        <Paper sx={{ height: 560 }}>
          <DataGrid
            rows={juries}
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

        {selectedJury && (
          <Paper sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Box
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  lineHeight: 1.6,
                }}
              >
                Детали жюри #{selectedJury.id}
              </Box>
              <Divider />
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <Chip
                  label={`Университет: ${
                    selectedJury.university_id === null
                      ? "не задан"
                      : (universities.find(
                          (university) =>
                            university.id === selectedJury.university_id,
                        )?.name ?? `#${selectedJury.university_id}`)
                  }`}
                />
                <Chip
                  label={`Персона: ${
                    selectedJury.person_id === null
                      ? "не задана"
                      : `#${selectedJury.person_id}`
                  }`}
                />
                <Chip
                  color={selectedJury.is_chairman ? "primary" : "default"}
                  label={
                    selectedJury.is_chairman
                      ? "Председатель"
                      : "Не председатель"
                  }
                />
                <Chip
                  label={`Ключ доступа: ${
                    selectedJury.access_key === null
                      ? "не задан"
                      : selectedJury.access_key
                  }`}
                />
              </Stack>
            </Stack>
          </Paper>
        )}
      </Stack>
    </Box>
  );
};

export default AdminJuriesPage;
