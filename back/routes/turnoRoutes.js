const express = require('express');
const router = express.Router();
const turnoController = require('../controllers/turnosController');

// Rutas para los turnos
router.get('/', turnoController.getTurnos);
router.get('/:id', turnoController.getTurnoById);
router.post('/', turnoController.createTurno);
router.put('/:id', turnoController.updateTurno);
router.delete('/:id', turnoController.deleteTurno);


module.exports = router;
