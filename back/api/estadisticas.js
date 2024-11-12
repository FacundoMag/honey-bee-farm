const express = require('express');
const router = express.Router();
const db = require('../db/conexion');

// Obtener estadísticas de miel 
router.get('/miel', (req, res) => 
  { const query = 'SELECT Mes, Kilos, KgAprox, IDApiario FROM EstadisticasMiel'; 
    db.query(query, (err, results) => { if (err) { res.status(500).send(err);}
      else { res.json(results); } }); });

// Obtener estadísticas de trabajos
router.get('/trabajos', (req, res) => {
  const query = 'SELECT Mes, TrabajosExitosos, TrabajosNoExitosos, IDApiario FROM EstadisticasTrabajos';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results); // Asegúrate de que se está devolviendo un array
    }
  });
});

module.exports = router;
