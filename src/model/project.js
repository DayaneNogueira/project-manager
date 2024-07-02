const database = require('../config/database')

class Project {
    constructor() {
        this.model = config.database.define('project', {
            id: {
                type: config.database.Sequelize.INTEGER,
                primaryKey: true
            },
            titulo: {
                type: config.database.Sequelize.STRING
            },
            conteudo: {
                type: config.database.Sequelize.STRING
            },
            autorId: {
                type: config.database.Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id'
                }
            }
        })
    }
}

module.exports = (new Post()).model