const database = require('../config/database')

class Task {
    constructor() {
        this.model = config.database.define('task', {
            id: { 
                type: config.database.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: config.database.Sequelize.STRING
            },
            email: {
                type: config.database.Sequelize.STRING
            },
            senha: {
                type: config.database.Sequelize.STRING
            }
        })
    }
}

module.exports = (new Task()).model