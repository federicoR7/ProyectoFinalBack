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
        const response = await fetch(`https://proyectofinalback-q34r.onrender.com/api/turnos/${id}`);
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
      const response = await fetch(`https://proyectofinalback-q34r.onrender.com/api/turnos/${id}`, {
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

  const handleOnClick = () => {
    navigate(`/EditarTurno/${turno._id}`);
  };

  if (!turno) return <p>Cargando...</p>;

  return (

    <div className="detalle-turno p-5">
      <h3 className='mb-4 display-4'>Detalle del turno</h3>
      <ul>
                  {Array.isArray(turno.servicio) ? (
                    turno.servicio.map((servicio, index) => (
                      <li key={index}>{servicio}</li>
                    ))
                  ) : (
                    <li >{turno.servicio}</li>
                  )}
                </ul>
      <p>Día: {turno.dia}</p>
      <p>Horario: {turno.horario}</p>

      <div className="acciones">
        <Button onClick={handleOnClick}  variant="secondary " className="editar fs-4">Editar</Button>
        <Button onClick={handleModalOpen}  variant="danger" className="fs-4 ms-2">Eliminar</Button>
      </div>

      {/* confirmación */}
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className='fs-3'>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body className='fs-3'>
          ¿Estás seguro de que deseas eliminar esta reserva? Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size='lg' onClick={handleModalClose}>
            Cancelar
          </Button>
          <Button variant="danger" size='lg' onClick={() => { handleDelete(); handleModalClose(); }}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DetalleTurno;