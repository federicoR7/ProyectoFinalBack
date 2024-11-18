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

        // const response = await axios.get('http://localhost:5000/api/turnos');
        const response = await axios.get(`http://localhost:5000/api/turnos?username=${username}`);  

        setTurnos(response.data);
      } catch (error) {
        console.error('Error al obtener los turnos:', error);
      }
    };

    fetchTurnos();
  }, []);

  return (
<div>
    <h1>Lista de Turnos</h1>
    {turnos.length === 0 ? (
      <p>No hay turnos registrados.</p>
    ) : (
      <ul>
        {turnos.map((turno) => (
          <li key={turno._id}>
            {turno.servicio} - {turno.dia} - {turno.horario}
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