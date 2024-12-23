import { IoIosTrash, IoMdCreate, IoMdCheckboxOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { InfoDataContext } from "../../context/FetchingInfoApp.jsx";

export default function ItemTarea({ item }) {
    const dateEndInfo = new Date(item.date_end)
    const dateEnd = ('0' + dateEndInfo.getDate()).substr(-2) + '/' + ('0' + (dateEndInfo.getMonth() + 1)).substr(-2) + '/' + dateEndInfo.getFullYear()
    const horaEnd = ('0' + dateEndInfo.getHours()).substr(-2) + ':' + ('0' + dateEndInfo.getMinutes()).substr(-2)
    const dateCreatedInfo = new Date(item.created_at)
    const dateCreated = ('0' + dateCreatedInfo.getDate()).substr(-2) + '/' + ('0' + (dateEndInfo.getMonth() + 1)).substr(-2) + '/' + dateCreatedInfo.getFullYear()
    const { setItemToEdit, setLoadingData } = useContext(InfoDataContext)
    const dateNowTest = new Date()



    useEffect(() => {
        if (dateEndInfo < dateNowTest && item.status_task !== 'listo' && item.status_task !== 'vencido') {
            if (dateEndInfo < dateNowTest) {
                statusTaskVencido({ item })
            }
        }
    }, [])

    const deleteTarea = (e) => {
        e.preventDefault()
        setLoadingData(true)

        const requestOptions = {
            method: 'DELETE'
        };

        fetch(`https://tareas.idiomavisual.com/task/delete/${item.id}`, requestOptions)
            .then(() => {
                console.log('todo OK')
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setLoadingData(false)
            })
    }

    const clickDone = ({ item }) => {
        const status = {
            id: item.id,
            status: 'listo'
        }
        setLoadingData(true)
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(status)
        };

        fetch('https://tareas.idiomavisual.com/task/update_status', requestOptions)
            .then(() => {
                console.log('todo OK')
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setLoadingData(false)
            })

    }

    const statusTaskVencido = ({ item }) => {
        const status = {
            id: item.id,
            status: 'vencido'
        }
        setLoadingData(true)
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(status)
        };

        fetch('https://tareas.idiomavisual.com/task/update_status', requestOptions)
            .then(() => {
                console.log('todo OK')
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setLoadingData(false)
            })
    }

    return (
        <div className={`${item.priority_task} ${item.status_task} tarea`}>

            <div className="tarea-content">
                <div className="avatar-container">
                    <div className="avatar">
                        {item.assigned_to.substring(0, 1)}
                    </div>
                </div>
                <div className="info-tarea">
                    <h2>{item.title_task}</h2>
                    <div className="status-priority">
                        <div className={`status ${item.status_task}`}>
                            Status: <span>{item.status_task}</span>
                        </div>
                        <div className="prioridad">
                            Prioridad: <span>{item.priority_task}</span>
                        </div>
                    </div>
                    <div className="date-place">
                        <div className="fecha">
                            Fecha: <span>{dateEnd}</span>
                        </div>
                        <div className="hora">
                            hora: <span>{horaEnd}</span>
                        </div>
                        <div className="lugar">
                            Lugar: <span>{item.place_task}</span>
                        </div>
                    </div>
                    <div className="responsable">
                        Pesponsable: <span>{item.assigned_to}</span>
                    </div>

                </div>
                <div className="actions">
                    <Link className='edit' to='/form/update_task' onClick={() => {
                        setItemToEdit(item)
                    }}>
                        <IoMdCreate />
                    </Link>
                    <Link className='delete' to={deleteTarea} onClick={deleteTarea}>
                        <IoIosTrash />
                    </Link>
                    <Link className={item.status_task + ' ' + 'done'} to='/' onClick={() => {
                        clickDone({ item })
                    }}>
                        <IoMdCheckboxOutline />
                    </Link>

                </div>
            </div>
            <div className="tarea-created">
                Creada por: {item.created_by} | Fecha de Creacion: {dateCreated}
            </div>
        </div>
    )
}
