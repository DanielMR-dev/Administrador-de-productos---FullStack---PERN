import request from 'supertest';
import server from '../../server';

describe('POST /api/products', () => {
    test('should display validation errors', async () => {
        const response = await request(server).post('/api/products').send({});
        // Lo que se espera
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(4);

        // Lo que NO se espera
        expect(response.status).not.toBe(404);
        expect(response.body.errors).toHaveLength(2);   
    });

    test('should create a new product', async () => {
        const response = await request(server).post('/api/products').send({
            name : "Mouse - Testing",
            price : 50
        });

        // Lo que se espera
        expect(response.status).toEqual(201);
        expect(response.body).toHaveProperty('data');

        // Lo que NO se espera
        expect(response.status).not.toBe(200);
        expect(response.status).not.toBe(400);
        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty('errors');
    });
});