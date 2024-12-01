import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const ListaTurnos = () => {
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const username = localStorage.getItem('username');
        console.log('Username obtenido:', username);

        const response = await axios.get(`https://proyectofinalback-q34r.onrender.com/api/turnos?username=${username}`);
        console.log(response.data);  // Verifica la estructura de los turnos 

        setTurnos(response.data);
      } catch (error) {
        console.error('Error al obtener los turnos:', error);
      }
    };

    fetchTurnos();
  }, []);

  return (
    <div className='cajaTurnosAgendados'>
      <h1 className='display-4 m-3'>Mi historial de turnos</h1>
      {turnos.length === 0 ? (
        <p className='display-6 fs-3 m-2'>No hay turnos registrados.</p>
      ) : (
        <ul className='display-6 fs-3 p-0 m-3 cajaServicios'>
          {turnos.map((turno) => (
            <li className='cajasTurnosAgendados mb-2' key={turno._id}>
              <div>

                <div className='cajaFechaHorario ms-3 mt-3'>
                  <p>{turno.dia}</p>
                  <p>{turno.horario}</p>
                </div>

                <div className='cajaServicios ms-3 mb-3'>
                  <h4>Servicios:</h4>
                  <ul>
                    {Array.isArray(turno.servicio) ? (
                      turno.servicio.map((servicio, index) => (
                        <li key={index}>{servicio}</li>
                      ))
                    ) : (
                      <li >{turno.servicio}</li>
                    )}
                  </ul>
                </div>
              </div>

              <Link className='verDetalle display-6 fs-2' to={`/DetalleTurno/${turno._id}`}>Ver Detalle</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaTurnos;




