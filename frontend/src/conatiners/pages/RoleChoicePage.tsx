import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import PATHS from "constants/paths";

import 'styles/RoleChoicePage.css'


const RoleChoicePage = () => {
    const navigate = useNavigate()

    const chooseRole = () => {
        navigate(PATHS.PROFILE);
    }

    return (
        <div className="role-page-container">
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
        </div>
    );
}

export default RoleChoicePage;
