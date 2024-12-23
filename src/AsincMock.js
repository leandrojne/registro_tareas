const tareas = [
    {
        "id": 1,
        "title_task": "almuerzo en cada de abueli",
        "status_task": "pendiente",
        "date_end": "2024-08-30 10:00:00",
        "place": "Casa abueli",
        "assigned_to": "Leandro",
        "priority_task":"normal",
        "created_by":"Atamaica",
        "created_date":"2024-08-10 15:00:00"
    },
    {
        "id": 2,
        "title": "BUSCAR JUGUETE PERIDO",
        "status": "pendiente",
        "date_end": "31/12/24",
        "hour": "23:59",
        "place": "Casa",
        "assigned_to": "Massiel",
        "priority":"baja",
        "created_by":"Atamaica",
        "created_date":"10/06/24"
    },
    {
        "id": 3,
        "title": "comprar papel toalet",
        "status": "pendiente",
        "date_end": "16/08/24",
        "hour": "23:59",
        "place": "Supermecado",
        "assigned_to": "Leandro",
        "priority":"urgente",
        "created_by":"Atamaica",
        "created_date":"18/08/24"
    },
    {
        "id": 4,
        "title": "cita medica ata",
        "status": "listo",
        "date_end": "10/08/24",
        "hour": "08:30",
        "place": "monroe 2556",
        "assigned_to": "Atamaica",
        "priority":"urgente",
        "created_by":"Atamaica",
        "created_date":"02/08/24"
    }
]

export const getTareas = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tareas);
        }, 2500);
    });
};