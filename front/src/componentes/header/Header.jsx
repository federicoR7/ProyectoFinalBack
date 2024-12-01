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
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const Navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();
  const { seleccionarServicio } = useServicio();
  // Recupera el username desde localStorage
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    logout();
    alert('Sesión cerrada');
  };

  const handleLogin = () => {
    Navigate('/login');
  };


  return (
    <Navbar expand="md" className="navbar">
      <Container fluid>
        <Navbar.Brand ><Link to="/"><img src={Logo} alt="" /></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className='cajaHeader'>

          <Nav
            className="my-2 my-lg-0 caja-header-izq"
            style={{ maxHeight: '200px' }}
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
            <Nav.Link><Link to="/Nosotros" className='nosotros ms-3'> Nosotros</Link></Nav.Link>
            <Nav.Link ><Link to="/Contacto" className='nosotros ms-3'> Contacto</Link> </Nav.Link>




          </Nav>

          <Nav
            className="my-2 my-lg-0 caja-header-izq"
            style={{ maxHeight: '200px' }}
            navbarScroll>

            <Nav.Link className='opciones' ><Link to="/ListaTurnos" className='nosotros'> Mis Turnos </Link> </Nav.Link>
            <Nav.Link className='opciones' ><Link to="/Register" className='nosotros me-5'>Registrarse </Link> </Nav.Link>
            {/* Botón dinámico de inicio/cierre de sesión */}
            {isAuthenticated ? (
              <Button variant="secondary" className='me-5 btn-lg' onClick={handleLogout}>Cerrar Sesión</Button>
            ) : (
              <Button variant="secondary" className='me-5 btn-lg' onClick={handleLogin}>Iniciar Sesión</Button>
            )}
            {/* Mostrar nombre de usuario si está autenticado */}
            {isAuthenticated && (
              <p className="username-display me-5">
                Bienvenido, <strong>{username}</strong>
              </p>
            )}

          </Nav>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default Header;
