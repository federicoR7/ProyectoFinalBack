const mongoose = require('mongoose');

const turnoSchema = new mongoose.Schema({
  servicio: { type: [String], required: true },
  dia: { type: String, required: true },
  horario: { type: String, required: true },
  cliente: { type: String, required: true },

});

 module.exports = mongoose.model('Turno', turnoSchema);



