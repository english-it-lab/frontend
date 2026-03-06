import AuthForm from "../components/auth/AuthForm";
import RegForm from "../components/auth/RegForm";
import { useEffect, useState } from "react";
import '../styles/AuthPage.css'
import { getToken } from "../services/authorizationService";
import RetranslatePage from "./RetranslatePage";
import { useAppSelector } from "../hooks/redux_hooks";



const AuthPage = () => {
    const isLogin = useAppSelector(state => state.userReducer.isLogin)

    const [mode, setMode] = useState<boolean>(true)
    return (
        <div className="auth-page-container">
            {isLogin && <RetranslatePage to='/roles'/>}
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