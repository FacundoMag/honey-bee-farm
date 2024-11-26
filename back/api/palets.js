const express = require('express');
const router = express.Router();
const db = require('../db/conexion');
const { verifyToken } = require('./users');

// Obtener todos los palets
router.get('/', verifyToken, (req, res) => {
    const query = 'SELECT * FROM Palets';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Crear un nuevo palet
router.post('/', verifyToken, (req, res) => {
    const { tipo, IDApiario } = req.body;
    if (!tipo || !IDApiario) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    const query = 'INSERT INTO Palets (Tipo, IDApiario) VALUES (?, ?)';
    db.query(query, [tipo, IDApiario], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).json({ id: results.insertId });
    });
});

module.exports = router;
