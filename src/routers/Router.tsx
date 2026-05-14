import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";


import { adminPageEnabled } from "@/config/app-config";
import PATHS from "@/constants/paths";

const AdminPanelPage = lazy(() => import("@/containers/pages/AdminPanelPage"));
const AuthPage = lazy(() => import("@/containers/pages/AuthPage"));
const ProfilePage = lazy(
  () => import("@/containers/pages/Profile/ProfilePage"),
);
const EventsPage = lazy(() => import("@/containers/pages/Events/EventsPage"));
const TermsOfUsagePage = lazy(() => import("@/containers/pages/Policy/TermsOfUsage"));
const PolicyPage = lazy(() => import("@/containers/pages/Policy/PolicyPage"));
const EventPage = lazy(() => import("@/containers/pages/Events/EventPage"));

const RouterFallback = () => <div>Loading...</div>;

const Router = () => {
  return (
    <Suspense fallback={<RouterFallback />}>
      <Routes>
        <Route path="/"  element={<Navigate to={PATHS.LOGIN} replace />} />
        <Route path={PATHS.TERMS} element={<TermsOfUsagePage />} />
        <Route path={PATHS.POLICY} element={<PolicyPage />} />
        <Route path={PATHS.LOGIN} element={<AuthPage />} />
        <Route path={PATHS.PROFILE} element={<ProfilePage />} />
        <Route path={PATHS.EVENTS} element={<EventsPage />} />
        <Route path={PATHS.EVENT} element={<EventPage />} />
        <Route
          path={`${PATHS.ADMIN}/*`}
          element={
            adminPageEnabled ? (
              <AdminPanelPage />
            ) : (
              <Navigate to={PATHS.EVENTS} replace />
            )
          }
        />
      </Routes>
    </Suspense>
  );
};

export default Router;
