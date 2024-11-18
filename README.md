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



// puesta a punto del proyecto.
- se logro organizar los archivos para poder poner el back y el front juntos, de momento anda todo pero no estan relacionadas amabs partes, necesito revisar el back y ver que partes me sirve y que no.
- hay que rehacer el formulario para que funcionbe con la base de datos
- hay que comprobrar que funcione bien la base de datos, que la info llegue y venga correctamente 

//actualización 14/11/24
- se avanzó significativa copn la puesta a punto. se logró conectar el front con el back y el back con la base de datos, la información de usuario y de los turnos llega correctamente a la base de datos. de momento solo se puede, registrar usuario, logear, cerrar sesión y reservar. falta implementar una lista para que el usuario pueda ver todos sus turnos, los pueda editar y eliminar.

- necesito que la aplicación pueda mandarle un mail al usuario con su turno agendado
- falta render 

// actualización 18/11/24
- Se creó una lista en la que el usuario puede ver todos sus turnos, puede editar el dia y horario del mismo, pero no modificar los servicios por cuestiones de organización del salón. 

- falta render
- falta mail automatico al usuario y local
- falta correcciones de css 
- agregar boton de logeo/deslogeo
- agregar indicador de nombre de usuraio para hacer saber al usuario que esta conectado 



