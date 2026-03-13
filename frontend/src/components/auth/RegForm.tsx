import { Button } from '@mui/material';
import { useState } from 'react';
import { FieldValues, useForm } from "react-hook-form";

import { registerService } from 'services/authorizationService';
import { registerData } from 'types/authorizationTypes';
import { userSlice } from 'slices/userSlice';
import { useAppDispatch } from 'hooks/redux_hooks';

import 'styles/RegForm.css'


type RegFormProps = {
    setMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegForm: React.FC<RegFormProps> = ({ setMode }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [checkboxState, setCheckBoxState] = useState<boolean>(false);

    const { setUser, setIsLogin } = userSlice.actions
    const dispatch = useAppDispatch()

    const changeMode = () => {
        setMode(false);
    }

    const checkboxChange = () => {
        setCheckBoxState(!checkboxState);
    }

    const handleSubmitEvent = async (data: FieldValues) => {
        await registerService(data as registerData)
            .then(result => {
                dispatch(setUser(result.data.user));
                dispatch(setIsLogin(true));
                localStorage.setItem('token', result.data.token)
            })
            .catch(err => {
                console.error(err);
                dispatch(setIsLogin(true));
                dispatch(setUser({
                    id: '110',
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    phone: data.phone,
                }));
            });
    }

    return (
        <form className='reg-container' onSubmit={handleSubmit(handleSubmitEvent)}>
            <div className='header'>
                <div data-title='true'>Создать аккаунт</div>
                <div >Заполните форму ниже, чтобы зарегистрироваться</div>
            </div>
            
            <div className='reg-form-fields'>
                <div className='form-item'>
                    <div className='field-name'>Имя</div>
                    {errors.firstname && (
                        <span className='reg-error-message'>{errors.firstname.message as string}</span>
                    )}
                    <input
                        id='firstname'
                        placeholder='Иван'
                        {...register('firstname', {
                            required: {
                                value: true,
                                message: 'Введите имя'
                            }
                        })}
                    />
                </div>

                <div className='form-item'>
                    <div className='field-name'>Фамилия</div>
                    {errors.lastname && (
                        <span className='reg-error-message'>{errors.lastname.message as string}</span>
                    )}
                    <input
                        id='lastname'
                        placeholder='Иванов'
                        {...register('lastname', {
                            required: {
                                value: true,
                                message: 'Введите фамилию'
                            }
                        })}
                    />
                </div>

                <div className='form-item'>
                    <div className='field-name'>Адрес электронной почты</div>
                    {errors.email && (
                        <span className='reg-error-message'>{errors.email.message as string}</span>
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

                <div className='form-item'>
                    <div className='field-name'>Номер телефона</div>
                    {errors.phone && (
                        <span className='reg-error-message'>{errors.phone.message as string}</span>
                    )}
                    <input
                        id='phone'
                        type='tel'
                        placeholder='+7 (123) 456-78-90'
                        {...register('phone', {
                            required: {
                                value: true,
                                message: 'Введите номер телефона'
                            }
                        })}
                    />
                </div>

                <div className='form-item'>
                    <div className='field-name'>Пароль</div>
                    {errors.password && (
                        <span className='reg-error-message'>{errors.password.message as string}</span>
                    )}
                    <input
                        id='password'
                        type='password'
                        placeholder='Пароль'
                        {...register('password', {
                            minLength: {
                                value: 8,
                                message: 'Пароль должен быть не менее 8 символов'
                            }
                        })}
                    />
                </div>
                
                <div className='form-item'>
                    <div className='field-name'>Подтверждение пароля</div>
                    {errors.confirm_password && (
                        <span className='reg-error-message'>{errors.confirm_password.message as string}</span>
                    )}
                    <input
                        id='confirm-password'
                        type='password'
                        placeholder='Повторите пароль'
                        {...register('confirm_password', {
                            validate: (value) =>
                                value === (document.getElementById('password') as HTMLInputElement)?.value ||
                                'Пароли не совпадают'
                        })}
                    />
                </div>
            </div>

            <div>
                <input id='agreement' type='checkbox' onChange={checkboxChange} />
                <label htmlFor='agreement'>
                    Я согласен с <span className='conditions-button'>условиями пользования</span>
                    <span> и </span>
                    <span className='conditions-button'>политикой конфидециальности</span>
                </label>
            </div>

            <div className='reg-agreement-form'>
                <Button type='submit' disabled={!checkboxState} variant='contained' color='success' className='reg-button'>Зарегистрироваться</Button>
            </div>

            <div>
                <span>Уже есть аккаунт? </span>
                <span className='reg-change-mode-button' onClick={changeMode}>Авторизоваться</span>
            </div>
        </form>
    );
}

export default RegForm;
