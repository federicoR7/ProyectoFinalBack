const mongoose = require('mongoose');
const Turno = require('../models/TurnosModel');

// Obtener todos los turnos
exports.getTurnos = async (req, res) => {
  try {
    const turnos = await Turno.find();
    res.json(turnos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener un turno por ID
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


// Crear un nuevo turno
exports.createTurno = async (req, res) => {
  console.log(req.body)
  const turno = new Turno({

    servicio: req.body.servicio,
    dia: req.body.dia,
    horario: req.body.horario,
    cliente: req.body.cliente,
  });
  
  try {
    const nuevoTurno = await turno.save();
    res.status(201).json(nuevoTurno);
  } catch (err) {
    res.status(400).json({ message: err.message });
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