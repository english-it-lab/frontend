import { useEffect } from "react";

import { checkAuth, getToken } from "services/authorizationService";
import { userSlice } from "slices/userSlice";
import { useAppDispatch } from "hooks/redux_hooks";


const LocalStorageSaver = () => {
	const { setUser, setIsLogin } = userSlice.actions;
	const dispatch = useAppDispatch();
	
	useEffect(() => {
		getToken().then(() => {
			if (localStorage.getItem('token')) {
				checkAuth().then(result => {
					dispatch(setUser(result.data.user));
					dispatch(setIsLogin(true));
					localStorage.setItem('token', result.data.token);
				}).catch(err => {
					console.error(err);
				})
			}
		})
	}, []);
	
	return null;
}

export default LocalStorageSaver;
