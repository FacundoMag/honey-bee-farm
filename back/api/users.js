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
    console.log(req.body);
    return res.status(401).json({error: "los campos son obligatorios"})
  }

  const ObtenerEstado = "SELECT ID FROM estados WHERE Estado = 'Activo'";
  db.query(ObtenerEstado, function(error, results){
      if(error){
        return res.status(401).json({error: "error al obtener el estado"})
      }
      const estado = results[0].ID;

      const sql = "INSERT INTO empleados (pasaporte, NombreUsuario, telefono, correo, password, estado) VALUES (?, ?, ?, ?, ?, ?)";
      db.query(sql, [pasaporte, nombreYapellido, telefono, correo, password, estado], function(error, results){
        if(error){
          console.error(error)
          return res.status(403).json({error: "error al crear el empleado"});
        }
        res.json({
          status: "se creo el empleado correctamente"
        })
      })
  })
})
//ruta para traer los empleados: localhost:5000/api/empleados
router.get('/empleados', function(req, res, next){
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

router.put('/desabilitacion', function(req, res, next){
  const {ID} = req.query;
  const sql = "SELECT estado FROM empleados WHERE UID = ?";
  db.query(sql, [ID], function(error, results){
    if(error){
      console.log(error);
      return res.status(401).json({error: "error al obtener el estado actual del empleado"});
    }
    const estadoActual = results[0];
    if(estadoActual == 1){
      const sql2 = "UPDATE empleados SET estado = '2' WHERE ID = ?";
      db.query(sql2, [ID], function(error, results){
        if(error){
          return res.status(401).json({error: "error al actualizar el estado del empleado a Desabilitado"});
        }
        res.json({message: "Estado aactualizado correctamente"})
      })
    }
    if(estadoActual == 2){
      const sql3 = "UPDATE empleados SET estado = '1' WHERE ID = ?";
      db.query(sql3, [ID], function(error, results){
        if(error){
          return res.status(401).json({error: "error al actualizar el estado del empleado a Activo"});
        }
        res.json({message: "Estado actualizado correctamente"})
      })
    }
  })
})



module.exports = router;
