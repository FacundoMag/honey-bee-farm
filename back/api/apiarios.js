const express = require('express');
const router = express.Router();
const db = require('../db/conexion');

// Obtener todos los apiarios
router.get('/', (req, res) => {
  const query = 'SELECT * FROM Apiarios';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error obteniendo los apiarios:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Crear un nuevo apiario
router.post('/', (req, res) => {
  const { NombreApiario, IDArea } = req.body;
  const query = 'INSERT INTO Apiarios (NombreApiario, IDArea) VALUES (?, ?)';
  db.query(query, [NombreApiario, IDArea], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(`Apiario creado con ID: ${results.insertId}`);
    }
  });
});

module.exports = router;
