const express = require('express');
const router = express.Router();
const turnoController = require('../controllers/turnosController');

const createEtherealTransporter = require('../config/emailConfig'); // Importar configuración de Nodemailer

// Rutas para los turnos
router.get('/', turnoController.getTurnos);
router.get('/:id', turnoController.getTurnoById);
router.post('/', turnoController.createTurno);
router.put('/:id', turnoController.updateTurno);
router.delete('/:id', turnoController.deleteTurno);


// Ruta para manejar reservas
router.post('/api/reservas', async (req, res) => { 
    const { servicio, dia, horario, username, email } = req.body;
  
    try {
      // Crear el transporte
      const transporter = await createEtherealTransporter();
  
      // Configuración de los correos
      const userMailOptions = {
        from: '"Tu Local" <lester.cassin@ethereal.email>',
        to: email, // Correo del usuario
        subject: 'Confirmación de tu reserva',
        text: `Hola ${username}, tu reserva ha sido agendada:
          - Servicio: ${servicio}
          - Día: ${dia}
          - Horario: ${horario}
  
  Gracias por confiar en nosotros.`,
      };
  
      const localMailOptions = {
        from: '"Tu Local" <lester.cassin@ethereal.email>',
        to: 'lester.cassin@ethereal.email', // Correo del local
        subject: 'Nueva reserva recibida',
        text: `Nueva reserva realizada:
          - Cliente: ${username}
          - Correo: ${email}
          - Servicio: ${servicio}
          - Día: ${dia}
          - Horario: ${horario}`,
      };
  
      // Enviar los correos
      await transporter.sendMail(userMailOptions);
      await transporter.sendMail(localMailOptions);
  
      res.status(200).json({ message: 'Reserva realizada y correos enviados' });
    } catch (error) {
      console.error('Error al enviar correos:', error);
      res.status(500).json({ message: 'Error al realizar la reserva' });
    }
  });


module.exports = router;
