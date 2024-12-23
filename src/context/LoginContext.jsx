import {createContext, useState, useEffect} from "react";
import Cookies from 'js-cookie';

export const LoginContext = createContext(undefined)

export function LoginContextProvider({ children }) {
    const UserInfo = {
        firstName: '',
        email: ''
    }
    const [userLogin, setUserLogin] = useState(UserInfo)
    const [userLogOut, setUserLogOut] = useState(UserInfo)
    const UserCookieActive =Cookies.get('UserLogin')

    useEffect(()=>{
        setUserLogin(UserInfo)
    }, [userLogOut])

    useEffect(() => {
        if( UserCookieActive !== undefined){
            setUserLogin(JSON.parse(Cookies.get('UserLogin')))
        }
    }, []);

    const logOutUser = (e) => {
        e.preventDefault()
        Cookies.remove('UserLogin')
        setUserLogOut(UserInfo)
    }

    return (
        <LoginContext.Provider value={{
            userLogin,
            setUserLogin,
            logOutUser
        }}>
            {children}
        </LoginContext.Provider>
    )

}