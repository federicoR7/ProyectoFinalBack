
import "./Section.css";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Peluqueria from "../../assets/img/imagen-peluqueria.jpg";
import Manicuria from "../../assets/img/manicuria.jpg";
import Esculpidas from "../../assets/img/esculpidas.jpg";
import Pies from "../../assets/img/pies.jpg";
import TratamientosFaciales from "../../assets/img/tratamiento-facial.jpg"
import Depilacion from "../../assets/img/depilacion-laser.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import{faTrash} from '@fortawesome/free-solid-svg-icons'

import { useNavigate } from 'react-router-dom';

const ServicioSelector = () => {
    const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);
    //funcion para el contador de servicios
    const [count, setCount] = useState(0)

    const [activeKey, setActiveKey] = useState(null);

    const { tipo } = useParams();

    const navigate = useNavigate();


    const openServiceSection = (tipo) => {

        switch (tipo) {
            case 'peluqueria':
                setActiveKey('0');
                break;
            case 'manicuria':
                setActiveKey('1');
                break;
            case 'esculpidas':
                setActiveKey('2');
                break;
            case 'pies':
                setActiveKey('3');
                break;
            case 'tratamientosFaciales':
                setActiveKey('4');
                break;
            case 'depilacion':
                setActiveKey('5');
                break;
            default:
                setActiveKey(null);
        }


    };

    useEffect(() => {
        openServiceSection(tipo);
    }, [tipo]);



    // Carga la lista desde localstorage cuando el componente se monta
    useEffect(() => {
        const serviciosGuardados = localStorage.getItem('serviciosSeleccionados');
        if (serviciosGuardados) {
            setServiciosSeleccionados(JSON.parse(serviciosGuardados));
        }
    }, []);

    // Guardar la lista en local storage cada vez que cambie
    useEffect(() => {
        localStorage.setItem('serviciosSeleccionados', JSON.stringify(serviciosSeleccionados));
    }, [serviciosSeleccionados]);


    //función para agregar servicios 
    const agregarServicio = (servicio) => {
        setServiciosSeleccionados([...serviciosSeleccionados, servicio]);
        setCount(count + 1);
    };


    //funcion para eliminar servicios
    const eliminarServicio = (id) => {
        const serviciosActualizados = serviciosSeleccionados.filter(servicio => servicio.id !== id);
        setServiciosSeleccionados(serviciosActualizados);
        localStorage.setItem('serviciosSeleccionados', JSON.stringify(serviciosActualizados));
        setCount(serviciosActualizados.length);
    };

    //funcion por si no se selecciona nada, que salte un alert y no se pueda agendar 
    const handleAlert = () => {
        if (serviciosSeleccionados.length === 0) {
            alert('Por favor selecciona un servicio.');
            return;
        }
        navigate('/Reservas');
    };


    //bootstrap para cerrar y abrir offcanvas
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);




    const isServicioSeleccionado = (id) => {
        return serviciosSeleccionados.some(servicio => servicio.id === id);
    };







    return (

        <section className="cajaAcordeon rounded">

            <div className="subCajaAcordeon">


            <Offcanvas className="offcanvas" show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className="offcanvasTitle">ya casi estás!</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div>             
                        <h5 className="revisar">revisa tus servicios antes de agendar:</h5>
                        <ul>
                            {serviciosSeleccionados.map((servicio) => (
                                <li className="listaServicios" key={servicio.id}>
                                    {servicio.nombre}
                                    <FontAwesomeIcon icon={faTrash} className="eliminar" size="sm" onClick={() => eliminarServicio(servicio.id) + setCount(count - 1)}/>
                                </li>

                            ))}
                            <Button className="botonAgendar" variant="secondary" size="lg" onClick={handleAlert}>Agendar</Button>  


                        </ul>
                        
                    </div>
                </Offcanvas.Body>
            </Offcanvas>




            <div className="cajaTitulo">
                <h2>Nuestros servicios</h2>


                <Button variant="secondary" size="lg" onClick={handleShow}>
                    Ver servicios seleccionados <Badge bg="success">{count}</Badge>
                </Button>
            </div>



            <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)} >


                <Accordion.Item eventKey="0" className="botonAcordeon" >
                    <Accordion.Header id="peluqueria" className="botonAcordeon">Peluquería</Accordion.Header>

                    <Accordion.Body className="contenedorCartas" >
                        <Card >
                            <img src={Peluqueria} alt="" />
                            <Card.Body>
                                <Card.Title className="tituloBoton">Corte</Card.Title>
                                <Card.Text className="contenedorTarjeta">
                                    Dale estilo a tu cabello con las mejores profesionales, dejales tu pelo en sus manos y mirá la magia!
                                    <Button variant="secondary" className="agendar" disabled={isServicioSeleccionado(1)} onClick={() => setCount(count + 1) + agregarServicio({ id: 1, nombre: 'Corte' })}>+ Agregar servicio</Button>
                                </Card.Text>

                            </Card.Body>
                        </Card>
                        <Card >
                            <img src={Peluqueria} alt="" />
                            <Card.Body>
                                <Card.Title className="tituloBoton">Tintura</Card.Title>
                                <Card.Text className="contenedorTarjeta">
                                    Tinte de cabello con los mejores productos, también podes elegir diseños!
                                    <Button variant="secondary" className="agendar" disabled={isServicioSeleccionado(2)} onClick={() => setCount(count + 1) + agregarServicio({ id: 2, nombre: 'Tintura' })}>+ Agregar servicio</Button>
                                </Card.Text>

                            </Card.Body>
                        </Card>
                        <Card >
                            <img src={Peluqueria} alt="" />
                            <Card.Body>
                                <Card.Title className="tituloBoton">Alisado</Card.Title>
                                <Card.Text className="contenedorTarjeta">
                                    Deja tu cabello alisado por meses! sin planchita, como una seda!
                                    <Button variant="secondary" className="agendar" disabled={isServicioSeleccionado(3)} onClick={() => setCount(count + 1) + agregarServicio({ id: 3, nombre: 'Alisado' })}>+ Agregar servicio</Button>

                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" className="botonAcordeon">
                    <Accordion.Header id="manicuria">Manicuría</Accordion.Header>
                    <Accordion.Body className="contenedorCartas">
                        <Card >
                            <img src={Manicuria} alt="" />
                            <Card.Body>
                                <Card.Title className="tituloBoton">Manicuría Tradicional</Card.Title>
                                <Card.Text className="contenedorTarjeta">
                                    Manicuría completa con esmalte común.
                                <Button variant="secondary" className="agendar" disabled={isServicioSeleccionado(4)} onClick={() => setCount(count + 1) + agregarServicio({ id: 4, nombre: 'Manicuría tradicional' })}>+ Agregar servicio</Button>

                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card >
                            <img src={Manicuria} alt="" />
                            <Card.Body>
                                <Card.Title className="tituloBoton">Manicuría semipermanente</Card.Title>
                                <Card.Text className="contenedorTarjeta">
                                    Manicuría completa con esmalte semipermanente.
                                <Button variant="secondary" className="agendar" disabled={isServicioSeleccionado(5)} onClick={() => setCount(count + 1) + agregarServicio({ id: 5, nombre: 'Manicuría semipermanente' })}>+ Agregar servicio</Button>

                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card >
                            <img src={Manicuria} alt="" />
                            <Card.Body>
                                <Card.Title className="tituloBoton">Capping</Card.Title>
                                <Card.Text className="contenedorTarjeta">
                                    manicuría completa con una capa de gel protectora, incluye semipermanente.
                                <Button variant="secondary" className="agendar" disabled={isServicioSeleccionado(6)} onClick={() => setCount(count + 1) + agregarServicio({ id: 6, nombre: 'Capping' })}>+ Agregar servicio</Button>

                                </Card.Text>
                            </Card.Body>
                        </Card>

                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2" className="botonAcordeon">
                    <Accordion.Header id="esculpidas">Esculpidas</Accordion.Header>
                    <Accordion.Body className="contenedorCartas">
                        <Card >
                            <img src={Esculpidas} alt="" />
                            <Card.Body>
                                <Card.Title className="tituloBoton">Esculpidas en acrilico</Card.Title>
                                <Card.Text className="contenedorTarjeta">
                                    Extendemos el largo de tus uñas con acrilico, incluye semipermanente.
                                <Button variant="secondary" className="agendar" disabled={isServicioSeleccionado(7)} onClick={() => setCount(count + 1) + agregarServicio({ id: 7, nombre: 'Esculpidas en acrilico' })}>+ Agregar servicio</Button>

                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card >
                            <img src={Esculpidas} alt="" />
                            <Card.Body>
                                <Card.Title className="tituloBoton">Esculpidas en gel</Card.Title>
                                <Card.Text className="contenedorTarjeta">
                                    Extendemos el largo de tus uñas con gel, incluye semipermanente.
                                <Button variant="secondary" className="agendar" disabled={isServicioSeleccionado(8)} onClick={() => setCount(count + 1) + agregarServicio({ id: 8, nombre: 'Esculpidas en gel' })}>+ Agregar servicio</Button>

                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card >
                            <img src={Esculpidas} alt="" />
                            <Card.Body>
                                <Card.Title className="tituloBoton">Soft Gel</Card.Title>
                                <Card.Text className="contenedorTarjeta">
                                    extendemos el largo de tus uñas con tips de plastico, incluye semipermanente.
                                <Button variant="secondary" className="agendar" disabled={isServicioSeleccionado(9)} onClick={() => setCount(count + 1) + agregarServicio({ id: 9, nombre: 'Soft Gel' })}>+ Agregar servicio</Button>

                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3" className="botonAcordeon">
                    <Accordion.Header id="pies">Pies</Accordion.Header>
                    <Accordion.Body className="contenedorCartas">
                        <Card >
                            <img src={Pies} alt="" />
                            <Card.Body>
                                <Card.Title className="tituloBoton">Pedicuría</Card.Title>
                                <Card.Text className="contenedorTarjeta">
                                    Trabajo extensivo en talones y uñas encarnadas, incluye belleza de pies y esmaltado tradicional o semipermanente.
                                <Button variant="secondary" className="agendar" disabled={isServicioSeleccionado(10)} onClick={() => setCount(count + 1) + agregarServicio({ id: 10, nombre: 'Pedicuría' })}>+ Agregar servicio</Button>

                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card >
                            <img src={Pies} alt="" />
                            <Card.Body>
                                <Card.Title className="tituloBoton">Belleza de pies</Card.Title>
                                <Card.Text className="contenedorTarjeta">
                                    Embellecimiento de pies, incluye esmaltado tradicional o semipermanente.
                                <Button variant="secondary" className="agendar" disabled={isServicioSeleccionado(11)} onClick={() => setCount(count + 1) + agregarServicio({ id: 11, nombre: 'Bellesa de pies' })}>+ Agregar servicio</Button>

                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card >
                            <img src={Pies} alt="" />
                            <Card.Body>
                                <Card.Title className="tituloBoton">Corte de uñas</Card.Title>
                                <Card.Text className="contenedorTarjeta">
                                    Simple corte de uñas y limado.
                                <Button variant="secondary" className="agendar" disabled={isServicioSeleccionado(12)} onClick={() => setCount(count + 1) + agregarServicio({ id: 12, nombre: 'Corte de uñas' })}>+ Agregar servicio</Button>

                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4" className="botonAcordeon">
                    <Accordion.Header id="tratamientosFaciales">Tratamientos faciales</Accordion.Header>
                    <Accordion.Body className="contenedorCartas">
                        <Card >
                            <img src={TratamientosFaciales} alt="" />
                            <Card.Body>
                                <Card.Title className="tituloBoton">Limpieza Facial</Card.Title>
                                <Card.Text className="contenedorTarjeta">
                                    Limpieza de cutis con los mejores productos importados, mascarilla humectante de Aloe Vera.
                                <Button variant="secondary" className="agendar" disabled={isServicioSeleccionado(13)} onClick={() => setCount(count + 1) + agregarServicio({ id: 13, nombre: 'Limpieza facial' })}>+ Agregar servicio</Button>

                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card >
                            <img src={TratamientosFaciales} alt="" />
                            <Card.Body>
                                <Card.Title className="tituloBoton">Humectación</Card.Title>
                                <Card.Text className="contenedorTarjeta">
                                    Humectación de rostro y labios con los mejores productos importados.
                                <Button variant="secondary" className="agendar" disabled={isServicioSeleccionado(14)} onClick={() => setCount(count + 1) + agregarServicio({ id: 14, nombre: 'Humectación' })}>+ Agregar servicio</Button>

                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card >
                            <img src={TratamientosFaciales} alt="" />
                            <Card.Body>
                                <Card.Title className="tituloBoton">Remoción de manchas</Card.Title>
                                <Card.Text className="contenedorTarjeta">
                                Remoción de manchas de la piel con láser de última tecnología, indoloro.
                                <Button variant="secondary" className="agendar" disabled={isServicioSeleccionado(15)} onClick={() => setCount(count + 1) + agregarServicio({ id: 15, nombre: 'Remoción de manchas' })}>+ Agregar servicio</Button>

                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5" className="botonAcordeon">
                    <Accordion.Header id="depilacion">Depilación</Accordion.Header>
                    <Accordion.Body className="contenedorCartas">
                        <Card >
                            <img src={Depilacion} alt="" />
                            <Card.Body>
                                <Card.Title className="tituloBoton">Perfilado</Card.Title>
                                <Card.Text className="contenedorTarjeta">
                                    Perfilado de cejas con pinza.
                                <Button variant="secondary" className="agendar" disabled={isServicioSeleccionado(16)} onClick={() => setCount(count + 1) + agregarServicio({ id: 16, nombre: 'Perfilado' })}>+ Agregar servicio</Button>

                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card >
                            <img src={Depilacion} alt="" />
                            <Card.Body>
                                <Card.Title className="tituloBoton">Depilación con cera</Card.Title>
                                <Card.Text className="contenedorTarjeta">
                                    Depilación con cera caliente de alta calidad, no quema.
                                <Button variant="secondary" className="agendar" disabled={isServicioSeleccionado(17)} onClick={() => setCount(count + 1) + agregarServicio({ id: 17, nombre: 'Depilación con cera' })}>+ Agregar servicio</Button>

                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card >
                            <img src={Depilacion} alt="" />
                            <Card.Body>
                                <Card.Title className="tituloBoton">Depilación definitiva</Card.Title>
                                <Card.Text className="contenedorTarjeta">
                                    Depilación con láser de última tecnología con cabezal frío, no duele ni quema.
                                <Button variant="secondary" className="agendar" disabled={isServicioSeleccionado(18)} onClick={() => setCount(count + 1) + agregarServicio({ id: 18, nombre: 'Depilación definitiva' })}>+ Agregar servicio</Button>

                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            </div>
        </section>


    );
}

export default ServicioSelector;