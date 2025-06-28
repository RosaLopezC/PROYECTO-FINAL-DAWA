const Laboratorio = require('./laboratorio');
const Medicamento = require('./medicamento');

// Definir relaciones
Laboratorio.hasMany(Medicamento, {
  foreignKey: 'codLab',
  as: 'medicamentos'
});

Medicamento.belongsTo(Laboratorio, {
  foreignKey: 'codLab',
  as: 'laboratorio'
});

module.exports = {
  Laboratorio,
  Medicamento
};