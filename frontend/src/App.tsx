import { useEffect, useState } from 'react';
import Router from './routers/Router';
import { checkAuth, getToken } from './services/authorizationService';
import { userSlice } from './slices/userSlice';
import { useAppDispatch } from './hooks/redux_hooks';

const App = () => {
    const { setUser, setIsLogin } = userSlice.actions
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        getToken().then(() => {
            console.log('net')
            if (localStorage.getItem('token')) {
                checkAuth().then(result => {
                    dispatch(setUser(result.data.user))
                    dispatch(setIsLogin(true))
                    localStorage.setItem('token', result.data.token)
                    setIsLoading(false)
                }).catch(err => { console.error(err); setIsLoading(false) })
            }
            else {
              setIsLoading(false)
            }
        })
    }, [])

    return (
      <>
          {isLoading ? <></> : <Router />}
      </>
    );
}

export default App;
