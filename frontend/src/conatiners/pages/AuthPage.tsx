import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthForm from "components/auth/AuthForm";
import RegForm from "components/auth/RegForm";
import { useAppSelector } from "hooks/redux_hooks";
import PATHS from "constants/paths";

import 'styles/AuthPage.css'


const AuthPage = () => {
    const navigate = useNavigate();
    const isLogin = useAppSelector(state => state.userReducer.isLogin);
    const [mode, setMode] = useState<boolean>(true);
    
    useEffect(() => {
        isLogin && navigate(PATHS.ROLES);
    }, [isLogin]);
    
    return (
        <div className="auth-page-container">
            {mode ?
                <RegForm
                    setMode={setMode}
                />
            :
                <AuthForm
                    setMode={setMode}
                />
            }
        </div>
    );
}

export default AuthPage;
