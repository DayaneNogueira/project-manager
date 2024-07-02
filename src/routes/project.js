const express = require('express');
const Api = require('../api/project');

const router = express.Router();

router.post('/', Api.createProject)
router.put('/:id', Api.updateProject)
router.get('/', Api.findProjects)
router.delete('/:id', Api.deleteProject)

module.exports = router;