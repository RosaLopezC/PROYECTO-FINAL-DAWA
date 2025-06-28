const { Medicamento, Laboratorio } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const medicamentos = await Medicamento.findAll({
      include: [{
        model: Laboratorio,
        as: 'laboratorio'
      }]
    });
    res.json(medicamentos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const medicamento = await Medicamento.findByPk(req.params.codMedicamento, {
      include: [{
        model: Laboratorio,
        as: 'laboratorio'
      }]
    });
    if (!medicamento) return res.status(404).json({ message: 'No encontrado' });
    res.json(medicamento);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const nuevo = await Medicamento.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const actualizado = await Medicamento.update(req.body, {
      where: { codMedicamento: req.params.codMedicamento }
    });
    if (actualizado[0] === 0) return res.status(404).json({ message: 'No encontrado' });
    res.json({ message: 'Actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const eliminado = await Medicamento.destroy({
      where: { codMedicamento: req.params.codMedicamento }
    });
    if (!eliminado) return res.status(404).json({ message: 'No encontrado' });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};