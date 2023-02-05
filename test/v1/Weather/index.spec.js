const request = require('supertest');
const app = require('../../../app');
const Codes = require('../../../Code');

const mockUser3 = {
    nickname: 'mockuser3',
    password: 'mockpassword3',
    role: 'user',
    email: 'mockemail3@mail.com',
};
const mockUser3Info = {
    id: '',
    token: '',
};

const TokenFormat = (token) => `Bearer ${token}`;

describe('Weather API test', () => {
    test('Enroll mockuser1', async () => {
        const response = await request(app)
            .post('/api/v1/auth/join')
            .set('Accept', 'application/json')
            .type('application/json')
            .send(mockUser3);
        mockUser3Info.id = response.body.data.id;
        expect(mockUser3Info.id).not.toBeUndefined();
        expect(response.status).toBe(Codes.OK.httpCode);
        expect(response.body).toEqual(Codes.messageWithData(Codes.OK, {
            id: mockUser3Info.id,
        }));
    });
    test('User login : Correct password', async () => {
        const response = await request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .type('application/json')
            .send(mockUser3);
        mockUser3Info.token = TokenFormat(response.body.token);
        expect(response.status).toBe(Codes.OK.httpCode);
        expect(response.body.token).not.toBeUndefined();
    });
    test('1. Request about unsupported campus', async () => {
        const wrongtype = 'unsupported';
        const response = await request(app)
            .get(`/api/v1/weather/${wrongtype}`)
            .set('Authorization', mockUser3Info.token);
        expect(response.status).toBe(400);
        expect(response.body.code).toBe(1400);
    });

    test('2. Request to supported campus', async () => {
        const supportedtype = 'sejongcampus';
        const response = await request(app)
            .get(`/api/v1/weather/${supportedtype}`)
            .set('Authorization', mockUser3Info.token);
        expect(response.status).toBe(Codes.OK.httpCode);
        expect(response.body.msg).toBe(Codes.OK.msg);
    });
    test('User withdraw', async () => {
        const response = await request(app)
            .delete('/api/v1/auth/withdraw')
            .set('Accept', 'application/json')
            .set('Authorization', mockUser3Info.token)
            .type('application/json')
            .send(mockUser3);
        expect(response.status).toBe(Codes.OK.httpCode);
    });
});
