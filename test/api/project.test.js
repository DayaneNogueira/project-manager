const request = require('supertest');
const app = require('../../src/model');

describe('Teste de API de Projeto', () => {
    it('Criar projeto', async () => {
        const createProject = {
            nome: 'Primeiro Projeto',
            descricao: 'Alinhar prioridade de serviços',
            autorID: 1
        }
        const response = await request(app).post('/api/v1/project/').send(createProject).expect(201);
        expect(response.body.nome).toBe(createProject.nome);
        expect(response.body.descricao).toBe(createProject.descricao);
        expect(response.body.autorID).toBe(createProject.autorID);
    });

    it('Alterar projeto', async () => {
        const updateProject = {
            id: 3,
            nome: 'Alinhamento de serviços', 
            descricao: 'Prioridades do cronograma de serviço',
        }
        try {
            const response = await request(app).put(`/api/v1/project/${updateProject.id}`).send(updateProject);
            console.log(response.body); 
            expect(response.statusCode).toBe(200);
            expect(response.body.id).toEqual(updateProject.id);
            expect(response.body.nome).toEqual(updateProject.nome); 
            expect(response.body.descricao).toEqual(updateProject.descricao);
        } catch (error) {
            console.error('Error:', error); 
            throw error; 
        }
    });  

    it('Deletar projeto', async () => {
        const deleteProject = {
            id: 1
        }
        try {
            const response = await request(app).delete(`/api/v1/project/${deleteProject.id}`);
            console.log(response.body);
            expect(response.statusCode).toBe(200);
        } catch (error) {
            console.error('Error:', error); 
            throw error; 
        }
    }); 
});