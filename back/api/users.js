const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/conexion');
const dotenv = require('dotenv').config();

const secretKey = process.env.SECRET_KEY;



// Ruta para el login
router.post('/login', (req, res) => {
  const { nombreUsuario, password } = req.body;
  const query = 'SELECT * FROM administrador WHERE Password = ?';

  db.query(query, [password], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (results.length === 0) {
      return res.status(401).send('Administrador no encontrado');
    }

    const user = results[0];
  if(password != user.Password){
       return res.status(401).json({
        error: "contraseña incorrecta"
       })
  }
  res.json({
    message: "acceso concedido"
  })
  });
});
//ruta para crear empleado: .. localhost:5000/api/registrar
router.post('/registrar', function(req, res, next){
  const {pasaporte, nombreYapellido, telefono, correo, password} = req.body;
  if(!pasaporte || !nombreYapellido || !telefono || !correo || !password){
    return res.status(401).json({error: "los campos son obligatorios"})
  }

  const ObtenerEstado = "SELECT id FROM estados WHERE Estado = Activo";
  db.query(ObtenerEstado, function(error, results){
      if(error){
        return res.status(401).json({error: "error al obtener el estado"})
      }
      const estado = results[0].id;

      const sql = "INSERT INTO empleados (pasaporte, NombreUsuario, telefono, correo, password, estado) VALUES (?, ?, ?, ?, ?, ?)";
      db.query(sql, [pasaporte, nombreYapellido, telefono, correo, password, estado], function(error, results){
        if(error){
          return res.status(403).json({error: "error al crear el empleado"});
        }
        res.json({
          status: "se creo el empleado correctamente"
        })
      })
  })
})
//ruta para traer los empleados: localhost:5000/api/empleados
router.get('/empleados', function(res, req, next){
  const sql = "SELECT * FROM empleados";
  db.query(sql, function(error, results){
    if(error){
      console.log(error);
      return res.status(400).json({error: "ocurrio un error a la hora de traer a los empleados"})
    }
    res.json({
      results
    })
  })
})



module.exports = router;
