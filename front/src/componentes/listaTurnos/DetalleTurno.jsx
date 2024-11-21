import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './listaTurnos.css';
import { Modal, Button } from 'react-bootstrap'; 


const DetalleTurno = () => {
  const { id } = useParams();
  const [turno, setTurno] = useState(null);

  const [showModal, setShowModal] = useState(false);

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
        navigate('/ListaTurnos');
      } else {
        console.error('Error al eliminar el turno');
      }
    } catch (error) {
      console.error('Error al eliminar el turno:', error);
    }
  };

  const handleModalClose = () => setShowModal(false);
  const handleModalOpen = () => setShowModal(true);

  if (!turno) return <p>Cargando...</p>;

  return (
    // <div className="detalle-turno">
    //   <h2>{turno.servicio}</h2>
    //   <p>Día: {turno.dia}</p>
    //   <p>Horario: {turno.horario}</p>

    //   <div className="acciones">
    //     <Link to={`/EditarTurno/${turno._id}`} className="editar">Editar</Link>
    //     <button onClick={handleDelete} className="eliminar">Eliminar</button>
    //   </div>
    // </div>
    <div className="detalle-turno">
      <h2>{turno.servicio}</h2>
      <p>Día: {turno.dia}</p>
      <p>Horario: {turno.horario}</p>

      <div className="acciones">
        <Link to={`/EditarTurno/${turno._id}`} className="editar">Editar</Link>
        <button onClick={handleModalOpen} className="eliminar">Eliminar</button>
      </div>

      {/* Modal de confirmación */}
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar esta reserva? Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => { handleDelete(); handleModalClose(); }}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DetalleTurno;