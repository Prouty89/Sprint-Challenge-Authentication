const request = require('supertest');
const authRouter = require('./auth-router');
const db = require('../database/dbConfig.js');
const Users = require('./auth-model.js');

describe('register', () => {
    describe('register status', () => {
        it('returns 201 created', () => {
            return request(authRouter)
                .post('/register')
                .send({
                    username: 'test',
                    password: 'test'
                })
                .set('Accept', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkJsYWtlIiwiaWQiOjEsImlhdCI6MTU2ODk5NjMzMCwiZXhwIjoxNTY5MDgyNzMwfQ.QGrUh-7gspUcrINLnAWJlwfmg-FawWHoFHqBX04FOP4')
                .then(res => {
                    expect(res.status).toBe(201);
                })
        })
    })
    describe('length of db', () => {
        it('should insert user into db', async () => {
            await Users.add({ username: "test", password: "test" })
            const users = await db('users');
            expect(users).toHaveLength(1)
        })
    })
})
describe('login', () => {
    describe('check name', () => {
        it('name should match', async () => {
            let user = await Users.getByFilter({ username: 'Blake', password: 'Test' })
            expect(user.username).toBe('Blake')
        })
    })
    describe('login status', () => {
        it('returns 200', () => {
            return request(authRouter)
                .post('/login')
                .send({
                    username: 'Blake',
                    password: 'Test'
                })
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })
    })
})