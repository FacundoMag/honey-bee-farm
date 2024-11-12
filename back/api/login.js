const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/conexion');

const secretKey = 'your_secret_key'; // Asegúrate de utilizar una clave secreta segura

// Ruta para el registro
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).send('Todos los campos son obligatorios');
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).send(err);
    }

    const query = 'INSERT INTO Usuarios (NombreUsuario, Email, Password) VALUES (?, ?, ?)';
    db.query(query, [username, email, hash], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).send('Usuario registrado exitosamente');
    });
  });
});

// Ruta para el login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM Usuarios WHERE Email = ?';

  db.query(query, [email], (err, results) => {
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
