// Importa dependencias necesarias
const express = require('express');
const cors = require('cors');

// Crea la aplicación Express
const app = express();

// Configura el puerto donde se ejecutará el servidor
const port = process.env.PORT || 3000;

// Middleware para habilitar CORS
app.use(cors());

// Middleware para parsear el cuerpo de las solicitudes en JSON
app.use(express.json());

// Ruta de prueba GET
app.get('/api', (req, res) => {
  res.json({
    message: 'Bienvenido a tu API Global',
    description: 'Esta API está configurada para manejar múltiples rutas y funciones.'
  });
});

// Ruta para crear datos POST
app.post('/api/data', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'El título y el contenido son obligatorios' });
  }

  res.status(201).json({
    message: 'Datos creados correctamente',
    data: { title, content }
  });
});

// Ruta para actualizar datos PUT
app.put('/api/data/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'El título y el contenido son obligatorios' });
  }

  res.json({
    message: `Datos con ID ${id} actualizados correctamente`,
    data: { id, title, content }
  });
});

// Ruta para eliminar datos DELETE
app.delete('/api/data/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    message: `Dato con ID ${id} eliminado correctamente`
  });
});

// Middleware para manejar rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Inicia el servidor en el puerto 3000
app.listen(port, () => {
  console.log(`Servidor API escuchando en http://localhost:${port}`);
});
