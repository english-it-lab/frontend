import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthForm from "@/components/auth/AuthForm";
import RegForm from "@/components/auth/RegForm";
import PATHS from "@/constants/paths";
import { useAppSelector } from "@/hooks/redux_hooks";
import styles from "@/styles/AuthPage.module.scss";

const AuthPage = () => {
  const navigate = useNavigate();
  const isLogin = useAppSelector((state) => state.userReducer.isLogin);
  const [mode, setMode] = useState<boolean>(true);

  useEffect(() => {
    if (isLogin) {
      navigate(PATHS.PROFILE);
    }
  }, [isLogin, navigate]);

  return (
    <div className={styles.authPageContainer}>
      {mode ? <RegForm setMode={setMode} /> : <AuthForm setMode={setMode} />}
    </div>
  );
};

export default AuthPage;
