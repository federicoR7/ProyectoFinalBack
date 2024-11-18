import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown';
import Alert from 'react-bootstrap/Alert';





const EditarTurno = () => {
    const { id } = useParams(); // Obtén el ID del turno de la URL
    const navigate = useNavigate(); // Para redirigir después de guardar cambios
    const [formData, setFormData] = useState({
        servicio: [],
        dia: "",
        horario: "",
    });
    const [horarioSeleccionado, setHorarioSeleccionado] = useState("Elegir un horario");

    // Carga los datos del turno desde el backend
    useEffect(() => {
        const fetchTurno = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/turnos/${id}`);
                setFormData({
                    servicio: response.data.servicio || [],
                    dia: response.data.dia || "",
                    horario: response.data.horario || "",
                });
                setHorarioSeleccionado(response.data.horario || "Elegir un horario");
            } catch (error) {
                console.error("Error al cargar el turno:", error);
            }
        };

        fetchTurno();
    }, [id]);

    // Maneja el cambio de valores en los inputs
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Maneja la selección del horario
    const handleSelectHorario = (horario) => {
        setFormData({ ...formData, horario });
        setHorarioSeleccionado(horario);
    };

    // Maneja el envío del formulario para guardar cambios
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/turnos/${id}`, formData);
            console.log("Turno actualizado:", formData);
            navigate("/turnos"); // Redirige a la lista de turnos
        } catch (error) {
            console.error("Error al actualizar el turno:", error);
        }
    };

    return (
        <section className="editar-turno">
            <h2>Editar Turno</h2>
            <Form onSubmit={handleSubmit}>
                {/* Mostrar los servicios seleccionados */}
                <Form.Group>
                    <Form.Label>Servicios Seleccionados:</Form.Label>
                    <ul>
                        {formData.servicio.length === 0 ? (
                            <li>No hay servicios seleccionados</li>
                        ) : (
                            formData.servicio.map((servicio, index) => (
                                <li key={index}>{servicio}</li>
                            ))
                        )}
                    </ul>
                </Form.Group>

                {/* Campo para modificar el día */}
                <Form.Group>
                    <Form.Label>Día:</Form.Label>
                    <Form.Control
                        type="date"
                        name="dia"
                        value={formData.dia}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* Dropdown para modificar el horario */}
                <Form.Group>
                    <Form.Label>Horario:</Form.Label>
                    <Dropdown onSelect={handleSelectHorario}>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            {horarioSeleccionado}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {["9:30hs", "10:30hs", "12hs", "14hs", "14:30hs", "15:30hs", "16:30hs", "18hs", "18:30hs"].map((hora) => (
                                <Dropdown.Item key={hora} eventKey={hora}>
                                    {hora}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>

                {/* Botones */}
                <Button type="submit" variant="primary">
                    Guardar Cambios
                </Button>
                <Button variant="secondary" onClick={() => navigate("/turnos")} className="ms-2">
                    Cancelar
                </Button>
            </Form>
        </section>
    );
};

export default EditarTurno;



// const EditarTurno = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();


//     const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);
//     const [horarioSeleccionado, setHorarioSeleccionado] = useState('Elegir un horario');
//     const [validated, setValidated] = useState(false);
//     const [mensaje, setMensaje] = useState('');
//     const [reservaHecha, setReservaHecha] = useState(false); // Estado para manejar si la reserva fue realizada
//     const [horarioInvalido, setHorarioInvalido] = useState(false); // Estado de validación del horario

//     const [formData, setFormData] = useState({
//         servicio: '',
//         dia: '',
//         horario: '',

//     });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchTurno = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/turnos/${id}`);
//                 setFormData(response.data);
//                 setLoading(false);
//             } catch (err) {
//                 setError('Error al cargar los datos del turno');
//                 setLoading(false);
//             }
//         };

//         fetchTurno();
//     }, [id]);

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Validación simple (puedes agregar más lógica según tu caso)
//         const validated = formData.servicio && formData.dia && formData.horario;

//         if (!validated) {
//             alert('Por favor, completa todos los campos');
//             return;
//         }

//         try {
//             await axios.put(`http://localhost:5000/api/turnos/${id}`, formData);
//             navigate('/turnos'); // Redirigir después de guardar
//         } catch (err) {
//             console.error('Error al actualizar el turno:', err);
//         }
//     };

//     if (loading) return <p>Cargando...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//         <section className='formulario'>


//         <Form onSubmit={handleSubmit} className='form' noValidate validated={validated}>
//           <h3 className='tituloFormulario'>Estas a un paso de reservar con nosotros!</h3>
  
//           <Row className="mb-3 lineaDatos1">
//             <div className='cajaInputs'>
  
//             </div>
//             <Row className="mb-3 cajaHorarios">
  
//               <Form.Group as={Col} md="3" controlId="fomrDia" className='calendario'>
//                 <Form.Label>Día</Form.Label>
//                 <Form.Control
//                   required
//                   type="date"
//                   size='lg'
//                   value={formData.dia}
//                   name="dia"
//                   className='dia'
//                   onChange={handleInputChange}
//                   id="dia"
//                 />
//               </Form.Group>
  
//               <Form.Group as={Col} md="3" controlId="formHorario" className='calendario'>
//                 <Form.Label>Horario</Form.Label>
//                 <Dropdown onSelect={handleSelect} id="horario">
//                   <Dropdown.Toggle variant={horarioInvalido ? 'danger' : 'secondary'} id="dropdown-basic" size='lg'>
//                     {horarioSeleccionado}
//                   </Dropdown.Toggle>
//                   <Dropdown.Menu>
//                     {["9:30hs", "10:30hs", "12hs", "14hs", "14:30hs", "15:30hs", "16:30hs", "18hs", "18:30hs"].map((hora) => (
//                       <Dropdown.Item key={hora} eventKey={hora}>{hora}</Dropdown.Item>
//                     ))}
//                   </Dropdown.Menu>
//                 </Dropdown>
  
//               </Form.Group>
//             </Row>
  
//           </Row>
  
  
  
  
  
//           <Form.Group as={Col} md="6" controlId="formServicios" className='cajaInferior'
  
//           >
//             <div className='subCajaInferior'>
//               <Form.Label>Servicios seleccionados:</Form.Label>
//               <ul>
//                 {serviciosSeleccionados.length === 0 ? (
//                   <li>No hay servicios seleccionados</li>
//                 ) : (
//                   serviciosSeleccionados.map((servicio) => (
//                     <li key={servicio.id}>{servicio.nombre}</li>
  
//                   ))
//                 )}
//               </ul>
//             </div>
  
//           </Form.Group>
//           <div className='cajaBotonAgendar'>
//             {/* {<Button variant="secondary" size="lg" type="submit">Reservar!</Button>} */}
//             {!reservaHecha ? (
//               <Button className='botonAgendar' variant="secondary" size="lg" type="submit" disabled={reservaHecha}>
//                 Reservar!
//               </Button>
//             ) : (
//               <Button className='botonAgendar' variant="secondary" size="lg" onClick={handleVolverInicio}>
//                 Volver al Inicio
//               </Button>
//             )}
//           </div>
  
//           {mensaje && (
//             <Alert variant="success" className="mt-4">
//               {mensaje}
//             </Alert>
//           )}
//         </Form>
  
//       </section>
//     );
// };

// export default EditarTurno;

// const EditarTurno = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [turno, setTurno] = useState(null);

//   useEffect(() => {
//     const fetchTurno = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/turnos/${id}`);

//         setTurno(response.data);
//       } catch (error) {
//         console.error('Error al cargar el turno:', error);
//       }
//     };

//     fetchTurno();
//   }, [id]);

//   const handleSubmit = async (nuevoTurno) => {
//     try {
//       await axios.put(`http://localhost:5000/api/turnos/${id}`, nuevoTurno);
//       navigate('/turnos');
//     } catch (error) {
//       console.error('Error al actualizar el turno:', error);
//     }
//   };

//   if (!turno) return <p>Cargando...</p>;

//   return (
//     <FormularioServicios
//       initialData={turno}
//       onSubmit={handleSubmit}
//       botonTexto="Guardar Cambios"
//     />
//   );
// };

// export default EditarTurno;