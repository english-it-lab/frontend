import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { authEnabled } from "@/config/app-config";
import PATHS from "@/constants/paths";
import type { RootState } from "@/store/store";

const RedirectController = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state: RootState) => state.userReducer.isLogin);
  const isAuthChecked = useSelector(
    (state: RootState) => state.userReducer.isAuthChecked,
  );

  useEffect(() => {
    if (!authEnabled) return;

    if (isAuthChecked && !isLogin) {
      navigate(PATHS.LOGIN);
    }
  }, [isAuthChecked, isLogin, navigate]);

  return null;
};

export default RedirectController;
