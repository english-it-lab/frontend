import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";

import { useAppDispatch } from "@/hooks/redux_hooks";
import {
  authService,
  getAuthErrorMessage,
} from "@/services/authorizationService";
import { userSlice } from "@/slices/userSlice";
import styles from "@/styles/AuthForm.module.scss";
import type { authData } from "@/types/authorizationTypes";

type AuthFormProps = {
  setMode: Dispatch<SetStateAction<boolean>>;
};

const AuthForm = ({ setMode }: AuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<authData>();
  const [submitError, setSubmitError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { setUser, setIsLogin } = userSlice.actions;
  const dispatch = useAppDispatch();

  const changeMode = () => {
    setMode(true);
  };

  const handleSubmitEvent = async (data: authData) => {
    setSubmitError("");
    setIsSubmitting(true);

    await authService(data)
      .then((result) => {
        dispatch(setUser(result.data.user));
        dispatch(setIsLogin(true));
        localStorage.setItem("token", result.data.token);
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("token");
        setSubmitError(getAuthErrorMessage(err));
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <form
      className={styles.authContainer}
      onSubmit={handleSubmit(handleSubmitEvent)}
    >
      <h1>Войти в аккаунт</h1>
      <p>Заполните форму ниже, чтобы авторизоваться</p>

      <div className={styles.authFormFields}>
        <div>
          <p>Адрес электронной почты</p>
          {errors.email && (
            <span className={styles.authErrorMessage}>
              {errors.email.message as string}
            </span>
          )}
          <input
            id="email"
            type="email"
            placeholder="IvanIvanov@mail.ru"
            {...register("email", {
              required: {
                value: true,
                message: "Введите адрес электронной почты",
              },
            })}
          />
        </div>

        <div>
          <p>Пароль</p>
          {errors.password && (
            <span className={styles.authErrorMessage}>
              {errors.password.message as string}
            </span>
          )}
          <input
            id="password"
            type="password"
            placeholder="Пароль"
            {...register("password", {
              required: {
                value: true,
                message: "Введите пароль",
              },
            })}
          />
        </div>
      </div>

      <div className={styles.authAgreementForm}>
        {submitError && (
          <span className={styles.authErrorMessage}>{submitError}</span>
        )}
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="contained"
          color="success"
          className={styles.authButton}
        >
          {isSubmitting ? "Входим..." : "Авторизоваться"}
        </Button>
      </div>

      <div className={styles.dividerLine}>
        <span className={styles.passwordForgetButton}>Забыли пароль?</span>
      </div>

      <div className={styles.dividerLine}>
        <span>Нет аккаунта? </span>
        <span className={styles.authChangeModeButton} onClick={changeMode}>
          Зарегистрироваться
        </span>
      </div>
    </form>
  );
};

export default AuthForm;
