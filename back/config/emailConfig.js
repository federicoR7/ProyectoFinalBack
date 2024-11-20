const nodemailer = require('nodemailer');

// Crear un transporte con Ethereal
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'lester.cassin@ethereal.email',
        pass: 'djcBb52KfeX7dKT5JU'
    }
});

module.exports = transporter;
