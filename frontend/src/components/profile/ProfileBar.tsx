import { Button, IconButton } from '@mui/material';
import '../../styles/ProfileBar.css'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { useState } from 'react';
import { IUser } from '../../interfaces/userInterface';
import { useAppSelector, useAppDispatch } from '../../hooks/redux_hooks'
import { userSlice } from '../../slices/userSlice';
import { logout } from '../../services/authorizationService';

const ProfileBar = () => {
    const [editFirstname, setEditFirstname] = useState<boolean>(false);
    const [editLastname, setEditLastname] = useState<boolean>(false);
    const [editPhone, setEditPhone] = useState<boolean>(false);
    const [editEmail, setEditEmail] = useState<boolean>(false);


    const { setUser, setIsLogin } = userSlice.actions
    const initialUser = useAppSelector(state => state.userReducer.user)
    const dispatch = useAppDispatch()

    const [user, setUser1] = useState<IUser>({
        firstname: initialUser.firstname,
        lastname: initialUser.lastname,
        phone: initialUser.phone,
        email: initialUser.email,
        id: initialUser.id
    } as IUser)

    const handleFirstnameChange = (event: React.ChangeEvent) => {
        event.preventDefault()
        setUser1({ ...user, firstname: (event.target as HTMLInputElement).value })
    }

    const handleLastnameChange = (event: React.ChangeEvent) => {
        event.preventDefault()
        setUser1({ ...user, lastname: (event.target as HTMLInputElement).value })
    }

    const handlePhoneChange = (event: React.ChangeEvent) => {
        event.preventDefault()
        setUser1({ ...user, phone: (event.target as HTMLInputElement).value })
    }

    const handleEmailChange = (event: React.ChangeEvent) => {
        event.preventDefault()
        setUser1({ ...user, email: (event.target as HTMLInputElement).value })
    }

    const handleLogout = async () => {
        await logout()
            .then(() => {
                localStorage.removeItem('token');
                dispatch(setUser({} as IUser))
                dispatch(setIsLogin(false));
            })
            .catch(err => console.error(err))
    }

    return (
        <div className="profile-bar-container">
            <h1>Добро пожаловать, {initialUser.firstname}!</h1>

            <div className='profile-info-container'>
                <div>
                    <p>UserID</p>
                    
                    <p>{initialUser.id}</p>
                </div>
                
                <div>
                    <p>Имя</p>
                    <div>
                        <input disabled={!editFirstname} value={user.firstname} onChange={handleFirstnameChange}/>
                        <IconButton size='small' onClick={() => setEditFirstname(!editFirstname)}>
                            {editFirstname ? <CheckCircleOutlineOutlinedIcon /> : <EditOutlinedIcon />}
                        </IconButton>
                    </div>
                </div>

                <div>
                    <p>Фамилия</p>
                    <div>
                        <input disabled={!editLastname} value={user.lastname} onChange={handleLastnameChange}/>
                        <IconButton size='small' onClick={() => setEditLastname(!editLastname)}>
                            {editLastname ? <CheckCircleOutlineOutlinedIcon /> : <EditOutlinedIcon />}
                        </IconButton>
                    </div>
                </div>
                
                <div>
                    <p>Телефон</p>
                    <div>
                        <input disabled={!editPhone} type='tel' value={user.phone} onChange={handlePhoneChange}/>
                        <IconButton size='small' onClick={() => setEditPhone(!editPhone)}>
                            {editPhone ? <CheckCircleOutlineOutlinedIcon /> : <EditOutlinedIcon />}
                        </IconButton>
                    </div>
                </div>

                <div>
                    <p>Адрес электронной почты</p>
                    <div>
                        <input disabled={!editEmail} value={user.email} type='email' onChange={handleEmailChange}/>
                        <IconButton size='small' onClick={() => setEditEmail(!editEmail)}>
                            {editEmail ? <CheckCircleOutlineOutlinedIcon /> : <EditOutlinedIcon />}
                        </IconButton>
                    </div>
                </div>
            </div>

            <div className='logout-button-container'>
                <Button color='error' variant='contained' onClick={handleLogout}>Выйти</Button>
            </div>

        </div>
    );
}

export default ProfileBar;