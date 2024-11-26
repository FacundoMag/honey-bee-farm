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
const { router: usersRouter, verifyToken } = require('./api/users'); 
const apiariosRouter = require('./api/apiarios');  
const colmenasRouter = require('./api/colmenas');  
const trabajosRouter = require('./api/tareas');  
const areasRouter = require('./api/areas'); 
const tareasRouter = require('./api/tareas'); 
const estadisticasRouter = require('./api/estadisticas'); 

app.use('/api', usersRouter);
app.use('/api/apiarios', verifyToken, apiariosRouter);
app.use('/api/colmenas', verifyToken, colmenasRouter);
app.use('/api/trabajos', verifyToken, trabajosRouter);
app.use('/api/areas', verifyToken, areasRouter);
app.use('/api/tareas', verifyToken, tareasRouter);
app.use('/api/estadisticas', verifyToken, estadisticasRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
