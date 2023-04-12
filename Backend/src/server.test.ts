import supertest from 'supertest';
import { server } from './server';

const request = supertest(server);

describe('server.ts', () => {

    it('should send a GET request to the path "/" and get "Hello World!!" in the message variable in return', async () => {
        const response = await request.get('/');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Hello World!!');
    });

});