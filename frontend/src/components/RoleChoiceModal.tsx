import { Button, Modal } from "@mui/material";

import { useAppSelector, useAppDispatch } from 'hooks/redux_hooks'
import { IUser } from "interfaces/userInterface";
import { userSlice } from 'slices/userSlice';

import 'styles/RoleChoicePage.css'

type RoleChoiceProps = {
    editRole: boolean;
    setEditRole: React.Dispatch<React.SetStateAction<boolean>>;
}

const RoleChoiceModal: React.FC<RoleChoiceProps> = ({ editRole, setEditRole }) => {

    const { setUser } = userSlice.actions
    const initialUser = useAppSelector(state => state.userReducer.user) || {} as IUser;
    const dispatch = useAppDispatch()

    const changeRole = (role: string) => {
        dispatch(setUser({ ...initialUser, currentRole: role }))
        setEditRole(false)
        // Добавить request для смены роли на сервере
    }

    return (
        <Modal
                open={editRole}
                onClose={() => setEditRole(false)}
            >
                <div className="role-page-container">
                    <div className="role-choice-container">
                        <h1>Я захожу в качестве...</h1>

                        <div className="roles-container">
                            <div className='role-choice-form'>
                                <Button type='submit' variant='contained' color='success' className='role-button' onClick={() => changeRole('Участник')}>Участник</Button>
                            </div>

                            <div className='role-choice-form'>
                                <Button type='submit' variant='contained' color='success' className='role-button' onClick={() => changeRole('Организатор')}>Организатор</Button>
                            </div>

                            <div className='role-choice-form'>
                                <Button type='submit' variant='contained' color='success' className='role-button' onClick={() => changeRole('Член жюри')}>Член жюри</Button>
                            </div>
                        </div>
                    </div>
                </div>    
            </Modal>
    );
}

export default RoleChoiceModal;