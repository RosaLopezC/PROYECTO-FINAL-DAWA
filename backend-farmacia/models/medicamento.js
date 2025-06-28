const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Medicamento = sequelize.define('medicamento', {
  codMedicamento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcionMed: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fechaFabricacion: {
    type: DataTypes.DATE,
    allowNull: false
  },
  fechaVencimiento: {
    type: DataTypes.DATE,
    allowNull: false
  },
  presentacion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precioVentaUni: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  precioVentaPres: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  codLab: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'laboratorio',
      key: 'codLab'
    }
  }
}, {
  tableName: 'medicamento',
  timestamps: false
});

module.exports = Medicamento;