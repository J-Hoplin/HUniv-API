const request = require('supertest');
const app = require('../../../app');
const Code = require('../../../Code');

const mockUser2 = {
    nickname: 'mockuser2',
    password: 'mockpassword2',
    role: 'user',
    email: 'mockemail2@mail.com',
};
const mockUser2Info = {
    id: '',
    token: '',
    apiKey: '',
};

const TokenFormat = (token) => `Bearer ${token}`;

describe('Notice API check', () => {
    test('Enroll mockuser2', async () => {
        const response = await request(app)
            .post('/api/v1/auth/join')
            .set('Accept', 'application/json')
            .type('application/json')
            .send(mockUser2);
        mockUser2Info.id = response.body.data.id;
        expect(mockUser2Info.id).not.toBeUndefined();
        expect(response.status).toBe(Code.OK.httpCode);
        expect(response.body).toEqual(Code.messageWithData(Code.OK, {
            id: mockUser2Info.id,
        }));
    });

    test('User login : Correct password', async () => {
        const response = await request(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
            .type('application/json')
            .send(mockUser2);
        expect(response.status).toBe(Code.OK.httpCode);
        expect(response.body.token).not.toBeUndefined();
        mockUser2Info.token = TokenFormat(response.body.token);
    });

    test('Issue new API Key', async () => {
        const response = await request(app)
            .get('/api/v1/api-token/issue')
            .set('Authorization', mockUser2Info.token);
        expect(response.status).toBe(Code.OK.httpCode);
        expect(response.body.token).not.toBeUndefined();
        mockUser2Info.apiKey = response.body.token;
    });

    test('Test /api/v1/notice/{type} normal request', async () => {
        const response = await request(app)
            .get('/api/v1/notice/normal')
            .set('hkey', mockUser2Info.apiKey);
        expect(response.body.code).toEqual(Code.OK.apiCode);
        expect(response.statusCode).toEqual(Code.OK.httpCode);
    });
    test('Test /api/v1/notice/{type} abnormal request', async () => {
        const response = await request(app)
            .get('/api/v1/notice/abnormal')
            .set('hkey', mockUser2Info.apiKey);
        // Joi validation Error
        expect(response.body.code).toEqual(1400);
        expect(response.status).toBe(400);
    });
    test('Test /api/v1/notice/{type}/{number} normal request', async () => {
        const response = await request(app)
            .get('/api/v1/notice/normal/1000')
            .set('hkey', mockUser2Info.apiKey);
        expect(response.body.code).toEqual(Code.OK.apiCode);
        expect(response.statusCode).toEqual(Code.OK.httpCode);
    });
    test('Test /api/v1/notice/{type}/{number} abnormal request', async () => {
        const response = await request(app)
            .get('/api/v1/notice/normal/100000')
            .set('hkey', mockUser2Info.apiKey);
        expect(response.body.code).toEqual(Code.NOTICE_UNABLE_TO_FIND.apiCode);
        expect(response.statusCode).toEqual(Code.NOTICE_UNABLE_TO_FIND.httpCode);
    });

    test('User withdraw', async () => {
        const response = await request(app)
            .delete('/api/v1/auth/withdraw')
            .set('Accept', 'application/json')
            .set('Authorization', mockUser2Info.token)
            .type('application/json')
            .send(mockUser2);
        expect(response.status).toBe(Code.OK.httpCode);
    });
});
