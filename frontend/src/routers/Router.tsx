import { Route, Routes } from 'react-router-dom'
import AuthPage from '../pages/AuthPage';
import ProfilePage from '../pages/ProfilePage';
import RetranslatePage from '../pages/RetranslatePage';
import AdminPanelPage from '../pages/AdminPanelPage';
import RoleChoicePage from '../pages/RoleChoicePage';

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<RetranslatePage to='/login' />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminPanelPage />} />
            <Route path="/roles" element={<RoleChoicePage />} />
        </Routes>
    );
}

export default Router;