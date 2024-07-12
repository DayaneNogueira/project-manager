const request = require('supertest');
const app = require('../../src/model'); 

describe('Teste de API da Task', () => {
    it('Criar tarefa', async () => {
        const createTask = {
            titulo: 'Primeiro Teste',
            conteudo: 'Validar cenários',
            projetoID: 1
        }
        const response = await request(app).post('/api/v1/task/').send(createTask).expect(201);
        expect(response.body.titulo).toBe(createTask.titulo);
        expect(response.body.conteudo).toBe(createTask.conteudo);
        expect(response.body.projetoID).toBe(createTask.projetoID);
    });

    it('Alterar tarefas', async () => {
        const updateTask = {
            id: 1,
            titulo: 'Primeiro Test',
            conteudo: 'Validar cenários',
            status: 'Finalizado'
        }
        try {
            const response = await request(app).put(`/api/v1/task/${updateTask.id}`).send(updateTask);
            console.log(response.body); 
            expect(response.statusCode).toBe(200);
            expect(response.body.id).toEqual(updateTask.id);
            expect(response.body.titulo).toEqual(updateTask.titulo); 
            expect(response.body.conteudo).toEqual(updateTask.conteudo);;
            expect(response.body.status).toBe(updateTask.status);
        } catch (error) {
            console.error('Error:', error); 
            throw error; 
        }
    });  

    it('Deletar tarefas', async () => {
        const deleteTask = {
            id: 1
        }
        try {
            const response = await request(app).delete(`/api/v1/task/${deleteTask.id}`);
            console.log(response.body);
            expect(response.statusCode).toBe(200);
        } catch (error) {
            console.error('Error:', error); 
            throw error; 
        }
    });     
});