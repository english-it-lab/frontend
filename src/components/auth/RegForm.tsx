import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";

import { useAppDispatch } from "@/hooks/redux_hooks";
import {
  getAuthErrorMessage,
  registerService,
} from "@/services/authorizationService";
import { userSlice } from "@/slices/userSlice";
import styles from "@/styles/RegForm.module.scss";
import type { registerData } from "@/types/authorizationTypes";

type RegFormProps = {
  setMode: Dispatch<SetStateAction<boolean>>;
};

type RegisterFormData = registerData & {
  confirm_password: string;
};

const RegForm = ({ setMode }: RegFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const [checkboxState, setCheckBoxState] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { setUser, setIsLogin } = userSlice.actions;
  const dispatch = useAppDispatch();

  const changeMode = () => {
    setMode(false);
  };

  const checkboxChange = () => {
    setCheckBoxState(!checkboxState);
  };

  const handleSubmitEvent = async (data: RegisterFormData) => {
    setSubmitError("");
    setIsSubmitting(true);

    await registerService(data)
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
      className={styles.regContainer}
      onSubmit={handleSubmit(handleSubmitEvent)}
    >
      <div className={styles.header}>
        <div data-title="true">Создать аккаунт</div>
        <div>Заполните форму ниже, чтобы зарегистрироваться</div>
      </div>

      <div className={styles.regFormFields}>
        <div className={styles.formItem}>
          <div className={styles.fieldName}>Имя</div>
          {errors.firstname && (
            <span className={styles.regErrorMessage}>
              {errors.firstname.message as string}
            </span>
          )}
          <input
            id="firstname"
            placeholder="Иван"
            {...register("firstname", {
              required: {
                value: true,
                message: "Введите имя",
              },
            })}
          />
        </div>

        <div className={styles.formItem}>
          <div className={styles.fieldName}>Фамилия</div>
          {errors.lastname && (
            <span className={styles.regErrorMessage}>
              {errors.lastname.message as string}
            </span>
          )}
          <input
            id="lastname"
            placeholder="Иванов"
            {...register("lastname", {
              required: {
                value: true,
                message: "Введите фамилию",
              },
            })}
          />
        </div>

        <div className={styles.formItem}>
          <div className={styles.fieldName}>Адрес электронной почты</div>
          {errors.email && (
            <span className={styles.regErrorMessage}>
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

        <div className={styles.formItem}>
          <div className={styles.fieldName}>Номер телефона</div>
          {errors.phone && (
            <span className={styles.regErrorMessage}>
              {errors.phone.message as string}
            </span>
          )}
          <input
            id="phone"
            type="tel"
            placeholder="+7 (123) 456-78-90"
            {...register("phone", {
              required: {
                value: true,
                message: "Введите номер телефона",
              },
            })}
          />
        </div>

        <div className={styles.formItem}>
          <div className={styles.fieldName}>Пароль</div>
          {errors.password && (
            <span className={styles.regErrorMessage}>
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
              minLength: {
                value: 8,
                message: "Пароль должен быть не менее 8 символов",
              },
            })}
          />
        </div>

        <div className={styles.formItem}>
          <div className={styles.fieldName}>Подтверждение пароля</div>
          {errors.confirm_password && (
            <span className={styles.regErrorMessage}>
              {errors.confirm_password.message as string}
            </span>
          )}
          <input
            id="confirm-password"
            type="password"
            placeholder="Повторите пароль"
            {...register("confirm_password", {
              required: {
                value: true,
                message: "Повторите пароль",
              },
              validate: (value) =>
                value === watch("password") || "Пароли не совпадают",
            })}
          />
        </div>
      </div>

      <div>
        <input id="agreement" type="checkbox" onChange={checkboxChange} />
        <label htmlFor="agreement">
          Я согласен с{" "}
          <span className={styles.conditionsButton}>условиями пользования</span>
          <span> и </span>
          <span className={styles.conditionsButton}>
            политикой конфидециальности
          </span>
        </label>
      </div>

      <div className={styles.regAgreementForm}>
        {submitError && (
          <span className={styles.regErrorMessage}>{submitError}</span>
        )}
        <Button
          type="submit"
          disabled={!checkboxState || isSubmitting}
          variant="contained"
          color="success"
          className={styles.regButton}
        >
          {isSubmitting ? "Регистрируем..." : "Зарегистрироваться"}
        </Button>
      </div>

      <div>
        <span>Уже есть аккаунт? </span>
        <span className={styles.regChangeModeButton} onClick={changeMode}>
          Авторизоваться
        </span>
      </div>
    </form>
  );
};

export default RegForm;
