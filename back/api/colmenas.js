const express = require('express');
const router = express.Router();
const db = require('../db/conexion');


// Obtener todas las colmenas
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Colmenas';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Crear una nueva colmena
router.post('/', (req, res) => {
    const { camaras, tipoTapa, IDPalet } = req.body;
    if (!camaras || !tipoTapa || !IDPalet) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    const query = 'INSERT INTO Colmenas (Camaras, TipoTapa, IDPalet) VALUES (?, ?, ?)';
    db.query(query, [camaras, tipoTapa, IDPalet], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).json({ id: results.insertId });
    });
});

// Actualizar una colmena
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { camaras, tipoTapa, IDPalet } = req.body;

    const query = 'UPDATE Colmenas SET Camaras = ?, TipoTapa = ?, IDPalet = ? WHERE IDColmena = ?';
    db.query(query, [camaras, tipoTapa, IDPalet, id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ id });
    });
});

// Eliminar una colmena
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM Colmenas WHERE IDColmena = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ id });
    });
});

module.exports = router;
