import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';


const EditarTurno = () => {
    const { id } = useParams(); // ID del turno de la URL
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        servicio: [],
        dia: "",
        horario: "",
    });
    const [horarioSeleccionado, setHorarioSeleccionado] = useState("Elegir un horario");

    useEffect(() => {
        const fetchTurno = async () => {
            try {
                const response = await axios.get(`https://proyectofinalback-q34r.onrender.com/api/turnos/${id}`);
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

    // Manejar la selección del horario
    const handleSelectHorario = (horario) => {
        setFormData({ ...formData, horario });
        setHorarioSeleccionado(horario);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://proyectofinalback-q34r.onrender.com/api/turnos/${id}`, formData);
            console.log("Turno actualizado:", formData);
            navigate("/ListaTurnos"); 
        } catch (error) {
            console.error("Error al actualizar el turno:", error);
        }
    };

    const handleOnClick = () => {
        navigate('/ListaTurnos'); 
    };
  

    return (
        <section className="editar-turno">
            <h2 className='display-4 mb-4'>Editar Turno</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label className='display-6 fs-2'>Servicios reservados:</Form.Label>
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

                <Form.Group className='mb-3'>
                    <Form.Label>Día:</Form.Label>
                    <Form.Control
                        type="date"
                        name="dia"
                        value={formData.dia}
                        onChange={handleChange}
                        required
                        size='lg'
                        className='dia'        
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Horario:</Form.Label>
                    <Dropdown onSelect={handleSelectHorario}>
                        <Dropdown.Toggle variant="secondary" className='mb-5' size='lg' id="dropdown-basic">
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
                <Button type="submit" size='lg' variant="success">
                    Guardar Cambios
                </Button>
                <Button variant="secondary" size='lg' onClick={handleOnClick}  className="ms-2">
                    Cancelar
                </Button>
            </Form>
        </section>
    );
};

export default EditarTurno;



