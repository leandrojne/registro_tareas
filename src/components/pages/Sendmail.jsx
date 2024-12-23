import React, {useEffect, useState} from 'react'

export default function Sendmail() {
    const [tareas, setTareas] = useState([])

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

    }, []);


    return (
        <div className='container'>
            {

                tareas.map((item) => {
                    return (
                        <div key={item.id}>
                            {item.title_task}
                        </div>
                    )
                })
            }
        </div>
    )
}
