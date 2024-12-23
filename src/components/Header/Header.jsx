import Logo from '../../assets/logo_LTP.png'
import MainMenu from "../MainMenu/MainMenu.jsx";
import { Link, NavLink } from "react-router-dom";
import React, { useContext } from "react";
import { LoginContext } from "../../context/LoginContext.jsx";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import { FaClipboardList } from "react-icons/fa";


export default function Header() {
    const { userLogin, logOutUser } = useContext(LoginContext)

    return (
        <>
            <div className="top-header">
                <div className="container">
                    {
                        userLogin.firstName
                            ?
                            <div className='info-login'><span>Hola, {userLogin.firstName}</span> <span className='logout-link' onClick={logOutUser}><BiLogOut /></span> </div>
                            :
                            <div className='info-login'><span>Iniciar Sesión</span><span className='login-link'><BiLogIn /></span></div>
                    }
                </div>
            </div>
            <header className='container full-width header'>
                <div className="content-center">
                    <div className="logo">
                        <Link to='/'><img src={Logo} alt="" /></Link>
                    </div>

                    {
                        userLogin.firstName
                        &&
                        <Link to='/form/add_task' className='add-task'>
                            <span>Agregar una tarea</span> <span className='add-icon'><FaClipboardList /></span>
                        </Link>

                    }


                </div>
            </header>
        </>
    )
}
