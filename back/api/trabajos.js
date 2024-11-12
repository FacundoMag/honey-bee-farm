const express = require('express');
const router = express.Router();
const db = require('../db/conexion');
const jwt = require('jsonwebtoken');

// Clave secreta para JWT
const secretKey = 'your_secret_key'; // Asegúrate de utilizar una clave secreta segura

// Middleware para verificar tokens
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).send('Token requerido');
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(500).send('Token inválido');
    }

    req.uid = decoded.uid;
    next();
  });
};

// Obtener todas las tareas
router.get('/', verifyToken, (req, res) => {
  const query = 'SELECT * FROM Tareas';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).send('Error ejecutando la consulta');
    } else {
      res.json(results);
    }
  });
});

// Crear una nueva tarea
router.post('/', verifyToken, (req, res) => {
  const { NombreTarea, IDApiario, IDArea } = req.body; // Añadir IDArea
  const query = 'INSERT INTO Tareas (NombreTarea, IDApiario, IDArea) VALUES (?, ?, ?)';
  db.query(query, [NombreTarea, IDApiario, IDArea], (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).send('Error ejecutando la consulta');
    } else {
      res.status(201).json({ insertId: results.insertId });
    }
  });
});


// Actualizar el estado de una tarea
router.put('/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const query = 'UPDATE Tareas SET realizada = NOT realizada WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).send('Error ejecutando la consulta');
    } else {
      res.json({ message: 'Estado de la tarea actualizado' });
    }
  });
});

// Eliminar una tarea
router.delete('/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Tareas WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).send('Error ejecutando la consulta');
    } else {
      res.json({ message: 'Tarea eliminada' });
    }
  });
});

module.exports = router;
