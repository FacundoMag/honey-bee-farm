const express = require('express');
const router = express.Router();
const db = require('../db/conexion');

// Obtener todas las áreas
router.get('/', (req, res) => {
  const query = 'SELECT * FROM Areas';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error obteniendo las áreas:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
