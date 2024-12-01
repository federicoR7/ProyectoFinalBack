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
        <h4 className=' display-4 m-3 fs-1'><strong>¡Gracias por agendar con nosotros!</strong></h4>
        <p className='display-6 fs-3'>En breve te llegará un correo de confirmación.</p>
      </div>

      <div className='ms-2'>
        <h4 className='display-6 fs-1'>Detalles de tu reserva:</h4>
        <ul className='display-6 fs-2'>
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
