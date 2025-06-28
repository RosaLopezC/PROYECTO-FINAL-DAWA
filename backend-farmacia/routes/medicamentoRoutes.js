const express = require('express');
const router = express.Router();
const medicamentoController = require('../controllers/medicamentoController');

router.get('/', medicamentoController.getAll);
router.get('/:codMedicamento', medicamentoController.getOne);
router.post('/', medicamentoController.create);
router.put('/:codMedicamento', medicamentoController.update);
router.delete('/:codMedicamento', medicamentoController.remove);

module.exports = router;