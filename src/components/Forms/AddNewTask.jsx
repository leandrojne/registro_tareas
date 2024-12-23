import React, {useContext, useEffect, useState} from "react";
import {InfoDataContext} from "../../context/FetchingInfoApp.jsx";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import  es  from 'date-fns/locale/es';
import { useNavigate } from "react-router-dom";
import {LoginContext} from "../../context/LoginContext.jsx";
import Login from "../Login/Login.jsx";
registerLocale('es', es);


export default function AddNewTask() {
    const goBackLink = useNavigate();
    const { priorityData, users, loadingData, setLoadingData } = useContext(InfoDataContext)
    const { userLogin } = useContext(LoginContext)
    const [dateEnd, setDateEnd] = useState()
    const usuario = {
        titletask: '',
        fechaEnd: '',
        lugar: '',
        prioridad: '',
        responsable: '',
        createdBy: ''
    }
    const [inputsForm, setInputsForm] = useState(usuario)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false);


    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            setLoadingData(true)
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputsForm)
            };

            fetch('http://localhost:3030/task/add', requestOptions)
                .then(()=>{
                    console.log('todo OK')
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(()=>{
                    setInputsForm(usuario)
                    setLoadingData(false)
                    goBackLink(-1)
                })
        }
    }, [formErrors]);


    const handleInputs = (e) => {
        setInputsForm({
            ...inputsForm,
            [e.target.name]: e.target.value,
            createdBy: userLogin.firstName
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
            errors.titletask = "titletask is required!";
        }
        if (!values.fechaEnd || values.fechaEnd === null) {
            errors.fechaEnd = "fechaEnd is required!";
        }
        if (!values.lugar) {
            errors.lugar = "titletask is required!";
        }
        if (!values.responsable) {
            errors.responsable = "responsable is required!";
        }
        if (!values.prioridad) {
            errors.prioridad = "prioridad is required!";
        }
        return errors;
    };

    const newUsers = (e) => {
        e.preventDefault()
        setFormErrors(validate(inputsForm));
        setIsSubmit(true);
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
                                <>
                                    <h1>Agregar una nueva tarea</h1>
                                    <div className='form'>
                                        <form onSubmit={newUsers}>
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
                                                    {formErrors.titletask && <div className='error'>{formErrors.titletask}</div>}
                                                </div>

                                            </div>
                                            <div className="fields columns2">
                                                <div className="field">
                                                    <label htmlFor="fechaEnd">Fecha & Hora</label>
                                                    <DatePicker
                                                        className={formErrors.fechaEnd ? 'error-input' : 'input'}
                                                        selected={dateEnd}
                                                        onChange={(date) => setDateEnd(date)}
                                                        name='fechaEnd'
                                                        showTimeSelect
                                                        dateFormat="P | HH:mm 'hrs'"
                                                        timeIntervals={5}
                                                        timeFormat='HH:mm'
                                                        locale="es"
                                                    />
                                                    {formErrors.fechaEnd && <div className='error'>{formErrors.fechaEnd}</div>}
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
                                                    {formErrors.lugar && <div className='error'>{formErrors.lugar}</div>}
                                                </div>
                                            </div>
                                            <div className="fields columns2">
                                                <div className="field">
                                                    <label htmlFor="prioridad">Prioridad</label>
                                                    <select name="prioridad" id="prioridad" defaultValue="-"
                                                            className={formErrors.prioridad && 'error-input'}
                                                            onChange={handleInputs}>
                                                        <option value="">seleccione una opcion</option>
                                                        {
                                                            priorityData?.map((item) => {
                                                                return <option value={item._priority} name={item._priority}
                                                                               key={item.id}>{item._priority}</option>
                                                            })
                                                        }
                                                    </select>
                                                    {formErrors.prioridad && <div className='error'>{formErrors.prioridad}</div>}
                                                </div>
                                                <div className="field">
                                                    <label htmlFor="responsable">Responsable</label>
                                                    <select name="responsable"
                                                            id="responsable"
                                                            className={formErrors.responsable && 'error-input'}
                                                            onChange={handleInputs}>
                                                        <option value="">seleccione una opcion</option>
                                                        {
                                                            users?.map((item) => {
                                                                return <option value={item.first_name} name={item.first_name}
                                                                               key={item.id}>{item.first_name}</option>
                                                            })
                                                        }
                                                    </select>
                                                    {formErrors.responsable && <div className='error'>{formErrors.responsable}</div>}
                                                </div>
                                            </div>
                                            <button>enviar</button>
                                        </form>
                                    </div>
                                </>
                        }
                    </>
                    :
                    <Login />

            }
        </>

    )
}
