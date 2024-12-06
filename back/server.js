const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db/conexion');

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', // URL frontend
  optionsSuccessStatus: 200
};

app.use(bodyParser.json());
app.use(cors(corsOptions));

// Importar rutas y middleware de verificación
const usersRouter = require('./api/users'); 
const apiariosRouter = require('./api/apiarios');  
const colmenasRouter = require('./api/colmenas');  
const trabajosRouter = require('./api/tareas');  
const areasRouter = require('./api/areas'); 
const tareasRouter = require('./api/tareas'); 
const estadisticasRouter = require('./api/estadisticas'); 
const registro = require('./api/registro');

app.use('/api', usersRouter);
app.use('/api/apiarios', apiariosRouter);
app.use('/api/colmenas',  colmenasRouter);
app.use('/api/trabajos', trabajosRouter);
app.use('/api/areas', areasRouter);
app.use('/api/tareas',  tareasRouter);
app.use('/api/estadisticas',  estadisticasRouter);
app.use('/api/registro', registro);
app.use(express.json())

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
