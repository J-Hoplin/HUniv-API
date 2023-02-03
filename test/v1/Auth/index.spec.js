const request = require('supertest');
const app = require('../../../app');
const Code = require('../../../Code');

/**
 * If test code not working
 * -> Check if database has user with nickname 'mockuser1'
 */

const mockUser1 = {
    nickname: 'mockuser1',
    password: 'mockpassword1',
    email: 'mockemail1@mail.com',
};
const mockUser1Info = {
    id: '',
    token: '',
};

const TokenFormat = (token) => `Bearer ${token}`;

describe('Auth API check', () => {
    test('1. Enroll mockuser1', async () => {
        const response = await request(app)
            .post('/api/v1/auth/join')
            .set('Accept', 'application/json')
            .type('application/json')
            .send(mockUser1);
        mockUser1Info.id = response.body.data.id;
        expect(mockUser1Info.id).not.toBeUndefined();
        expect(response.status).toBe(Code.OK.httpCode);
        expect(response.body).toEqual(Code.messageWithData(Code.OK, {
            id: mockUser1Info.id,
        }));
    });

    test('2. User try to enroll with existing nickname', async () => {
        const fake = mockUser1;
        const response = await request(app)
            .post('/api/v1/auth/join')
            .set('Accept', 'application/json')
            .type('application/json')
            .send(fake);
        expect(response.status).toBe(400);
        expect(response.body.code).toBe(1202);
    });

    test('3. Check if email already in used', async () => {
        const response = await request(app)
            .post('/api/v1/auth/check-email')
            .set('Accept', 'application/json')
            .type('application/json')
            .send({ email: mockUser1.email });
        expect(response.status).toBe(400);
        expect(response.body.code).toBe(1200);
    });

    test('4. Check if nickname already in used', async () => {
        const response = await request(app)
            .post('/api/v1/auth/check-nickname')
            .set('Accept', 'application/json')
            .type('application/json')
            .send({ nickname: mockUser1.nickname });
        expect(response.status).toBe(400);
        expect(response.body.code).toBe(1201);
    });

    test('5. User login : incorrect password', async () => {
        const fake = {
            nickname: mockUser1.nickname,
            password: 'wrong password',
        };
        const response = await request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .type('application/json')
            .send(fake);
        expect(response.status).toBe(401);
        expect(response.body.code).toBe(1203);
    });
    test('6. User login : Correct password', async () => {
        const response = await request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .type('application/json')
            .send(mockUser1);
        mockUser1Info.token = TokenFormat(response.body.token);
        expect(response.status).toBe(Code.OK.httpCode);
        expect(response.body.token).not.toBeUndefined();
    });
    test('7. Token refresh', async () => {
        const response = await request(app)
            .post('/api/v1/auth/refresh')
            .set('Accept', 'application/json')
            .set('Authorization', mockUser1Info.token)
            .type('application/json')
            .send(mockUser1);
        mockUser1Info.token = TokenFormat(response.body.token);
        expect(response.status).toBe(Code.OK.httpCode);
        expect(response.body.token).not.toBeUndefined();
    });
    test('8. User withdraw', async () => {
        const response = await request(app)
            .delete('/api/v1/auth/withdraw')
            .set('Accept', 'application/json')
            .set('Authorization', mockUser1Info.token)
            .type('application/json')
            .send(mockUser1);
        expect(response.status).toBe(Code.OK.httpCode);
    });
});
