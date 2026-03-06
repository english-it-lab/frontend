import ProfileBar from "../components/profile/ProfileBar";
import QRForm from "../components/profile/QRForm";
import '../styles/ProfilePage.css'
import RetranslatePage from "./RetranslatePage";
import { useAppSelector } from '../hooks/redux_hooks'



const ProfilePage: React.FC = () => {

    const isLogin = useAppSelector(state => state.userReducer.isLogin)

    return (
        <>
            {!isLogin ? <RetranslatePage to='/login'/> :
                <div className="profile-container">
                    
                    <ProfileBar />

                    
                </div>
            }
        </>
    );
}

export default ProfilePage;