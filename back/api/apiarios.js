const express = require('express');
const router = express.Router();
const db = require('../db/conexion');


// Obtener todos los apiarios
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Apiarios';
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

module.exports = router;
