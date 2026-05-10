import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthForm from "@/components/auth/AuthForm";
import RegForm from "@/components/auth/RegForm";
import { authEnabled } from "@/config/app-config";
import PATHS from "@/constants/paths";
import { useAppSelector } from "@/hooks/redux_hooks";
import styles from "@/styles/AuthPage.module.scss";

const AuthPage = () => {
  const navigate = useNavigate();
  const isLogin = useAppSelector((state) => state.userReducer.isLogin);
  const isAuthChecked = useAppSelector(
    (state) => state.userReducer.isAuthChecked,
  );
  const [mode, setMode] = useState<boolean>(true);

  useEffect(() => {
    if (!authEnabled) {
      navigate(PATHS.EVENTS);
      return;
    }

    if (isAuthChecked && isLogin) {
      navigate(PATHS.EVENTS);
    }
  }, [isAuthChecked, isLogin, navigate]);

  return (
    <div className={styles.authPageContainer}>
      {mode ? <RegForm setMode={setMode} /> : <AuthForm setMode={setMode} />}
    </div>
  );
};

export default AuthPage;
