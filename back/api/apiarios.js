const express = require('express');
const router = express.Router();
const db = require('../db/conexion');


// Obtener todos los apiarios
router.get('/', (req, res) => {
    const query = `
        SELECT apiarios.IDApiario, apiarios.NombreApiario, areas.NombreArea, 
               apiarios.KilosExtraidos, apiarios.Mes, apiarios.Año
        FROM apiarios
        JOIN areas ON apiarios.IDArea = areas.IDArea
    `;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});


// Crear un nuevo apiario
router.post('/', (req, res) => {
    const { nombreApiario, IDArea } = req.body;
    if (!nombreApiario || !IDArea) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    const query = 'INSERT INTO Apiarios (NombreApiario, IDArea) VALUES (?, ?)';
    db.query(query, [nombreApiario, IDArea], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).json({ id: results.insertId });
    });
});


router.put('/:id', (req, res) => {
    const { nombreApiario, IDArea } = req.body;
    const { id } = req.params;
  
    if (!nombreApiario || !IDArea) {
      return res.status(400).send('El nombre del apiario y el área son obligatorios');
    }
  
    const query = 'UPDATE Apiarios SET NombreApiario = ?, IDArea = ? WHERE IDApiario = ?';
    db.query(query, [nombreApiario, IDArea, id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (results.affectedRows === 0) {
        return res.status(404).send('Apiario no encontrado');
      }
      res.status(200).json({ message: 'Apiario actualizado con éxito' });
    });
  });
  
module.exports = router;
