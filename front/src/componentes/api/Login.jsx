import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';
import { useAuth } from './AuthContext';
import "./api.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/login', { username, password });
      console.log(response.data);


      login(username); // Llama a login después de un inicio de sesión exitoso

      localStorage.setItem('username', String(username));

      //Verificar si hay una ruta a la que redirigir después del inicio de sesión

      const redirectPath = sessionStorage.getItem('redirectAfterLogin');

      if (redirectPath) {

        sessionStorage.removeItem('redirectAfterLogin');
        navigate(redirectPath);
      } else {

        navigate('/');
      }

    } catch (error) {
      alert('Error en el inicio de sesión: ' + error.response?.data || error.message);
    }
  };

  return (

    // <form className='formLogin' onSubmit={handleSubmit}>

    //   <h3 class="display-5">Iniciá sesión para poder reservar.</h3>

    //   <div className='cajaLogin'>
    //     <div className='cajaInputLogin'>
    //     <input
    //       className='mt-3'
    //       type="text"
    //       placeholder="Nombre de usuario"
    //       value={username}
    //       onChange={(e) => setUsername(e.target.value)}
    //       required
    //     />
    //     <input

    //       className='mt-3'
    //       type="password"
    //       placeholder="Contraseña"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       required
    //     />
    //     </div>

    //     <button className='mt-3 mb-3' type="submit">Iniciar Sesión</button>
    //   </div>
    // </form>


    <Form className="fs-2 cajaForm"  onSubmit={handleSubmit}>
      <h3 class="display-5">Iniciá sesión para poder reservar.</h3>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label > Usuario</Form.Label>
        <Form.Control className="fs-3" type="text" placeholder="Ingresa tu usuario" value={username} onChange={(e) => setUsername(e.target.value)} required />

      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control className="fs-3" type="password" placeholder=" Ingresa tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Form.Text className="text-muted">
          Nunca compartas tu contraseña con nadie.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">

      </Form.Group>
      <div className='cajaBtnLogin'>
      <Button variant="secondary fs-2" type="submit">
        Ingresar
      </Button>
      </div>
    </Form>





  );
};

export default Login;

