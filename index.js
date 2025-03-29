// Requiriendo las dependencias necesarias
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Cargar variables de entorno desde .env

const app = express();
const port = process.env.PORT || 5000; // Establecer puerto desde .env o 5000 por defecto

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.log('Error de conexión a MongoDB:', err));

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡La API está funcionando correctamente!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
