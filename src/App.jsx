import ListaTareasContainer from "./components/ListaTareasContainer/ListaTareasContainer.jsx";
import React, {useContext} from "react";
import {LoginContext} from "./context/LoginContext.jsx";
import Login from "./components/Login/Login.jsx";

function App() {
    const { userLogin } = useContext(LoginContext)

  return (
    <>
        {
            userLogin.firstName
                ?
                <>
                    <h1>TAREAS PENDIENTES</h1>
                    <ListaTareasContainer/>
                </>
                :
                <Login />

        }
    </>
  )
}

export default App
