const app = require('../../src/server')
const request = require('supertest')
const bcrypt = require('bcrypt');

describe('Teste de API do usuário', () => {
    let id;
    beforeAll(async () => {
        id = 1;
    });
    it('Criar usuario', async () => {
        const createUser = {
            nome: 'Teste',
            email: 'teste@teste.com',
            senha: '102030'
        }

        const response = await request(app).post('/api/v1/user/').send(user);
        console.log(response.body)
        expect(response.statusCode).toBe(201);
        expect(response.body.nome).toEqual(user.nome);
        expect(response.body.email).toEqual(user.email);
        const confirmar_senha = await bcrypt.compare(senha, response.body.senha);
        expect(confirmar_senha).toBe(true);
    })

    it('Alterar usuário', async () => {
        const updateUser = {
            nome: 'Teste2',
            email: 'teste2@teste.com',
            senha: '302010'
        }
        try {
            const response = await request(app).put(`/api/v1/user/${updateUser.id}`).send(updateUser);
            console.log(response.body);
            expect(response.statusCode).toBe(200);
            expect(response.body.id).toEqual(updateUser.id);
            expect(response.body.name).toEqual(updateUser.name);
            expect(response.body.email).toEqual(updateUser.email);
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    })
    it('Deletar usuário', async () => {
        const deleteUser = {
            id: 4
        }
        try {
            const response = await request(app).delete(`/api/v1/user/${deleteUser.id}`);
            console.log(response.body);
            expect(response.statusCode).toBe(204);
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    })
});