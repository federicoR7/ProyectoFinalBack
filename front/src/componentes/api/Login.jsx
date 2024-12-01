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

      sessionStorage.setItem('username', String(username));

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
    <Form className="fs-2 cajaFormLogin"  onSubmit={handleSubmit}>
      <h5 class="display-6 mb-3 ms-3 me-3">Iniciá sesión para poder reservar.</h5>
      <Form.Group className="mb-3 w-75" controlId="formBasicEmail">
        <Form.Label > Usuario</Form.Label>
        <Form.Control className="fs-3 " type="text" placeholder="Ingresa tu usuario" value={username} onChange={(e) => setUsername(e.target.value)} required />

      </Form.Group>

      <Form.Group className="mb-3 w-75" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control className="fs-3" type="password" placeholder=" Ingresa tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Form.Text className="text-muted">
          Nunca compartas tu contraseña con nadie.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">

      </Form.Group>
      <div className='cajaBtnLogin'>
      <Button variant="secondary fs-2 mb-3" type="submit">
        Ingresar
      </Button>
      </div>

      <p className='display-6 fs-3'>No tenés una cuenta? <a href="/Register">Registrate acá!</a></p>
    </Form>

  );
};

export default Login;

