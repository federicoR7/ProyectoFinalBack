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
            navigate("/ListaTurnos"); // Redirige a la lista de turnos
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



