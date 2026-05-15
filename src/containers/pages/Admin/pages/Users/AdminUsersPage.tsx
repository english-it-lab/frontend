import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks";
import type { IUser } from "@/interfaces/userInterface";
import {
  createUserThunk,
  deleteUserThunk,
  fetchUsers,
  setUsersError,
  updateUserThunk,
} from "@/slices/usersSlice";

import type { GridColDef } from "@mui/x-data-grid";

type UserFormState = {
  id: string | null;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  currentRole: string;
};

const emptyForm: UserFormState = {
  id: null,
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  currentRole: "",
};

const userRoles = [
  {
    value: "admin",
    label: "Администратор",
  },
  {
    value: "organizer",
    label: "Организатор",
  },
  {
    value: "jury",
    label: "Жюри",
  },
  {
    value: "participant",
    label: "Участник",
  },
];

const roleLabels = userRoles.reduce<Record<string, string>>((acc, role) => {
  acc[role.value] = role.label;

  return acc;
}, {});

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AdminUsersPage = () => {
  const dispatch = useAppDispatch();
  const {
    error,
    isLoading,
    isSaving,
    items: users,
  } = useAppSelector((state) => state.usersReducer);
  const [form, setForm] = useState<UserFormState>(emptyForm);

  const loadUsers = () => {
    void dispatch(fetchUsers());
  };

  useEffect(() => {
    void dispatch(fetchUsers());
  }, [dispatch]);

  const resetForm = () => {
    setForm(emptyForm);
  };

  const handleEdit = (user: IUser) => {
    setForm({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      currentRole: user.currentRole,
    });
  };

  const handleDelete = async (userId: string) => {
    const shouldDelete = window.confirm("Удалить пользователя?");

    if (!shouldDelete) return;

    try {
      await dispatch(deleteUserThunk(userId)).unwrap();

      if (form.id === userId) resetForm();
    } catch (deleteError) {
      console.error("Failed to delete user", deleteError);
    }
  };

  const handleSubmit = async () => {
    const firstname = form.firstname.trim();
    const lastname = form.lastname.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const currentRole = form.currentRole.trim();

    if (!firstname || !lastname || !email || !phone || !currentRole) {
      dispatch(setUsersError("Заполните все обязательные поля."));
      return;
    }

    if (!EMAIL_PATTERN.test(email)) {
      dispatch(setUsersError("Введите корректный email."));
      return;
    }

    const payload = {
      firstname,
      lastname,
      email,
      phone,
      currentRole,
    };

    try {
      if (form.id === null) {
        await dispatch(createUserThunk(payload)).unwrap();
      } else {
        await dispatch(
          updateUserThunk({
            userId: form.id,
            data: payload,
          }),
        ).unwrap();
      }

      resetForm();
    } catch (saveError) {
      console.error("Failed to save user", saveError);
    }
  };

  const columns: GridColDef<IUser>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 110,
    },
    {
      field: "firstname",
      headerName: "Имя",
      flex: 1,
      minWidth: 160,
    },
    {
      field: "lastname",
      headerName: "Фамилия",
      flex: 1,
      minWidth: 180,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 220,
    },
    {
      field: "phone",
      headerName: "Телефон",
      flex: 1,
      minWidth: 160,
    },
    {
      field: "currentRole",
      headerName: "Роль",
      flex: 1,
      minWidth: 160,
      valueGetter: (value: string) => roleLabels[value] ?? value,
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
                ? "Новый пользователь"
                : `Редактирование #${form.id}`}
            </Box>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <TextField
                required
                label="Имя"
                value={form.firstname}
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    firstname: event.target.value,
                  }))
                }
              />
              <TextField
                required
                label="Фамилия"
                value={form.lastname}
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    lastname: event.target.value,
                  }))
                }
              />
              <TextField
                required
                label="Email"
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    email: event.target.value,
                  }))
                }
              />
            </Stack>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <TextField
                required
                label="Телефон"
                value={form.phone}
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    phone: event.target.value,
                  }))
                }
              />
              <TextField
                required
                select
                label="Роль"
                sx={{ minWidth: 220 }}
                value={form.currentRole}
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    currentRole: event.target.value,
                  }))
                }
              >
                {userRoles.map((role) => (
                  <MenuItem key={role.value} value={role.value}>
                    {role.label}
                  </MenuItem>
                ))}
              </TextField>
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
              <Button disabled={isLoading} onClick={() => void loadUsers()}>
                Обновить
              </Button>
            </Stack>
          </Stack>
        </Paper>

        <Paper sx={{ height: 560 }}>
          <DataGrid
            rows={users}
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

export default AdminUsersPage;
