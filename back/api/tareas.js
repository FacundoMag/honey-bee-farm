const express = require('express');
const router = express.Router();
const db = require('../db/conexion');

// Obtener todas las tareas
router.get('/', (req, res) => {
  const query = 'SELECT * FROM Tareas';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Crear una nueva tarea
router.post('/', (req, res) => {
  const { nombreTarea, descripcion, IDEstado } = req.body;
  if (!nombreTarea || !descripcion || !IDEstado) {
    return res.status(400).send('Todos los campos son obligatorios');
  }

  const query = 'INSERT INTO Tareas (nombreTarea, descripcion, IDEstado) VALUES (?, ?, ?)';
  db.query(query, [nombreTarea, descripcion, IDEstado], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).json({ id: results.insertId });
  });
});

// Actualizar el estado de una tarea
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { IDEstado } = req.body;

  const query = 'UPDATE Tareas SET IDEstado = ? WHERE IDTarea = ?';
  db.query(query, [IDEstado, id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ id });
  });
});

module.exports = router;
