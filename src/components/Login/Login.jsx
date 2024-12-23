import React, { useContext, useEffect, useState } from 'react'
import { LoginContext } from "../../context/LoginContext.jsx";
import { InfoDataContext } from "../../context/FetchingInfoApp.jsx";
import Cookies from 'js-cookie';
import { VscError } from "react-icons/vsc";


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
    const [infoErrorLogin, setInfoErrorLogin] = useState('');
    const [errorLogin, setErrorLogin] = useState(false);

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

            fetch('https://tareas.idiomavisual.com/task/login', requestOptions)
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
                        setInfoErrorLogin(response.msj)
                        showError()
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

    const showError = () => {
        setErrorLogin(true)
        setTimeout(() => {
            setErrorLogin(false)
        }, 5000);
    }

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
                        {
                            errorLogin &&
                            <div className="info_error">
                                <VscError />
                                {infoErrorLogin}
                            </div>
                        }
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


                        <h2 className='test-title'>Usuarios de Prueba:</h2>
                        <div className="user-pass-test">
                            <div className="info">
                                <h3>user01</h3>
                                <ul>
                                    <li> emai: user@user01.com</li>
                                    <li>pass: User12345*</li>
                                </ul>
                            </div>
                            <div className="info">
                                <h3>user02</h3>
                                <ul>
                                    <li> emai: user@user02.com</li>
                                    <li>pass: User12345*</li>
                                </ul>
                            </div>
                        </div>
                    </>
            }

        </>
    )
}
