const request = require('supertest');
const app = require('../../../app');
const Code = require('../../../Code');
const {
    KeyAlreadyIssued,
    KeyNotIssuedYet,
} = require('../../../Exceptions').api.v1.APIKeyException;

const mockUser4 = {
    nickname: 'mockuser4',
    password: 'mockpassword4',
    role: 'user',
    email: 'mockemail4@mail.com',
};
const mockUser4Info = {
    id: '',
    token: '',
    apiKey: '',
};

const TokenFormat = (token) => `Bearer ${token}`;

describe('API Key test', () => {
    test('Enroll mockuser1', async () => {
        const response = await request(app)
            .post('/api/v1/auth/join')
            .set('Accept', 'application/json')
            .type('application/json')
            .send(mockUser4);
        mockUser4Info.id = response.body.data.id;
        expect(mockUser4Info.id).not.toBeUndefined();
        expect(response.status).toBe(Code.OK.httpCode);
        expect(response.body).toEqual(Code.messageWithData(Code.OK, {
            id: mockUser4Info.id,
        }));
    });

    test('Login and get Auth Token', async () => {
        const response = await request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .type('application/json')
            .send(mockUser4);
        expect(response.status).toBe(Code.OK.httpCode);
        expect(response.body.token).not.toBeUndefined();
        mockUser4Info.token = TokenFormat(response.body.token);
    });

    test('Inquire api key of user before issue token', async () => {
        const response = await request(app)
            .get('/api/v1/api-token/check-token')
            .set('Accept', 'application/json')
            .set('Authorization', mockUser4Info.token)
            .type('application/json');
        const expectException = new KeyNotIssuedYet();
        expect(response.status).toBe(expectException.code);
        expect(response.body.code).toBe(expectException.apiCode);
    });

    test('Issue new API Token', async () => {
        const response = await request(app)
            .get('/api/v1/api-token/issue')
            .set('Accept', 'application/json')
            .set('Authorization', mockUser4Info.token)
            .type('application/json');
        expect(response.status).toBe(Code.OK.httpCode);
        expect(response.body.token).not.toBeUndefined();
        mockUser4Info.apiKey = response.body.token;
    });

    test('Issue new token, after token issued', async () => {
        const response = await request(app)
            .get('/api/v1/api-token/issue')
            .set('Accept', 'application/json')
            .set('Authorization', mockUser4Info.token)
            .type('application/json');
        const expectException = new KeyAlreadyIssued();
        expect(response.status).toBe(expectException.code);
        expect(response.body.code).toBe(expectException.apiCode);
    });

    test('Inquire api key of user', async () => {
        const response = await request(app)
            .get('/api/v1/api-token/check-token')
            .set('Accept', 'application/json')
            .set('Authorization', mockUser4Info.token)
            .type('application/json');
        expect(response.status).toBe(Code.OK.httpCode);
        expect(response.body.token).toBe(mockUser4Info.apiKey);
    });

    test('Refresh API Key of user', async () => {
        const response = await request(app)
            .get('/api/v1/api-token/refresh')
            .set('Accept', 'application/json')
            .set('Authorization', mockUser4Info.token)
            .type('application/json');
        expect(response.status).toBe(Code.OK.httpCode);
        expect(response.body.token).not.toBeUndefined();
        // Renew API Key to refreshed Key
        mockUser4Info.apiKey = response.body.token;
    });

    test('Check refreshed API Key inquire properly', async () => {
        const response = await request(app)
            .get('/api/v1/api-token/check-token')
            .set('Accept', 'application/json')
            .set('Authorization', mockUser4Info.token)
            .type('application/json');
        expect(response.status).toBe(Code.OK.httpCode);
        expect(response.body.token).toBe(mockUser4Info.apiKey);
    });

    test('User withdraw', async () => {
        const response = await request(app)
            .delete('/api/v1/auth/withdraw')
            .set('Accept', 'application/json')
            .set('Authorization', mockUser4Info.token)
            .type('application/json')
            .send(mockUser4);
        expect(response.status).toBe(Code.OK.httpCode);
    });
});
