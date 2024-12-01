# Agenda de turnos 

Este proyecto es una aplicación web para poder realizar reservas web en un salón de belleza.
En esta app se utiliza:
    -React para el frontend, también se utilizaron librerías de bootstrap para dar una mejor apariencia a la página.
    -Node.js y Express para el backend. La aplicación permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) con los turnos.
    -MongoDB como base de datos.
    
## Tecnologías Utilizadas

- **Frontend**: React, React Router, CSS
- **Backend**: Node.js, Express
- **Base de Datos**: MongoDB, Mongoose

## Estructura del Proyecto

- **Frontend**: Código fuente en el directorio `front/`
- **Backend**: Código fuente en el directorio `back/`

## Instalación

### Backend

1. Navega al directorio `back/`.

    cd back

2. Instala las dependencias del backend.

    npm install

3. Configura las variables de entorno. Crea un archivo `.env` en el directorio `back/` y agrega la siguiente línea:

    MONGODB_URI=mongodb://localhost:27017/mi-base-de-datos

    Asegúrate de reemplazar `mi-base-de-datos` con el nombre de tu base de datos en MongoDB.

4. Inicia el servidor del backend.

    npm start


### Frontend

1. Navega al directorio `front/`.

    cd frontend

2. Instala las dependencias del frontend.

    npm install

3. Inicia el servidor de desarrollo del frontend.

    npm start

## Funcionalidades
- **Registro/LogIn**: la pagina cuenta con logeo de usuario para poder realizar la reserva con sus datos.
- **Listas de servicios desplegable**: ofrece una visualización simple pero eficaz de los diferentes tipos de servicios que ofrece la empresa/negocio.
- **Agendar Turno**: Mediante un logeo previo, el usuario puede agendar un turno completando un formulario(los servicios se cargan automaticamente cuando los elije desde el abanico de servicios).
- **Lista de Turnos**: Visualiza todos los turnos que el usuario reservó.
- **Editar Turno**: El usuario tiene la posibilidad de modificar su turno una vez reservado.
- **Eliminar Turno**: Elimina el turno de la base de datos.


## Endpoints del API

- `GET /api/turnos` - Obtiene todos los turnos.
- `GET /api/turnos/:id` - Obtiene un turno por ID.
- `POST /api/turnos` - Crea un nuevo turno.
- `PUT /api/turnos/:id` - Actualiza un turno por ID.
- `DELETE /api/turnos/:id` - Elimina un turno por ID.



  
