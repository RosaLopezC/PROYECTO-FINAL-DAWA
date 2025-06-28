const express = require('express');
const cors = require('cors');
const laboratorioRoutes = require('./routes/laboratorioRoutes');
const medicamentoRoutes = require('./routes/medicamentoRoutes');
const sequelize = require('./db');

// Importar modelos para establecer relaciones
require('./models');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/laboratorios', laboratorioRoutes);
app.use('/api/medicamentos', medicamentoRoutes);

sequelize.sync()
  .then(() => {
    console.log('Base de datos sincronizada');
    app.listen(3002, () => {
      console.log('Servidor corriendo en http://localhost:3002');
    });
  })
  .catch(err => {
    console.error('Error al sincronizar base de datos:', err);
  });