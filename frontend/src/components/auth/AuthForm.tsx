import { useState } from 'react';
import { Button } from '@mui/material';
import { FieldValues, useForm } from "react-hook-form";

import { authService } from 'services/authorizationService';
import { authData } from 'types/authorizationTypes';
import DoubleAuthenticationModal from '../DoubleAuthenticationModal';
import { userSlice } from 'slices/userSlice';
import { useAppDispatch } from 'hooks/redux_hooks';

import 'styles/AuthForm.css'


type AuthFormProps = {
    setMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthForm: React.FC<AuthFormProps> = ({ setMode }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('')

    const { setUser, setIsLogin } = userSlice.actions
    const dispatch = useAppDispatch()

    const changeMode = () => {
        setMode(true)
    }

    const checkAuthCode = async () => {
      dispatch(setIsLogin(true));
    }
    
    const handleSubmitEvent = async (data: FieldValues) => {
        setEmail(data.email)
        setModalOpen(true)
        await authService(data as authData)
            .then(result => {
                dispatch(setUser(result.data.user));
                dispatch(setIsLogin(true));
                localStorage.setItem('token', result.data.token)
            })
            .catch(err => {
              console.error(err);
              dispatch(setUser({
                id: '110',
                firstname: 'firstname',
                lastname: 'lastname',
                email: 'email',
                phone: 'phone',
              }));
            });
    }

    return (
        <form className='auth-container' onSubmit={handleSubmit(handleSubmitEvent)}>
            <h1>Войти в аккаунт</h1>
            <p>Заполните форму ниже, чтобы авторизоваться</p>

            <div className='auth-form-fields'>
                <div>
                    <p>Адрес электронной почты</p>
                    {errors.email && (
                        <span className='auth-error-message'>{errors.email.message as string}</span>
                    )}
                    <input
                        id='email'
                        type="email"
                        placeholder='IvanIvanov@mail.ru'
                        {...register('email', {
                            required: {
                                value: true,
                                message: 'Введите адрес электронной почты'
                            }
                        })}
                    />
                </div>

                <div>
                    <p>Пароль</p>
                    {errors.password && (
                        <span className='auth-error-message'>{errors.password.message as string}</span>
                    )}
                    <input
                        id='password'
                        type='password'
                        placeholder='Пароль'
                        {...register('password', {
                            required: {
                                value: true,
                                message: 'Введите пароль'
                            }
                        })}
                    />
                </div>
            </div>

            <div className='auth-agreement-form'>
                <Button type='submit' variant='contained' color='success' className='auth-button'>Авторизоваться</Button>
            </div>

            <div className='div-line'>
                <span className='password-forget-button'>Забыли пароль?</span>
            </div>

            <div className='div-line'>
                <span>Нет аккаунта? </span>
                <span className='auth-change-mode-button' onClick={changeMode}>Зарегистрироваться</span>
            </div>
            <DoubleAuthenticationModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                email={email}
                checkAuthCode={checkAuthCode}
            />
        </form>
    );
}

export default AuthForm;
