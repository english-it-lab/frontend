import { useEffect } from "react";

import { authEnabled } from "@/config/app-config";
import { useAppDispatch } from "@/hooks/redux_hooks";
import { checkAuth } from "@/services/authorizationService";
import { userSlice } from "@/slices/userSlice";

const LocalStorageSaver = () => {
  const { clearSession, setAuthChecked, setUser, setIsLogin } =
    userSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!authEnabled) {
      dispatch(
        setUser({
          id: "local-admin",
          firstname: "Local",
          lastname: "Admin",
          email: "local-admin@example.test",
          phone: "",
          currentRole: "Администратор",
        }),
      );
      dispatch(setIsLogin(true));
      dispatch(setAuthChecked(true));
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(setAuthChecked(true));
      return;
    }

    checkAuth()
      .then((result) => {
        dispatch(setUser(result.data.user));
        dispatch(setIsLogin(true));
        localStorage.setItem("token", result.data.token);
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("token");
        dispatch(clearSession());
      })
      .finally(() => {
        dispatch(setAuthChecked(true));
      });
  }, [clearSession, dispatch, setAuthChecked, setIsLogin, setUser]);

  return null;
};

export default LocalStorageSaver;
