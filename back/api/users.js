const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/conexion');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;



// Ruta para el login
router.post('/login', (req, res) => {
  const { dni, password } = req.body;
  const query = 'SELECT * FROM Usuarios WHERE DNI = ?';

  db.query(query, [dni], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (results.length === 0) {
      return res.status(401).send('Usuario no encontrado');
    }

    const user = results[0];
    bcrypt.compare(password, user.Password, (err, isMatch) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (isMatch) {
        // Generar el token JWT
        const token = jwt.sign({ uid: user.UID }, secretKey, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login exitoso', token });
      } else {
        res.status(401).send('Contraseña incorrecta');
      }
    });
  });
});

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

module.exports = {
  router,
  verifyToken
};
