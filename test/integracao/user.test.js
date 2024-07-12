const { describe, expect, it, beforeAll, afterAll, beforeEach, afterEach } = require('@jest/globals');
const { sequelize } = require('../../src/model/user');
const request = require("supertest");
const bcrypt = require('bcrypt')

describe('Teste de integração do usuario', () => {
    let transaction;

    // Executado antes de TODOS os testes
    beforeAll(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
        console.info('Iniciando TDD com jest!');
    });

    beforeEach(async () => {
        transaction = await sequelize.transaction();
    });

    // Executado após TODOS os testes
    afterAll(() => {
        console.info('Encerrados os testes');
    });

    afterEach(async () => {
        await transaction.rollback();
    });

    it('Adicionar usuario', async () => {
        const dadosTest = {
            nome: 'Teste',
            email: 'teste@teste.com',
            senha: '102030'
        }
        const { usuario } = await request(app).post('/api/v1/user/').send(mockUsuario, dadosTest).set('transaction', transaction);
        expect(mockUsuario.nome).toBe(dadosTest.nome)
        expect(mockUsuario.email).toBe(dadosTest.email)
        expect(mockUsuario.senha).toBe(dadosTest.senha)
        expect(usuario.statusCode).toBe(201);
    });

    it('Alterar usuario', async () => {
        const dadosTest = {
            nome: 'Teste1',
            email: 'teste1@teste.com',
            senha: '302010'
        }
        const { usuario } = await request(app).post('/api/v1/user/').send(mockUsuario, dadosTest).set('transaction', transaction);
        const autorID = usuario.body.id;

        const updateUser = {
            id: autorID,
            name: 'Teste18', 
            email: 'Teste18@gmail.com'
        };

        const response = await request(app).put(`/api/v1/user/${updateUser.id}`).send(updateUser).set('transaction', transaction);
        expect(mockUsuario.nome).toBe(updateUser.nome)
        expect(mockUsuario.email).toBe(updateUser.email)
        expect(mockUsuario.senha).toBe(updateUser.senha)
        expect(usuario.statusCode).toBe(201);
    });

    it('Deletar usuario', async () => {
        const dadosTest = {
            nome: 'Teste1',
            email: 'teste1@teste.com',
            senha: '302010'
        }
        
        const { id } = await request(app).post('/api/v1/user/').send(mockUsuario, dadosTest).set('transaction', transaction);
        const autorId = usuario.body.id;
        expect(mockUsuario).toBe(1);
        expect(usuario.statusCode).toBe(204);
        const response = await request(app).deleteUser(`/api/v1/user/${autorId}`).set('transaction', transaction);
    });
});