const express = require('express');
const Api = require('../api/task');

const router = express.Router();

router.post('/', Api.createTask)
router.put('/:id', Api.updateTask)
router.get('/', Api.findTasks)
router.delete('/:id', Api.deleteTask)

module.exports = router;