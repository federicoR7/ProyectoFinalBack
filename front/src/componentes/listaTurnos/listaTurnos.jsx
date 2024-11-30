import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListaTurnos = () => {
  const [turnos, setTurnos] = useState([]);
 

  useEffect(() => {
    const fetchTurnos = async () => {
      try {

        const username = localStorage.getItem('username'); // Obtener el username del usuario logueado
        console.log('Username obtenido:', username);

        const response = await axios.get(`https://proyectofinalback-q34r.onrender.com/api/turnos?username=${username}`);  

        setTurnos(response.data);
      } catch (error) {
        console.error('Error al obtener los turnos:', error);
      }
    };

    fetchTurnos();
  }, []);

  return (
 <div className='cajaTurnosAgendados'>
    <h1 className='display-4 m-3'>Turnos agendados</h1>
    {turnos.length === 0 ? (
      <p className='display-6 fs-3 m-2'>No hay turnos registrados.</p>
    ) : (
      <ul className='display-6 fs-3 m-2'>
        {turnos.map((turno) => (
          <li key={turno._id}>
            {turno.servicio} <br /> {turno.dia} <br /> {turno.horario}
            {' - '}
            <Link to={`/DetalleTurno/${turno._id}`}>Ver Detalle</Link>
          </li>
        ))}
      </ul>
    )}


  </div> 
  
  );
};

export default ListaTurnos;



