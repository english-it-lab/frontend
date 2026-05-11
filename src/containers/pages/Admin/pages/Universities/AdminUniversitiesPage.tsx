import { useEffect, useState } from "react";
import { Alert, Box, Button, Paper, Stack, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks";
import {
  createUniversityThunk,
  fetchUniversities,
  setUniversitiesError,
} from "@/slices/universitiesSlice";
import type { University } from "@/types/universityTypes";

import type { GridColDef } from "@mui/x-data-grid";

const AdminUniversitiesPage = () => {
  const dispatch = useAppDispatch();
  const {
    error,
    isLoading,
    isSaving,
    items: universities,
  } = useAppSelector((state) => state.universitiesReducer);
  const [name, setName] = useState("");

  const loadUniversities = () => {
    void dispatch(fetchUniversities());
  };

  useEffect(() => {
    void dispatch(fetchUniversities());
  }, [dispatch]);

  const handleSubmit = async () => {
    const normalizedName = name.trim();

    if (!normalizedName) {
      dispatch(setUniversitiesError("Название университета обязательно."));
      return;
    }

    try {
      await dispatch(createUniversityThunk({ name: normalizedName })).unwrap();
      setName("");
    } catch (saveError) {
      console.error("Failed to save university", saveError);
    }
  };

  const columns: GridColDef<University>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "name",
      headerName: "Название",
      flex: 1,
      minWidth: 260,
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
              Новый университет
            </Box>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <TextField
                required
                label="Название"
                sx={{ flexGrow: 1 }}
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <Button
                disabled={isSaving}
                variant="contained"
                onClick={() => void handleSubmit()}
              >
                Создать
              </Button>
              <Button
                disabled={isLoading}
                onClick={() => void loadUniversities()}
              >
                Обновить
              </Button>
            </Stack>
          </Stack>
        </Paper>

        <Paper sx={{ height: 560 }}>
          <DataGrid
            rows={universities}
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

export default AdminUniversitiesPage;
