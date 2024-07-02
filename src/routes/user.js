const express = require('express')
const User = require('../api/user')
const Middleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.put('/:id', Middleware.validateToken,User.updateUser)
router.get('/', User.findUsers)
router.delete('/:id', User.deleteUser)

module.exports = router