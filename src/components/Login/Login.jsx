import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from "../../context/LoginContext.jsx";
import { InfoDataContext } from "../../context/FetchingInfoApp.jsx";
import Cookies from 'js-cookie';


export default function Login() {
    const { setUserLogin } = useContext(LoginContext)
    const { loadingData, setLoadingData } = useContext(InfoDataContext)

    const UserInfo = {
        email: '',
        password: ''
    }

    const [loginUser, setLoginUser] = useState(UserInfo)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        const name = Cookies.get('UserLogin');
    }, []);

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            setLoadingData(true)
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginUser)
            };

            fetch('http://localhost:3030/task/login', requestOptions)
                .then(response => response.json())
                .then((response) => {

                    if (response.login) {
                        setUserLogin({
                            firstName: response.firstName,
                            email: response.email
                        })

                        const infoUserJson = JSON.stringify({
                            firstName: response.firstName,
                            email: response.email
                        })

                        Cookies.set(
                            "UserLogin", infoUserJson, {
                            expires: new Date(new Date().getTime() + 30 * 60 * 1000),
                            sameSite: 'strict',
                        }
                        )
                    } else {
                        alert(response.msj)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    setLoginUser(UserInfo)
                    setLoadingData(false)
                })
        }
    }, [formErrors]);

    const handleInputs = (e) => {
        setLoginUser({
            ...loginUser,
            [e.target.name]: e.target.value
        })
    }

    const validate = (values) => {
        const errors = {};
        if (!values.email) {
            errors.email = "Por favor ingrese su email";
            setLoadingData(false)
        }
        if (!values.password) {
            errors.password = "Por favor ingrese su contraseña";
            setLoadingData(false)
        }
        return errors;
    };

    const sendData = () => {
        setFormErrors(validate(loginUser));
        setIsSubmit(true);
    }

    const login = (e) => {
        e.preventDefault();
        setLoadingData(true)
        sendData();
    }

    return (
        <>
            {
                loadingData
                    ?
                    <div className='loaging'>
                        <div className="loader"></div>
                    </div>
                    :
                    <>
                        <h1>Iniciar Sesión</h1>
                        <div className="login-form">
                            <form>
                                <div className="fields fullwidth">
                                    <div className="field">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            className={formErrors.email ? 'error-input' : 'input'}
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={loginUser.email}
                                            onChange={handleInputs}
                                        />
                                        {formErrors.email && <div className='error'>{formErrors.email}</div>}
                                    </div>
                                </div>
                                <div className="fields fullwidth">
                                    <div className="field">
                                        <label htmlFor="password">Contraseña</label>
                                        <input
                                            className={formErrors.password ? 'error-input' : 'input'}
                                            type="password"
                                            name="password"
                                            id="password"
                                            value={loginUser.password}
                                            onChange={handleInputs}
                                            autocomplete="new-password"
                                            aria-autocomplete="none"
                                        />
                                        {formErrors.password && <div className='error'>{formErrors.password}</div>}
                                    </div>
                                </div>
                                <button type="submit" className="btn" onClick={login}>Log In</button>
                            </form>
                        </div>
                    </>
            }

        </>
    )
}
