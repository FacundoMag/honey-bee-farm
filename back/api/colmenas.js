const express = require('express');
const router = express.Router();
const db = require('../db/conexion'); 

// Obtener todas las colmenas
router.get('/', (req, res) => {
  const { apiarioId } = req.query;
  const query = 'SELECT * FROM Colmenas WHERE IDPalet IN (SELECT IDPalet FROM Palets WHERE IDApiario = ?)';
  db.query(query, [apiarioId], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Crear una nueva colmena
router.post('/', (req, res) => {
  const { Camaras, TipoTapa, IDPalet } = req.body;
  const query = 'INSERT INTO Colmenas (Camaras, TipoTapa, IDPalet) VALUES (?, ?, ?)';
  db.query(query, [Camaras, TipoTapa, IDPalet], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(`Colmena creada con ID: ${results.insertId}`);
    }
  });
});

module.exports = router;
