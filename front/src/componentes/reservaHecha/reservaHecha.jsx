

import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const ReservaHecha = () => {
  const location = useLocation(); 
  const navigate = useNavigate(); 

  const { servicio, dia, horario } = location.state || {}; 

  return (
    <section className="graciasReserva">
      <h3>¡Gracias por agendar con nosotros!</h3>
      <p>En breve te llegará un correo de confirmación.</p>

      <h4>Detalles de tu reserva:</h4>
      <ul>
        <li><strong>Servicio:</strong> {servicio}</li>
        <li><strong>Día:</strong> {dia}</li>
        <li><strong>Horario:</strong> {horario}</li>
      </ul>

      <Button onClick={() => navigate('/')} variant="primary">Volver al Inicio</Button>
    </section>
  );
};

export default ReservaHecha;
