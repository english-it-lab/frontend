import { Navigate, Route, Routes } from 'react-router-dom'

import AuthPage from '../conatiners/pages/AuthPage';
import ProfilePage from '../conatiners/pages/Profile/ProfilePage';
import AdminPanelPage from '../conatiners/pages/AdminPanelPage';
import RoleChoicePage from '../conatiners/pages/RoleChoicePage';
import PATHS from "../constants/paths";


const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={PATHS.LOGIN} replace />} />
      <Route path={PATHS.LOGIN} element={<AuthPage />} />
      <Route path={PATHS.PROFILE} element={<ProfilePage />} />
      <Route path={PATHS.ADMIN} element={<AdminPanelPage />} />
      <Route path={PATHS.ROLES} element={<RoleChoicePage />} />
    </Routes>
  );
}

export default Router;
