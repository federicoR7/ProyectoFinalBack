import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./Header.css"
import Logo from '../../assets/img/logoVN.jpg'
import { Link } from 'react-router-dom';
import { useServicio } from '../../contexto/ServicioContext';  





const Header=() =>{



  const { seleccionarServicio } = useServicio()

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
          </Nav>


        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
