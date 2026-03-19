import { Navigate, Route, Routes } from 'react-router-dom'

import AuthPage from '../containers/pages/AuthPage';
import ProfilePage from '../containers/pages/Profile/ProfilePage';
import AdminPanelPage from '../containers/pages/AdminPanelPage';
import PATHS from "../constants/paths";


const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={PATHS.LOGIN} replace />} />
      <Route path={PATHS.LOGIN} element={<AuthPage />} />
      <Route path={PATHS.PROFILE} element={<ProfilePage />} />
      <Route path={PATHS.ADMIN} element={<AdminPanelPage />} />
    </Routes>
  );
}

export default Router;
