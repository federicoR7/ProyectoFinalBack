import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./Header.css"
import Logo from '../../assets/img/logoVN.jpg'
import { Link } from 'react-router-dom';
import { useServicio } from '../../contexto/ServicioContext';  
import { useAuth } from "../api/AuthContext";





const Header=() =>{

  const { logout, isAuthenticated } = useAuth(); 
  const { seleccionarServicio } = useServicio();

    // Recupera el username desde localStorage
    const username = localStorage.getItem('username');
  

  const handleLogout = () => {
    logout(); 
    alert('Sesión cerrada'); 
  };



  return (
    <Navbar expand="lg" className="navbar">
      <Container fluid>
        <Navbar.Brand ><Link to="/"><img src={Logo} alt="" /></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">

          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll>
                
            <NavDropdown title="Servicios" id="navbarScrollingDropdown">
              <div className='cajaSubMenu'>
                <NavDropdown.Item as={Link} to="/servicio/peluqueria" onClick={() => seleccionarServicio('peluqueria')}>Peluquería</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/servicio/manicuria" onClick={() => seleccionarServicio('manicuria')}>Manicuría</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/servicio/esculpidas" onClick={() => seleccionarServicio('esculpidas')}>Esculpidas</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/servicio/pies" onClick={() => seleccionarServicio('pies')}>Pies</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/servicio/TratamientosFaciales" onClick={() => seleccionarServicio('tratamientosFaciales')}>Tratamientos Faciales</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/servicio/depilacion" onClick={() => seleccionarServicio('depilacion')}>Depilación</NavDropdown.Item>
              </div>
            </NavDropdown>
            

            <Nav.Link className='opciones'><Link to="/Nosotros" className='nosotros'> Nosotros</Link></Nav.Link>
            <Nav.Link className='opciones' ><Link to="/Contacto" className='nosotros'> Contacto</Link> </Nav.Link>
            <Nav.Link className='opciones' ><Link to="/ListaTurnos" className='nosotros'> Mis Turnos</Link> </Nav.Link>
            <Nav.Link className='opciones' ><Link to="/Register" className='nosotros'>Registrarse</Link> </Nav.Link>

 
            {/* Botón dinámico de inicio/cierre de sesión */}
            {isAuthenticated ? (
              <Button variant="secondary" onClick={handleLogout}>Cerrar Sesión</Button>
            ) : (
              <Nav.Link><Link to="/Login">Iniciar Sesión</Link></Nav.Link>
            )}



            {/* Mostrar nombre de usuario si está autenticado */}
            {isAuthenticated && (
              <Nav.Link className="username-display">
                Bienvenido, <strong>{username}</strong>
              </Nav.Link>
            )}
          </Nav>


        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  );
}

export default Header;
