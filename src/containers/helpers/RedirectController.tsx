import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import PATHS from "@/constants/paths";
import type { RootState } from "@/store/store";

const RedirectController = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state: RootState) => state.userReducer.isLogin);

  useEffect(() => {
    if (!isLogin) {
      navigate(PATHS.LOGIN);
    }
  }, [isLogin, navigate]);

  return null;
};

export default RedirectController;
