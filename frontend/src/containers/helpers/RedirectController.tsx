import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { RootState } from "store/store";
import PATHS from "constants/paths";


const RedirectController = () => {
	const navigate = useNavigate();
	const isLogin = useSelector((state: RootState) => state.userReducer.isLogin);
	
	useEffect(() => {
		if (!isLogin) {
			navigate(PATHS.LOGIN);
		}
	}, [isLogin]);
	
	return null;
}

export default RedirectController;
