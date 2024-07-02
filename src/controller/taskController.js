const task = require('../model/task')
const UserController = require('./userController')

class taskController {
    async createTask(titulo, conteudo, autorId) {
        if (titulo === undefined || conteudo === undefined || autorId === undefined) {
            throw new Error('Título, conteúdo e autorId são obrigatórios.')
        }

        await UserController.findUser(Number(autorId))

        const taskValue = await task.create({
            titulo,
            conteudo,
            autorId
        })

        return taskValue
    }

    async findTask(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório.')
        }

        const taskValue = await task.findByPk(id)
        
        if (!taskValue) {
            throw new Error('Task não encontrada.')
        }

        return taskValue
    }

    async update(id, titulo, conteudo, autorId) {
        if (id === undefined || titulo === undefined || conteudo === undefined || autorId === undefined) {
            throw new Error('Título, conteúdo e autorId são obrigatórios.')
        }

        await UserController.findUser(autorId)

        const taskValue = await this.findTask(id)

        taskValue.titulo = titulo
        taskValue.conteudo = conteudo
        taskValue.autorId = autorId
        taskValue.save()

        return taskValue
    }

    async delete(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório.')
        }
        const taskValue = await this.findTask(id)
        taskValue.destroy()

        return
    }

    async find() {
        return task.findAll()
    }
} 

module.exports = new taksController()