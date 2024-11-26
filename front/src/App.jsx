import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './componentes/header/Header';
import Footer from './componentes/footer/Footer';
import GoogleMaps from './componentes/googleMaps/GoogleMaps';
import Horarios from './componentes/horarios/Horarios';
import Carrousel from './componentes/carrousel/Carrousel';
import FormularioServicios from './componentes/formularioReservas/FormularioReservas';
import Nosotros from './componentes/nosotros/Nosotros';
import Contacto from './componentes/contacto/Contacto';
import ServicioSelector from './componentes/section/Section';
import ListaTurnos from './componentes/listaTurnos/listaTurnos';
import Register from './componentes/api/Register';
import Login from './componentes/api/Login';
import { AuthProvider } from './componentes/api/AuthContext';
import ProtectedRoute from './componentes/api/ProtectedRoute';
import DetalleTurno from './componentes/listaTurnos/DetalleTurno';
import EditarTurno from './componentes/listaTurnos/editarTurno';
import ReservaHecha from './componentes/reservaHecha/reservaHecha';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';





function App() {


    // Hook para limpiar sessionStorage
    useEffect(() => {
      sessionStorage.removeItem('username'); // Limpia cualquier usuario guardado al iniciar
      console.log("Session storage cleaned"); // Verifica que se ejecuta
    }, []); // Solo se ejecuta una vez, al montar el componente


  return (
    <AuthProvider>
      <Router>
        <section className='body'>
          <Header />
          <Carrousel />
          <main className='main'  >


            <Routes basename="/proyectoReact">

              <Route path="/servicio/:tipo" element={<ServicioSelector />} />

              <Route path="/" element={<ServicioSelector />} />
              <Route path='/Nosotros' element={<Nosotros />} />
              <Route path='/Contacto' element={<Contacto />} />
              <Route path='/ListaTurnos' element={<ProtectedRoute children={<ListaTurnos />} />} />

              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path="/Reservas" element={<ProtectedRoute children={<FormularioServicios />} />} />
             

              <Route path="/DetalleTurno/:id" element={<ProtectedRoute children={<DetalleTurno />} />} />
              <Route path="/EditarTurno/:id" element={<ProtectedRoute children={<EditarTurno />} />} />
              <Route path="/ReservaHecha" element={<ReservaHecha />} />

            </Routes>
            <div className='cajaHorarioMapa'>
              <GoogleMaps />
              <Horarios />
            </div>
          </main>
          <Footer />
        </section>
      </Router>
    </AuthProvider>
  )
}

export default App
