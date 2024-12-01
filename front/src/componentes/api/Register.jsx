import React, { useState } from 'react';
import api from './api';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from './AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Agregar confirmPassword
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica si las contraseñas coinciden
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    try {
      await api.post('/users/register', { username, password, nombre, apellido, email, celular });
      alert('Usuario registrado con éxito');

      login(username); // Llama a login después de un inicio de sesión exitoso

      sessionStorage.setItem('username', String(username));

      navigate('/');
      
    } catch (error) {
      alert('Error al registrar: ' + error.response.data);
    }
  };

  return (
    <Form className="fs-3 cajaFormRegister" onSubmit={handleSubmit}>
      <h5 className="display-6 mb-3 ms-3 me-3">¡Regístrate para tener full acceso a nuestra web!</h5>

      <Form.Group className="mb-3 w-75" controlId="formBasicEmail">
        <Form.Label>Nombre de Usuario</Form.Label>
        <Form.Control
          className="fs-3"
          type="text"
          placeholder="Ingresa tu usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Form.Text className="text-muted fs-5">
          El nombre de usuario es único e intransferible.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3 w-75" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          className="fs-3"
          type="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Form.Text className="text-muted fs-5">
          Nunca compartas tu contraseña con nadie.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3 w-75" controlId="formBasicConfirmPassword">
        <Form.Label>Confirmar Contraseña</Form.Label>
        <Form.Control
          className="fs-3"
          type="password"
          placeholder="Confirma tu contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Form.Text className="text-muted fs-5">
          Debes ingresar la misma contraseña.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3 w-75" controlId="formBasicEmail">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          className="fs-3"
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3 w-75" controlId="formBasicEmail">
        <Form.Label>Apellido</Form.Label>
        <Form.Control
          className="fs-3"
          type="text"
          placeholder="Tu apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3 w-75" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          className="fs-3"
          type="email"
          placeholder="Tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3 w-75" controlId="formBasicEmail">
        <Form.Label>Celular</Form.Label>
        <Form.Control
          className="fs-3"
          type="number"
          placeholder="Tu número de celular"
          value={celular}
          onChange={(e) => setCelular(e.target.value)}
          required
        />
        <Form.Text className="text-muted fs-5">
          Con el prefijo de tu país.
        </Form.Text>
      </Form.Group>

      <div className="cajaBtnLogin">
        <Button variant="secondary fs-2 mb-3" type="submit">
          Registrarse!
        </Button>
      </div>
    </Form>
  );
};

export default Register;



