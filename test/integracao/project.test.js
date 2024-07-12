
const { describe, expect, it } = require('@jest/globals');
const request = require('supertest');
const app = require('../../src/server');
const sequelize = require('../../src/config/database');
const Project = require('../../src/model/project');
const User = require('../../src/model/user');

describe('Teste de Integração do Projeto', () => {
    let transaction;

    beforeAll(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
    });

    beforeEach(async () => {
        transaction = await sequelize.transaction();
        await createUser({ id: 1, nome: 'Joao da Silva' }, { transaction });
    });

    afterEach(async () => {
        await transaction.rollback();
    });

    it('Criar projeto', async () => {
        const mockProject = {
            nome: 'Primeiro Projeto',
            descricao: 'Alinhar prioridade de serviços',
            autorID: 1
        };

        const response = await request(app).post('/api/v1/project/').send(mockProject).expect(201);
        expect(response.body.nome).toBe(mockProject.nome);
        expect(response.body.descricao).toBe(mockProject.descricao);
        expect(response.body.autorID).toBe(mockProject.autorID);
    });

    it('Alterar projeto', async () => {
        const mockProject = {
            nome: 'Alinhamento de serviços',
            descricao: 'Prioridades do cronograma de serviço',
            autorID: 1
        };

        const new_project = await createProject(mockProject, { transaction });
        const projectId = new_project.id;

        const updateProject = {
            nome: 'Alinhamento de serviços iniciais',
            descricao: 'Prioridades do cronograma de serviço inicial',
        };

        const response = await request(app).put(`/api/v1/project/${projectId}`).send(updateProject).expect(200);

        expect(response.body.id).toEqual(projectId);
        expect(response.body.nome).toEqual(updateProject.nome);
        expect(response.body.descricao).toEqual(updateProject.descricao);
    });

    it('Deletar projeto', async () => {
        const mockProject = {
            nome: 'Primeiro Projeto',
            descricao: 'Alinhar prioridade de serviços',
            autorID: 1
        };

        const new_project = await createProject(mockProject, { transaction });
        const projectId = new_project.id;

        await request(app).delete(`/api/v1/project/${projectId}`).expect(200);
    });
});
