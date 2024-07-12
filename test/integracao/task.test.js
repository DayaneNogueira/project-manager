const { describe, expect, it } = require('@jest/globals');
const request = require('supertest');
const sequelize = require('../../src//config/database');
const Task = require('../../src/model/task');
const Project = require('../../src/model/project');

describe('Teste de Integração de Task', () => {
    let transaction;

    beforeAll(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
    });

    beforeEach(async () => {
        transaction = await sequelize.transaction();
        const mockProject = {
            titulo: 'Projeto de Teste',
            conteudo: 'Descrição do Projeto de Teste',
            userID: 1
        };
        await createTask(mockProject, { transaction });
    });

    afterEach(async () => {
        await transaction.rollback();
    });

    it('Criar tarefa', async () => {
        const newTask = {
            titulo: 'Projeto de Teste Inicial',
            conteudo: 'Alinhamento de testes iniciais',
            projectID: 1
        };
        
        const response = await request(app).post('/api/v1/task/').send(newTask).set('transaction', transaction).expect(201);

        expect(response.body.titulo).toBe(newTask.titulo);
        expect(response.body.conteudo).toBe(newTask.conteudo);
        expect(response.body.projectID).toBe(newTask.projectID);
    });

    it('Alterar tarefa', async () => {
        const mockTask = {
            titulo: 'Projeto de Teste Inicial',
            conteudo: 'Alinhamento de testes iniciais',
            projectID: 1
        };

        const newTask = await createTask(mockTask, { transaction });
        const taskId = newTask.id;

        const updateTask = {
            id: taskId,
            titulo: 'Projeto de Teste inicial',
            conteudo: 'Alinhamento de testes iniciais',
            status: 'Finalizado'
        };

        const response = await request(app).put(`/api/v1/task/${updateTask.id}`).send(updateTask).set('transaction', transaction).expect(200);

        expect(response.body.id).toEqual(updateTask.id);
        expect(response.body.titulo).toEqual(updateTask.titulo);
        expect(response.body.conteudo).toEqual(updateTask.conteudo);
        expect(response.body.status).toBe(updateTask.status);
    });

    it('Deletar tarefa', async () => {
        const mockTask = {
            titulo: 'Projeto de Teste Inicial',
            conteudo: 'Alinhamento de testes iniciais',
            projectID: 1
        };

        const newTask = await createTask(mockTask, { transaction });
        const taskId = newTask.id;

        await request(app).delete(`/api/v1/task/${taskId}`).set('transaction', transaction).expect(200);
    });
});