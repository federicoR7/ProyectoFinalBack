import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './listaTurnos.css';

const DetalleTurno = () => {
  const { id } = useParams();
  const [turno, setTurno] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTurno = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/turnos/${id}`);
        const data = await response.json();
        setTurno(data);
      } catch (error) {
        console.error('Error al obtener el turno:', error);
      }
    };

    fetchTurno();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/turnos/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        navigate('/turnos');
      } else {
        console.error('Error al eliminar el turno');
      }
    } catch (error) {
      console.error('Error al eliminar el turno:', error);
    }
  };

  if (!turno) return <p>Cargando...</p>;

  return (
    <div className="detalle-turno">
      <h2>{turno.servicio}</h2>
      <p>Día: {turno.dia}</p>
      <p>Horario: {turno.horario}</p>

      <div className="acciones">
        <Link to={`/EditarTurno/${turno._id}`} className="editar">Editar</Link>
        <button onClick={handleDelete} className="eliminar">Eliminar</button>
      </div>
    </div>
  );
};

export default DetalleTurno;