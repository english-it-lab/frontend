import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";

import { useAppDispatch } from "@/hooks/redux_hooks";
import { registerService } from "@/services/authorizationService";
import { userSlice } from "@/slices/userSlice";
import styles from "@/styles/RegForm.module.scss";
import type { registerData } from "@/types/authorizationTypes";

import type { FieldValues } from "react-hook-form";

type RegFormProps = {
  setMode: Dispatch<SetStateAction<boolean>>;
};

const RegForm = ({ setMode }: RegFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [checkboxState, setCheckBoxState] = useState<boolean>(false);

  const { setUser, setIsLogin } = userSlice.actions;
  const dispatch = useAppDispatch();

  const changeMode = () => {
    setMode(false);
  };

  const checkboxChange = () => {
    setCheckBoxState(!checkboxState);
  };

  const handleSubmitEvent = async (data: FieldValues) => {
    await registerService(data as registerData)
      .then((result) => {
        dispatch(setUser(result.data.user));
        dispatch(setIsLogin(true));
        localStorage.setItem("token", result.data.token);
      })
      .catch((err) => {
        console.error(err);
        dispatch(setIsLogin(true));
        dispatch(
          setUser({
            id: "110",
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            phone: data.phone,
            currentRole: data.currentRole,
          }),
        );
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
              validate: (value) =>
                value ===
                  (document.getElementById("password") as HTMLInputElement)
                    ?.value || "Пароли не совпадают",
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
        <Button
          type="submit"
          disabled={!checkboxState}
          variant="contained"
          color="success"
          className={styles.regButton}
        >
          Зарегистрироваться
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
