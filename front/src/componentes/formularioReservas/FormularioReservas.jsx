import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import Row from 'react-bootstrap/Row';
import "./FormularioReservas.css";
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom'; 

const FormularioServicios = () => {
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState('Elegir un horario');
  const [validated, setValidated] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [reservaHecha, setReservaHecha] = useState(false); // Estado para manejar si la reserva fue realizada
  const navigate = useNavigate(); // Hook para redirigir a otra página
  const [horarioInvalido, setHorarioInvalido] = useState(false); // Estado de validación del horario

  const [formData, setFormData] = useState({
    servicio: [],
    dia: '',
    horario: '',


  });

  useEffect(() => {

    const serviciosGuardados = localStorage.getItem('serviciosSeleccionados');
    if (serviciosGuardados) {
      try {
        const servicios = JSON.parse(serviciosGuardados);
        if (Array.isArray(servicios) && servicios.length > 0) {
          setServiciosSeleccionados(servicios);
          setFormData((prevFormData) => ({
            ...prevFormData,
            servicio: servicios.map(servicio => servicio.nombre),
          }));
        }
      } catch (error) {
        console.error('Error al parsear servicios desde localStorage:', error);
      }
    }
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
  


    const form = event.currentTarget;

    if (serviciosSeleccionados.length === 0) {
      setMensaje('Debes seleccionar al menos un servicio');
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      servicio: serviciosSeleccionados.map((servicio) => servicio.nombre),
    }));

    if (form.checkValidity() === false || horarioInvalido) {
      event.stopPropagation();
    } else {
      try {
        const nombreUsuario = localStorage.getItem('username'); 
        console.log('Nombre de usuario:', nombreUsuario);

        const nuevoTurno = {
          servicio: serviciosSeleccionados.map((servicio) => servicio.nombre),
          dia: formData.dia,
          horario: horarioSeleccionado,
          username: nombreUsuario,
        };

        await axios.post('https://proyectofinalback-cvd9.onrender.com/api/turnos', nuevoTurno);
       
        setReservaHecha(true);
        console.log('Formulario enviado:', nuevoTurno);
         navigate('/ReservaHecha', { state: nuevoTurno });
         
      } catch (error) {
        console.error('Error al agendar el turno:', error);
      }
    }
    

    setValidated(true);

    if (horarioSeleccionado === 'Elegir un horario') {
      setHorarioInvalido(true);
    } else {
      setHorarioInvalido(false);
    }
  };


  const handleSelect = (eventKey) => {
    setHorarioSeleccionado(eventKey);
    setFormData({ ...formData, horario: eventKey });
    setHorarioInvalido(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      servicio: serviciosSeleccionados.map((servicio) => servicio.nombre),
    }));
  }, [serviciosSeleccionados]);


  // servicios seleccionados se guardan en formData
  useEffect(() => {
    setFormData({ ...formData, servicios: serviciosSeleccionados });
  }, [serviciosSeleccionados]);


  return (
    <section className='formulario'>


      <Form onSubmit={handleSubmit} className='form w-50' noValidate validated={validated}>
        <p className="display-6 fs-4 mb-3 ms-3 me-3 mt-3 tituloFormulario">estás a un paso de agendar con nosotros!</p>

        
          <Row className="mb-3 cajaHorarios">

            <Form.Group as={Col} md="3" controlId="formDia" className='calendario'>
              <Form.Label>Día</Form.Label>
              <Form.Control
                required
                type="date"
                size='lg'
                value={formData.dia}
                name="dia"
                className='dia'
                onChange={handleInputChange}
                id="dia"
              />
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="formHorario" className='calendario mt-3'>
              <Form.Label>Horario</Form.Label>
              <Dropdown onSelect={handleSelect} id="horario">
                <Dropdown.Toggle variant={horarioInvalido ? 'danger' : 'secondary'} id="dropdown-basic" size='lg'>
                  {horarioSeleccionado}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {["9:30hs", "10:30hs", "12hs", "14hs", "14:30hs", "15:30hs", "16:30hs", "18hs", "18:30hs"].map((hora) => (
                    <Dropdown.Item key={hora} eventKey={hora}>{hora}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>

            </Form.Group>
          </Row>

      

        <Form.Group as={Col} md="6" controlId="formServicios" className='cajaInferior display-6'>
        
            <Form.Label className='fs-3'>Servicios seleccionados:</Form.Label>
            <ul>
              {serviciosSeleccionados.length === 0 ? (
                <li className='fs-3'>No hay servicios seleccionados</li>
              ) : (
                serviciosSeleccionados.map((servicio) => (
                  <li className='fs-3' key={servicio.id}>{servicio.nombre}</li>

                ))
              )}
            </ul>
         

        </Form.Group>
        <div className='cajaBotonAgendar'>

            <Button className='botonAgendar mb-5' variant="secondary" size="lg" type="submit" disabled={reservaHecha}>
              Reservar!
            </Button>

        </div>

         {mensaje && (
          <Alert variant="success" className="mt-4">
            {mensaje}
          </Alert>
        )}
      </Form>

    </section>
  );
};

export default FormularioServicios;












