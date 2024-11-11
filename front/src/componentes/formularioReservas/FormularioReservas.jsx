import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import "./FormularioReservas.css";
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom'; // Para redirigir al inicio

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
  


  //  const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   const form = event.currentTarget;
  //   // Verificar que haya servicios seleccionados antes de enviar el formulario

  //     if (serviciosSeleccionados.length === 0) {
  //       setMensaje('Debes seleccionar al menos un servicio');
  //       return;
  //     } else {
  //       setFormData((prevFormData) => ({
  //         ...prevFormData,
  //         servicio: serviciosSeleccionados.map((servicio) => servicio.nombre),
  //       }));
  //     }
      

  //   if (form.checkValidity() === false || horarioInvalido) {
  //     event.stopPropagation();
  //   } else {
  //     try {
  //       const nuevoTurno = {
  //         servicio: serviciosSeleccionados.map((servicio) => servicio.nombre), // Confirmar servicios
  //         dia: formData.dia,
  //         horario: formData.horario,
  //       };
  //       await axios.post('http://localhost:5000/api/turnos', nuevoTurno);
  //       setMensaje('El turno se agendó correctamente. Gracias por confiar en nosotros!');
  //       setReservaHecha(true); // Cambia el estado para deshabilitar el botón y mostrar el de volver
  //       console.log('Formulario enviado:', formData);
  //       navigate('/turnos');
  //     } catch (error) {
  //       console.error('Error al agendar el turno:', error);
  //     }

  //   }

  //   setValidated(true);

  //   if (horarioSeleccionado === 'Elegir un horario') {
  //     setHorarioInvalido(true); // Marca el horario como inválido si no se selecciono
  //   } else {
  //     setHorarioInvalido(false); // Marca el horario como válido si se selecciono
  //   }
  // };

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
  
    // Asegurar que se convierta `horario` si es necesario
    const horarioNumerico = parseInt(horarioSeleccionado.replace(/\D/g, ''));
  
    if (form.checkValidity() === false || horarioInvalido) {
      event.stopPropagation();
    } else {
      try {
        const nuevoTurno = {
          servicio: serviciosSeleccionados.map((servicio) => servicio.nombre),
          dia: formData.dia,
          horario: horarioNumerico,
        };
  
        await axios.post('http://localhost:5000/api/turnos', nuevoTurno);
        setMensaje('El turno se agendó correctamente. Gracias por confiar en nosotros!');
        setReservaHecha(true);
        console.log('Formulario enviado:', nuevoTurno);
        navigate('/turnos');
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
  



  // // Asegúrate de que los servicios seleccionados se guarden en formData
   useEffect(() => {
     setFormData({ ...formData, servicios: serviciosSeleccionados });
   }, [serviciosSeleccionados]);

  const handleVolverInicio = () => {
    navigate('/'); // Redirige al inicio
  };



  return (
    <section className='formulario'>


      <Form onSubmit={handleSubmit} className='form' noValidate validated={validated}>
        <h3 className='tituloFormulario'>Estas a un paso de reservar con nosotros!</h3>

        <Row className="mb-3 lineaDatos1">
          <div className='cajaInputs'>
            {/* <Form.Group as={Col}  controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Ingrese su nombre"
                size='lg'
                value={formData.nombre}
                onChange={(e) => setNombre(e.target.value)}
                name="nombre"
                id="nombre"
              />
              <Form.Control.Feedback>¡Se ve bien!</Form.Control.Feedback>
            </Form.Group> 
            <Form.Group as={Col}  controlId="formApellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Ingrese su apellido"
                size='lg'
                value={formData.apellido}
                onChange={(e) => setApellido(e.target.value)}
                name="apellido"
                id="apellido"
              />
              <Form.Control.Feedback>¡Se ve bien!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}  controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                required
                type="email"
                placeholder="Ingrese su email"
                size='lg'
                value={formData.email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                id="email"
                />
                <Form.Control.Feedback>¡Se ve bien!</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>*/}
          </div>
          <Row className="mb-3 cajaHorarios">

            <Form.Group as={Col} md="3" controlId="fomrDia" className='calendario'>
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

            <Form.Group as={Col} md="3" controlId="formHorario" className='calendario'>
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

        </Row>





        <Form.Group as={Col} md="6" controlId="formServicios" className='cajaInferior'

        >
          <div className='subCajaInferior'>
            <Form.Label>Servicios seleccionados:</Form.Label>
            <ul>
              {serviciosSeleccionados.length === 0 ? (
                <li>No hay servicios seleccionados</li>
              ) : (
                serviciosSeleccionados.map((servicio) => (
                  <li key={servicio.id}>{servicio.nombre}</li>

                ))
              )}
            </ul>
          </div>

        </Form.Group>
        <div className='cajaBotonAgendar'>
          {/* {<Button variant="secondary" size="lg" type="submit">Reservar!</Button>} */}
          {!reservaHecha ? (
            <Button className='botonAgendar' variant="secondary" size="lg" type="submit" disabled={reservaHecha}>
              Reservar!
            </Button>
          ) : (
            <Button className='botonAgendar' variant="secondary" size="lg" onClick={handleVolverInicio}>
              Volver al Inicio
            </Button>
          )}
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









