import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Header from "./components/Header/Header.jsx";
import './styles/styles.less'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Footer from "./components/Footer/Footer.jsx";
import AddNewTask from "./components/Forms/AddNewTask.jsx";
import {InfoDataProvider} from "./context/FetchingInfoApp.jsx";
import UpdateTask from "./components/Forms/UpdateTask.jsx";
import {LoginContextProvider} from "./context/LoginContext.jsx";
import Sendmail from "./components/pages/Sendmail.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <LoginContextProvider>
            <BrowserRouter>
                <InfoDataProvider>
                    <Header/>
                        <div className="main-content container">
                            <Routes>
                                <Route path='/' element={<App/>}/>
                                <Route exact path='/form/add_task' element={<AddNewTask/>}/>
                                <Route exact path='/form/update_task' element={ <UpdateTask /> }/>
                                <Route exact path='/sendmail' element={ <Sendmail /> }/>
                                <Route path='*' element={
                                    <>
                                        <h1>Pag no encontrada!!</h1>
                                    </>
                                } />
                            </Routes>
                        </div>
                    <Footer/>
                </InfoDataProvider>
            </BrowserRouter>
        </LoginContextProvider>
    </StrictMode>
,
)
