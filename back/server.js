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
const { router: loginRouter, verifyToken } = require('./api/login');
const apiariosRouter = require('./api/apiarios');  
const colmenasRouter = require('./api/colmenas');  
const trabajosRouter = require('./api/trabajos');  
const areasRouter = require('./api/areas'); 

app.use('/api', loginRouter);
app.use('/api/apiarios', verifyToken, apiariosRouter);
app.use('/api/colmenas', verifyToken, colmenasRouter);
app.use('/api/trabajos', verifyToken, trabajosRouter);
app.use('/api/areas', verifyToken, areasRouter); // Asegúrate de que la ruta de áreas está configurada

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
