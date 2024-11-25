const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session'); 
const turnosRoutes = require('./routes/turnoRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config(); 
const app = express();

// Middleware
app.use(cors()); 
app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'build')));


// Configuración de la sesión 
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true, 
  cookie: { secure: false }
}));


// Rutas
app.use('/api/turnos', turnosRoutes);
app.use('/api/users', userRoutes);


// Conexión a la base de datos
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
