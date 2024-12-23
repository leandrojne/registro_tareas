import ItemTarea from "../ItemTarea/ItemTarea.jsx";
import React, {useContext, useEffect, useState} from "react";
import {InfoDataContext} from "../../context/FetchingInfoApp.jsx";
import { IoArchiveOutline } from "react-icons/io5";
import {FaClipboardList} from "react-icons/fa";
import {Link} from "react-router-dom";

export default function ListaTareasContainer() {

    const { loadingData, setLoadingData } = useContext(InfoDataContext)
    const [tareas, setTareas] = useState([])
    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        setLoadingData(true)
            fetch('http://localhost:3030/task/tasks', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => response.json())
                .then((data) => {
                    setTareas(data)
                })
                .catch(error => {
                    throw error
                })
                .finally(()=>{
                    setLoadingData(false)
                })
    }, []);

    useEffect(() => {
        fetch('http://localhost:3030/task/tasks', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then((data) => {
                setTareas(data)
            })
            .catch(error => {
                throw error
            })
    }, [loadingData]);


    return (
        <div className='container-list'>
            {
                !loadingData
                    ?
                    tareas.length > 0
                        ?
                        tareas.map((item)=>{
                           return <ItemTarea key={ item.id } item={item} date={startDate}/>
                        })
                        :
                        <div className='empty-tasks'>
                            <div className='content'>
                                <IoArchiveOutline className='icon'/>
                                <span>No hay tareas disponibles</span>
                                <Link to='/form/add_task' className='add-task'>
                                    <span>Agregar una tarea</span> <span className='add-icon'><FaClipboardList/></span>
                                </Link>
                            </div>
                        </div>
                    :
                    <div className='loaging'>
                        <div className="loader"></div>
                    </div>

            }
        </div>
    )
}
