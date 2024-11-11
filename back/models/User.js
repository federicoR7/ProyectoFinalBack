const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nombre: { type: String, required: true,  },
  apellido: { type: String, required: true,  },
  email: { type: String, required: true, },
  celular: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
