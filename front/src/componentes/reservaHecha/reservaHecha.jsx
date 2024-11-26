import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './reservaHecha.css'

const ReservaHecha = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { servicio, dia, horario } = location.state || {};

  return (
    <section className="graciasReserva">
      <div className='cajaTituloGracias'>
        <h4 className='m-3 fs-2'>¡Gracias por agendar con nosotros!</h4>
        <p className='display-6 fs-3'>En breve te llegará un correo de confirmación.</p>
      </div>

      <div>
      <h4 className='display-6 fs-3'>Detalles de tu reserva:</h4>
      <ul className='display-6 fs-3'>
        <li>Servicio: {servicio}</li>
        <li>Día: {dia}</li>
        <li>Horario: {horario}</li>
      </ul>
      </div>

      <div className='botonVolverGracias'>
      <Button onClick={() => navigate('/')} variant="secondary fs-4">Volver al Inicio</Button>
      </div>
    </section>
  );
};

export default ReservaHecha;
