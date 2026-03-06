import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from '../hooks/redux_hooks';
import RetranslatePage from "./RetranslatePage";
import '../styles/RoleChoicePage.css'
import { useNavigate } from "react-router-dom";


const RoleChoicePage = () => {
    const isLogin = useAppSelector(state => state.userReducer.isLogin)
    const navigate = useNavigate()

    const chooseRole = () => {
        navigate('/profile')
    }

    return (
        <div className="role-page-container">
            {!isLogin ? <RetranslatePage to='/login' /> :
                <div className="role-choice-container">
                    <h1>Я захожу в качестве...</h1>

                    <div className="roles-container">
                        <div className='role-choice-form'>
                            <Button type='submit' variant='contained' color='success' className='role-button' onClick={chooseRole}>Участник</Button>
                        </div>

                        <div className='role-choice-form'>
                            <Button type='submit' variant='contained' color='success' className='role-button' onClick={chooseRole}>Организатор</Button>
                        </div>

                        <div className='role-choice-form'>
                            <Button type='submit' variant='contained' color='success' className='role-button' onClick={chooseRole}>Член жури</Button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default RoleChoicePage;