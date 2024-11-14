import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './componentes/header/Header';
import Footer from './componentes/footer/Footer';
import GoogleMaps from './componentes/googleMaps/GoogleMaps';
import Horarios from './componentes/horarios/Horarios';
import Carrousel from './componentes/carrousel/Carrousel';
import Formulario from './componentes/formularioReservas/FormularioReservas';
import Nosotros from './componentes/nosotros/Nosotros';
import Contacto from './componentes/contacto/Contacto';
import React, { useRef, useEffect } from 'react';
import ServicioSelector from './componentes/section/Section';

import Register from './componentes/api/Register';
import Login from './componentes/api/Login';
import { AuthProvider } from './componentes/api/AuthContext';
// import Protegida from './componentes/protegida/Protegida';
import ProtectedRoute from './componentes/api/ProtectedRoute';





function App() {


localStorage.removeItem('username'); // Limpia cualquier usuario guardado al iniciar la aplicación


  return (
    <AuthProvider>
    <Router>
      <section className='body'>
        <Header />
        <Carrousel /> 
        <main className='main'  >
        
                
          <Routes basename="/proyectoReact">
          
          <Route path="/servicio/:tipo" element={<ServicioSelector />} />
          
           <Route  path="/" element={<ServicioSelector />} />
            {/* <Route path='/Reservas' element={<Formulario />} /> */}
            <Route path='/Nosotros' element={<Nosotros />} />
            <Route path='/Contacto' element={<Contacto />} />

            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path="/Reservas" element={<ProtectedRoute children={<Formulario />} />} />

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
