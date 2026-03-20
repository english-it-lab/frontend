import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";

import DoubleAuthenticationModal from "@/components/DoubleAuthenticationModal";
import { useAppDispatch } from "@/hooks/redux_hooks";
import { authService } from "@/services/authorizationService";
import { userSlice } from "@/slices/userSlice";
import styles from "@/styles/AuthForm.module.scss";
import type { authData } from "@/types/authorizationTypes";

import type { FieldValues } from "react-hook-form";

type AuthFormProps = {
  setMode: Dispatch<SetStateAction<boolean>>;
};

const AuthForm = ({ setMode }: AuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const { setUser, setIsLogin } = userSlice.actions;
  const dispatch = useAppDispatch();

  const changeMode = () => {
    setMode(true);
  };

  const checkAuthCode = async () => {
    dispatch(setIsLogin(true));
  };

  const handleSubmitEvent = async (data: FieldValues) => {
    setEmail(data.email);
    setModalOpen(true);
    await authService(data as authData)
      .then((result) => {
        dispatch(setUser(result.data.user));
        dispatch(setIsLogin(true));
        localStorage.setItem("token", result.data.token);
      })
      .catch((err) => {
        console.error(err);
        dispatch(
          setUser({
            id: "110",
            firstname: "firstname",
            lastname: "lastname",
            email: "email",
            phone: "phone",
            currentRole: "Участник",
          }),
        );
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
        <Button
          type="submit"
          variant="contained"
          color="success"
          className={styles.authButton}
        >
          Авторизоваться
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
      <DoubleAuthenticationModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        email={email}
        checkAuthCode={checkAuthCode}
      />
    </form>
  );
};

export default AuthForm;
