import { createContext, useEffect, useState } from "react";

export const InfoDataContext = createContext()

export const InfoDataProvider = ({ children }) => {
    const [taskData, setTaskData] = useState([]);
    const [priorityData, setPriorityData] = useState([]);
    const [statusData, setStatusData] = useState([]);
    const [users, setUsers] = useState([]);
    const [loadingData, setLoadingData] = useState(false);
    const [itemToEdit, setItemToEdit] = useState([]);

    useEffect(() => {
        fetch('https://tareas.idiomavisual.com/task/priority', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then((data) => {
                setPriorityData(data)
            })
            .catch(error => {
                throw error
            })

    }, []);

    useEffect(() => {
        fetch('https://tareas.idiomavisual.com/task/status', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then((data) => {
                setStatusData(data)
            })
            .catch(error => {
                throw error
            })

    }, []);

    useEffect(() => {
        fetch('https://tareas.idiomavisual.com/task/users', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then((data) => {
                setUsers(data)
            })
            .catch(error => {
                throw error
            })

    }, []);

    return (
        <InfoDataContext.Provider value={{ taskData, setTaskData, priorityData, statusData, users, loadingData, setLoadingData, itemToEdit, setItemToEdit }}>
            {children}
        </InfoDataContext.Provider>
    )
}