import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import PATHS from "@/constants/paths";
import AdminSectionsPage from "@/containers/pages/Admin/pages/Sections/AdminSectionsPage";

const adminMenuItems = [
  {
    label: "Секции",
    path: PATHS.ADMIN_SECTIONS,
  },
];

const AdminPanelPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3 }}>
      <Stack
        alignItems="stretch"
        direction={{ xs: "column", md: "row" }}
        spacing={3}
      >
        <Paper
          component="aside"
          sx={{
            flexShrink: 0,
            p: 2,
            width: { xs: "100%", md: 260 },
          }}
        >
          <Typography variant="h6" component="h1" sx={{ mb: 2 }}>
            Админка
          </Typography>
          <List disablePadding>
            {adminMenuItems.map((item) => (
              <ListItemButton
                key={item.path}
                selected={location.pathname.startsWith(item.path)}
                onClick={() => navigate(item.path)}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Paper>

        <Box component="main" sx={{ minWidth: 0, flexGrow: 1 }}>
          <Routes>
            <Route
              index
              element={<Navigate to={PATHS.ADMIN_SECTIONS} replace />}
            />
            <Route path="sections" element={<AdminSectionsPage />} />
            <Route
              path="*"
              element={<Navigate to={PATHS.ADMIN_SECTIONS} replace />}
            />
          </Routes>
        </Box>
      </Stack>
    </Box>
  );
};

export default AdminPanelPage;
