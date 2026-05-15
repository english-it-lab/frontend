import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthForm from "@/components/auth/AuthForm";
import RegForm from "@/components/auth/RegForm";
import { authEnabled } from "@/config/app-config";
import PATHS from "@/constants/paths";
import { useAppSelector } from "@/hooks/redux_hooks";
import styles from "@/styles/AuthPage.module.scss";
import PolicyPage from "./Policy/PolicyPage";
import TermsOfUsagePage from "./Policy/TermsOfUsage";

const AuthPage = () => {
  const navigate = useNavigate();
  const isLogin = useAppSelector((state) => state.userReducer.isLogin);
  const isAuthChecked = useAppSelector(
    (state) => state.userReducer.isAuthChecked,
  );
  const [mode, setMode] = useState<boolean>(true);
  const [terms, setTerms] = useState<boolean>(false);
  const [policies, setPolicies] = useState<boolean>(false);

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
    <div>
      {policies && <PolicyPage setPolicies={setPolicies}/>}
      {terms && <TermsOfUsagePage setTerms={setTerms}/>}
      {!terms && !policies && <div className={styles.authPageContainer}>
      {mode ? <RegForm setMode={setMode} setTerms={setTerms} setPolicies={setPolicies} /> : <AuthForm setMode={setMode} />}
    </div>}
    </div>
    
  );
};

export default AuthPage;
