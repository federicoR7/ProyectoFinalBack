const mongoose = require('mongoose');
const Turno = require('../models/TurnosModel');
const User = require('../models/User'); 
const nodemailer = require('nodemailer'); 
const dotenv = require('dotenv');
dotenv.config();

// Obtener todos los turnos
exports.getTurnos = async (req, res) => {
  const username = req.query.username;
  if (!username) {
    return res.status(400).json({ message: 'El nombre de usuario es obligatorio' });
  }

  try {
    // Filtrar los turnos por el username del usuario logueado
    const turnos = await Turno.find({ username });
    res.json(turnos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Obtener un turno por ID
exports.getTurnoById = async (req, res) => {

  try {
    const turno = await Turno.findById(req.params.id);

    if (turno) {
      res.json(turno);
    } else {
      res.status(404).json({ message: 'turno no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//crear un nuevo tunro
exports.createTurno = async (req, res) => {
  console.log(req.body);

  const turno = new Turno({
    servicio: req.body.servicio,
    dia: req.body.dia,
    horario: req.body.horario,
    username: req.body.username,
  });

  try {
    // Guardar el turno en la base de datos
    const nuevoTurno = await turno.save();
    res.status(201).json(nuevoTurno);

    // Buscar el email del usuario
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      console.error('Usuario no encontrado para enviar correos');
      return;
    }
    const emailUsuario = user.email;

    //Nodemailer
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    // Contenidos de los correos
    const asuntoUsuario = 'Confirmación de reserva';
    const mensajeUsuario = `
      <h1>Gracias por tu reserva</h1>
      <p>Detalles de tu reserva:</p>
      <ul>
        <li>Servicio: ${req.body.servicio}</li>
        <li>Día: ${req.body.dia}</li>
        <li>Horario: ${req.body.horario}</li>
      </ul>
    `;

    const asuntoLocal = 'Nueva reserva realizada';
    const mensajeLocal = `
      <h1>Nueva reserva</h1>
      <p>Detalles de la reserva:</p>
      <ul>
        <li>Usuario: ${req.body.username}</li>
        <li>Servicio: ${req.body.servicio}</li>
        <li>Día: ${req.body.dia}</li>
        <li>Horario: ${req.body.horario}</li>
      </ul>
    `;

    await transporter.sendMail({
      from: `VeryNails <${process.env.EMAIL}>`,
      to: emailUsuario,
      subject: asuntoUsuario,
      html: mensajeUsuario,
    });

    await transporter.sendMail({
      from: `Tu Negocio <${process.env.EMAIL}>`,
      to: process.env.EMAIL,
      subject: asuntoLocal,
      html: mensajeLocal,
    });

    console.log('Correos enviados con éxito');
  } catch (err) {
    console.error('Error al crear turno o enviar correos:', err);
  }
};

// Actualizar un turno por ID
exports.updateTurno = async (req, res) => {
  try {
    const turno = await Turno.findById(req.params.id);
    if (turno) {

      turno.servicio = req.body.servicio || turno.servicio;
      turno.dia = req.body.dia || turno.dia;
      turno.horario = req.body.horario || turno.horario;
      turno.cliente = req.body.cliente || turno.cliente;

      const turnoActualizado = await turno.save();
      res.json(turnoActualizado);
    } else {
      res.status(404).json({ message: 'turno no encontrado' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar un turno por ID
exports.deleteTurno = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'ID no válido' });
  }

  try {
    const turno = await Turno.findById(req.params.id);
    if (turno) {
      await turno.deleteOne();
      res.json({ message: 'Turno eliminado' });
    } else {
      res.status(404).json({ message: 'Turno no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};







