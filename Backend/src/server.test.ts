import supertest from 'supertest';
import { server } from './server';

const request = supertest(server);

it('Gets / endpoint', async () => {
    const response = await request.get('/');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Hello World!!');
});