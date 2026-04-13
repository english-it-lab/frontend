import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import PATHS from "@/constants/paths";

const AdminPanelPage = lazy(() => import("@/containers/pages/AdminPanelPage"));
const AuthPage = lazy(() => import("@/containers/pages/AuthPage"));
const ProfilePage = lazy(() => import("@/containers/pages/Profile/ProfilePage"));
const EventsPage = lazy(() => import("@/containers/pages/Events/EventsPage"),);

const RouterFallback = () => <div>Loading...</div>;

const Router = () => {
  return (
    <Suspense fallback={<RouterFallback />}>
      <Routes>
        <Route path="/" element={<Navigate to={PATHS.LOGIN} replace />} />
        <Route path={PATHS.LOGIN} element={<AuthPage />} />
        <Route path={PATHS.PROFILE} element={<ProfilePage />} />
        <Route path={PATHS.EVENTS} element={<EventsPage />} />
        <Route path={PATHS.ADMIN} element={<AdminPanelPage />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
