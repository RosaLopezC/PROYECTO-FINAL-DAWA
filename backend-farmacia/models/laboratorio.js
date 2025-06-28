const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Laboratorio = sequelize.define('laboratorio', {
  codLab: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  razonSocial: {
    type: DataTypes.STRING,
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  contacto: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'laboratorio',
  timestamps: false
});

module.exports = Laboratorio;