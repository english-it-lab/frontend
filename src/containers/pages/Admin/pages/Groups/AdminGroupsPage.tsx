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
import {
  createGroupThunk,
  deleteGroupThunk,
  fetchGroups,
  runGroupActionThunk,
  setGroupsError,
  updateGroupThunk,
} from "@/slices/groupsSlice";
import { fetchSections } from "@/slices/sectionsSlice";
import type { Group } from "@/types/groupTypes";
import type { Section } from "@/types/sectionTypes";

import type { GridColDef } from "@mui/x-data-grid";

type GroupFormState = {
  id: number | null;
  name: string;
  sectionId: number | null;
};

const emptyForm: GroupFormState = {
  id: null,
  name: "",
  sectionId: null,
};

const getSectionLabel = (section: Section) => section.name;

const groupStatusMap: Record<string, string> = {
  forming: "Формируется",
  pending: "Ожидание",
  approved: "Одобрена",
  rejected: "Отклонена",
};

const normalizeGroupStatus = (status: string | null) => status?.toLowerCase() ?? null;

const AdminGroupsPage = () => {
  const dispatch = useAppDispatch();
  const {
    error,
    isLoading,
    isSaving,
    items: groups,
  } = useAppSelector((state) => state.groupsReducer);
  const { items: sections, isLoading: isSectionsLoading } = useAppSelector(
    (state) => state.sectionsReducer,
  );
  const [form, setForm] = useState<GroupFormState>(emptyForm);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

  const selectedSection = form.sectionId
    ? sections.find((section) => section.id === form.sectionId) ?? null
    : null;
  const selectedGroup =
    selectedGroupId === null
      ? null
      : groups.find((group) => group.id === selectedGroupId) ?? null;
  const selectedGroupStatus = normalizeGroupStatus(selectedGroup?.status ?? null);

  const loadGroups = () => {
    void dispatch(fetchGroups());
  };

  useEffect(() => {
    void dispatch(fetchGroups());
    void dispatch(fetchSections());
  }, [dispatch]);

  const resetForm = () => {
    setForm(emptyForm);
  };

  const handleEdit = (group: Group) => {
    setForm({
      id: group.id,
      name: group.name,
      sectionId: group.sectionId,
    });
  };

  const handleDelete = async (groupId: number) => {
    const shouldDelete = window.confirm("Удалить группу?");

    if (!shouldDelete) return;

    try {
      await dispatch(deleteGroupThunk(groupId)).unwrap();

      if (form.id === groupId) resetForm();
    } catch (deleteError) {
      console.error("Failed to delete group", deleteError);
    }
  };

  const handleGroupAction = async (action: "submit" | "approve" | "reject") => {
    if (!selectedGroup) return;

    try {
      await dispatch(
        runGroupActionThunk({
          groupId: selectedGroup.id,
          action,
        }),
      ).unwrap();
      await dispatch(fetchGroups()).unwrap();
    } catch (actionError) {
      console.error("Failed to update group status", actionError);
    }
  };

  const handleSubmit = async () => {
    const name = form.name.trim();

    if (!name) {
      dispatch(setGroupsError("Название группы обязательно."));
      return;
    }

    if (form.sectionId === null) {
      dispatch(setGroupsError("Секция обязательна."));
      return;
    }

    const payload = {
      name,
      sectionId: form.sectionId,
    };

    try {
      if (form.id === null) {
        await dispatch(createGroupThunk(payload)).unwrap();
      } else {
        await dispatch(
          updateGroupThunk({
            groupId: form.id,
            data: payload,
          }),
        ).unwrap();
      }

      resetForm();
    } catch (saveError) {
      console.error("Failed to save group", saveError);
    }
  };

  const columns: GridColDef<Group>[] = [
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
      field: "status",
      headerName: "Статус",
      flex: 1,
      minWidth: 160,
      valueGetter: (value: string | null) =>
        value ? groupStatusMap[value.toLowerCase()] ?? value : "Не задан",
    },
    {
      field: "memberCount",
      headerName: "Участники",
      flex: 1,
      minWidth: 140,
      valueGetter: (value: number | null) => value ?? 0,
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
              {form.id === null ? "Новая группа" : `Редактирование #${form.id}`}
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
              <Button disabled={isLoading} onClick={() => void loadGroups()}>
                Обновить
              </Button>
            </Stack>
          </Stack>
        </Paper>

        <Paper sx={{ height: 560 }}>
          <DataGrid
            rows={groups}
            columns={columns}
            loading={isLoading}
            onRowClick={({ row }) => setSelectedGroupId(row.id)}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10, 25, 50]}
            disableRowSelectionOnClick
            rowSelectionModel={{
              type: "include",
              ids: new Set(selectedGroupId === null ? [] : [selectedGroupId]),
            }}
          />
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <Button
              disabled={isSaving || selectedGroupStatus !== "forming"}
              variant="outlined"
              onClick={() => void handleGroupAction("submit")}
            >
              В ожидание
            </Button>
            <Button
              disabled={isSaving || selectedGroupStatus !== "pending"}
              variant="contained"
              onClick={() => void handleGroupAction("approve")}
            >
              Одобрить
            </Button>
            <Button
              color="error"
              disabled={isSaving || selectedGroupStatus !== "pending"}
              variant="contained"
              onClick={() => void handleGroupAction("reject")}
            >
              Отклонить
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
};

export default AdminGroupsPage;
