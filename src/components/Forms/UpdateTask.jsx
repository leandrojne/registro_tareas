import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import {InfoDataContext} from "../../context/FetchingInfoApp.jsx";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import  es  from 'date-fns/locale/es';
import Login from "../Login/Login.jsx";
import {LoginContext} from "../../context/LoginContext.jsx";
registerLocale('es', es);

export default function UpdateTask() {
    const goBackLink = useNavigate();
    const { priorityData, users, statusData, loadingData, setLoadingData, itemToEdit  } = useContext(InfoDataContext)
    const [dateEnd, setDateEnd] = useState()
    const dateEdit = Object.keys(itemToEdit).length > 0 ? new Date(itemToEdit.date_end) : '';
    const { userLogin } = useContext(LoginContext)
    const dateNowTest = new Date()



    useEffect(() => {
        setDateEnd(dateEdit)
    }, []);

    const usuario = {
        id: itemToEdit.id,
        titletask: itemToEdit.title_task,
        fechaEnd: itemToEdit.date_end,
        status: itemToEdit.status_task,
        lugar: itemToEdit.place_task,
        prioridad: itemToEdit.priority_task,
        responsable: itemToEdit.assigned_to,
        createdBy: itemToEdit.created_by
    }
    const usuarioEmpty = {
        id: '',
        titletask: '',
        fechaEnd: '',
        status: 'pendiente',
        lugar: '',
        prioridad: '',
        responsable:'',
        createdBy: ''
    }
    const [inputsForm, setInputsForm] = useState(usuario)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            setLoadingData(true)

            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputsForm)
            };

            fetch('http://localhost:3030/task/update', requestOptions)
                .then(()=>{
                    console.log('todo OK !!!!')
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(()=>{
                    setInputsForm(usuarioEmpty)
                    setLoadingData(false)
                    goBackLink(-1)
                })
        }
    }, [formErrors]);


    const handleInputs = (e) => {
        setInputsForm({
            ...inputsForm,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        setInputsForm({
            ...inputsForm,
            fechaEnd: dateEnd
        })
    }, [dateEnd]);

    const validate = (values) => {

        const errors = {};
        if (!values.titletask) {
            errors.titletask = "Titulo de la tarea es Obligatorio";
        }
        if (!values.fechaEnd || values.fechaEnd === null || values.fechaEnd < dateNowTest) {
            errors.fechaEnd = "Fecha y Hora es obligatoria y debe ser mayor a la hora actual!";
        }
        if (!values.lugar) {
            errors.lugar = "Lugar es Obligatorio";
        }
        if (!values.responsable) {
            errors.responsable = "Responsable es Obligatorio";
        }
        if (!values.prioridad) {
            errors.prioridad = "Prioridad es Obligatorio";
        }
        return errors;
    };

    const newUsers = (e) => {
        e.preventDefault()
        setFormErrors(validate(inputsForm));
        setIsSubmit(true);

    }

    const cancelForm = (e) => {
        e.preventDefault()
        goBackLink(-1)
    }

    return (

        <>
            {
                userLogin.firstName
                    ?
                    <>
                        {
                            loadingData
                                ?
                                <div className='loaging'>
                                    <div className="loader"></div>
                                </div>
                                :
                                'title_task' in itemToEdit
                                    ?
                                    <>
                                        <h1>Actualizar tarea</h1>
                                        <div className='form'>
                                            <form>
                                                <div className="fields fullwidth">
                                                    <div className="field">
                                                        <label htmlFor="titletask">Titulo de la tarea</label>
                                                        <input
                                                            className={formErrors.titletask ? 'error-input' : 'input'}
                                                            type="text"
                                                            name='titletask'
                                                            placeholder=''
                                                            value={inputsForm.titletask}
                                                            onChange={handleInputs}
                                                        />
                                                        {formErrors.titletask &&
                                                            <div className='error'>{formErrors.titletask}</div>}
                                                    </div>
                                                </div>
                                                <div className="fields columns2">
                                                    <div className="field">
                                                        <label htmlFor="fechaEnd">Fecha & Hora</label>
                                                        <DatePicker
                                                            locale="es"
                                                            className={formErrors.fechaEnd ? 'error-input' : 'input'}
                                                            selected={dateEnd}
                                                            onChange={(date) => setDateEnd(date)}
                                                            name='fechaEnd'
                                                            showTimeSelect
                                                            dateFormat="P | HH:mm 'hrs'"
                                                            timeIntervals={5}
                                                            timeFormat='HH:mm'

                                                        />
                                                        {formErrors.fechaEnd &&
                                                            <div className='error'>{formErrors.fechaEnd}</div>}
                                                    </div>
                                                    <div className="field">
                                                        <label htmlFor="lugar">Lugar</label>
                                                        <input
                                                            className={formErrors.lugar && 'error-input'}
                                                            type="text"
                                                            name='lugar'
                                                            placeholder=''
                                                            value={inputsForm.lugar}
                                                            onChange={handleInputs}
                                                        />
                                                        {formErrors.lugar &&
                                                            <div className='error'>{formErrors.lugar}</div>}
                                                    </div>
                                                </div>
                                                <div className="fields columns2">
                                                    <div className="field">
                                                        <label htmlFor="prioridad">Prioridad</label>
                                                        <select name="prioridad" id="prioridad"
                                                                defaultValue={inputsForm.prioridad}
                                                                onChange={handleInputs}>
                                                            {
                                                                priorityData?.map((item) => {
                                                                    return <option value={item._priority}
                                                                                   name={item._priority}
                                                                                   key={item.id}>{item._priority}</option>
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className="field">
                                                        <label htmlFor="responsable">Responsable</label>
                                                        <select name="responsable" id="responsable"
                                                                defaultValue={inputsForm.responsable}
                                                                onChange={handleInputs}>
                                                            {
                                                                users?.map((item) => {
                                                                    return <option value={item.first_name}
                                                                                   name={item.first_name}
                                                                                   key={item.id}>{item.first_name}</option>
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="fields columns2">
                                                    <div className="field">
                                                        <label htmlFor="status">Status</label>
                                                        <select name="status" id="status"
                                                                defaultValue={inputsForm.status}
                                                                onChange={handleInputs}>
                                                            {
                                                                statusData?.map((item) => {
                                                                    return <option value={item._status}
                                                                                   name={item._status}
                                                                                   key={item.id}>{item._status}</option>
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <button className='btn btn-primary' onClick={newUsers}>Guardar</button>
                                                <button className='btn btn-cancel' onClick={cancelForm}>Cancel</button>
                                            </form>
                                        </div>
                                    </>
                                    :
                                    <h1>No hay tareas para editar!!!!</h1>

                        }
                    </>
                    :
                    <Login/>

            }
        </>

    )
}
