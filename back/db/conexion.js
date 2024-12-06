const mysql = require('mysql');
const dotenv = require('dotenv').config();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'honey'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado a la base de datos');
});

module.exports = db;
