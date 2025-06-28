const express = require('express');
const router = express.Router();
const laboratorioController = require('../controllers/laboratorioController');

router.get('/', laboratorioController.getAll);
router.get('/:codLab', laboratorioController.getOne);
router.post('/', laboratorioController.create);
router.put('/:codLab', laboratorioController.update);
router.delete('/:codLab', laboratorioController.remove);

module.exports = router;