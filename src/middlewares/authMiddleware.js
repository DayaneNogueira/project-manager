const jwt = require('jsonwebtoken');

const SECRET_KEY = 'validarSenha123890'

class Middleware {
  async validateToken(req, res, next) {
    const token = req.headers.authorization

    try {
      await UserController.validateToken(token)
      next()
    } catch (e) {
      res.status(400).send({ error: e.message })
    }

    if (!token) {
      throw new Error('Token inválido')
    }

    try {
      await jwt.verify(token, SECRET_KEY)
    } catch {
      throw new Error('Token inválido')
    }
  }
}

module.exports = new Middleware()