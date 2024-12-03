const express = require('express');
const router = express.Router();
const db = require('../db/conexion');

router.get('/', function(req, res, next){
    const sql = "SELECT * FROM registros";
    db.query(sql, function(error, results){
        if(error){
            return res.status(401).json({error: "Error al traer los registros"});
        }
        res.json({
            results
        })
    })
})

module.exports = router