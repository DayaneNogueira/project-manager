const TaskController = require('../controller/task')

class TaskApi {
    async createTask(req, res) {
        const { titulo, conteudo, autorID } = req.body

        try {
            const task = await TaskController.createTask(titulo, conteudo, autorId)
            return res.status(201).send(task)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao criar projeto ${e.message}`})
        }
    }

    async updateTask(req, res) {
        const { id } = req.params
        const { titulo, conteudo, autorId } = req.body

        try {
            const task = await TaskController.update(Number(id), titulo, conteudo, autorId)
            return res.status(200).send(task)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao alterar projeto ${e.message}`})
        }
    }

    async deleteTask(req, res) {
        const { id } = req.params

        try {
            await TaskController.delete(Number(id))
            return res.status(204).send()
        } catch (e) {
            return res.status(400).send({ error: `Erro ao deletar projeto ${e.message}`})
        }
    }

    async findTask(req, res) {
        try {
            const tasks = await TaskController.find()
            return res.status(200).send(tasks)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao listar projetos ${e.message}`})
        }
    }

    async statusTask(req, res) {
        try {
            const tasks = await TaskController.find()
            return res.status(200).send(tasks)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao listar projetos ${e.message}`})
        }
    }
}

module.exports = new TaskApi()