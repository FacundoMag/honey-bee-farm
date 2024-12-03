const express = require('express');
const router = express.Router();
const db = require('../db/conexion');

// Obtener estadísticas de miel
router.get('/miel', (req, res) => {
  const query = 'SELECT Mes, AÑo, KilosExtraidos, IDApiario FROM kilosmielpormes';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results); 
    }
  });
});

// Obtener estadísticas de trabajos
router.get('/trabajos', (req, res) => {
  const query = 'SELECT Mes, Año, NombreTarea, Realizada FROM Tareas';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results); 
    }
  });
});

module.exports = router;
