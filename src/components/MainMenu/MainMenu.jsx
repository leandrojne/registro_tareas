import { IoMdMenu, IoMdClose } from "react-icons/io";
import { NavLink} from "react-router-dom";
import {useState} from "react";

export default function MainMenu() {
    const [openMenu, setOpenMenu] = useState(false)
    const openMenuAction = () => setOpenMenu(!openMenu)

    return (
        <div className='main-menu'>
            <div className="icon" onClick={openMenuAction}>
                {
                    openMenu
                        ?
                        <IoMdClose />
                        :
                        <IoMdMenu />
                }
            </div>
            {
                openMenu &&
                <div className="content-menu">
                    <div className="close" onClick={openMenuAction}>
                        <IoMdClose />
                    </div>
                    <NavLink to='/form/add_task'>
                        Agregar Nueva Tarea
                    </NavLink>
                </div>
            }

        </div>
    )
}
