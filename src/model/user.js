const { UniqueConstraintError } = require('sequelize')
const database = require('../config/database')

class User {
    constructor() {
        this.model = config.database.define('user', {
            id: { 
                type: config.database.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: config.database.Sequelize.STRING
            },
            email: {
                type: config.database.Sequelize.STRING,
                allowNull: false,
                unique: true, //email único para cada usuário
            },
            senha: {
                type: config.database.Sequelize.STRING
            }
        })
    }
}

module.exports = (new User()).model