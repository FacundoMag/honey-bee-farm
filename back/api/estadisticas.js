const express = require('express');
const router = express.Router();
const db = require('../db/conexion');

// Obtener estadísticas de miel
router.get('/miel', (req, res) => {
  const query = 'SELECT Mes, Ano, KilosExtraidos, IDApiario FROM kilosmielpormes';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results.rows); 
    }
  });
});

// Obtener estadísticas de trabajos
router.get('/trabajos', (req, res) => {
  const query = 'SELECT Mes, Ano, TrabajosExitosos, TrabajosNoExitosos, IDApiario FROM Tareas';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results.rows); 
    }
  });
});

module.exports = router;
