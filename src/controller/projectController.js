const project = require('../model/project')
const UserController = require('./userController')

class projectController {
    async createProject(titulo, conteudo, autorId) {
        if (titulo === undefined || conteudo === undefined || autorId === undefined) {
            throw new Error('Título, conteúdo e autorId são obrigatórios.')
        }

        await UserController.findUser(Number(autorId))

        const projectValue = await project.create({
            titulo,
            conteudo,
            autorId
        })

        return projectValue
    }

    async findProject(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório.')
        }

        const projectValue = await project.findByPk(id)
        
        if (!projectValue) {
            throw new Error('Projeto não encontrada.')
        }

        return projectValue
    }

    async update(id, titulo, conteudo, autorId) {
        if (id === undefined || titulo === undefined || conteudo === undefined || autorId === undefined) {
            throw new Error('Título, conteúdo e autorId são obrigatórios.')
        }

        await UserController.findUser(autorId)

        const projectValue = await this.findProject(id)

        projectValue.titulo = titulo
        projectValue.conteudo = conteudo
        projectValue.autorId = autorId
        projectValue.save()

        return projectValue
    }

    async delete(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório.')
        }
        const projectValue = await this.findProject(id)
        projectValue.destroy()

        return
    }

    async find() {
        return project.findAll()
    }
} 

module.exports = new projectController()