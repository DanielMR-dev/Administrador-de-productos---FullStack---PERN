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
        expect(response.body.errors).not.toHaveLength(2);   
    });

    test('should validate that the price is greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name : "Monitor Curvo",
            price : 0
        });
        // Lo que se espera
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);

        // Lo que NO se espera
        expect(response.status).not.toBe(404);
        expect(response.body.errors).not.toHaveLength(2);   
    });

    test('should validate that the price is a number and is greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name : "Monitor Curvo",
            price : "Hola"
        });
        // Lo que se espera
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(2);

        // Lo que NO se espera
        expect(response.status).not.toBe(404);
        expect(response.body.errors).not.toHaveLength(4);   
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

describe('GET /api/products', () => {
    test('should check if api/products URL exist', async () => {
        const response = await request(server).get('/api/products');
        expect(response.status).not.toBe(404);
    });
    test('GET a JSON response with products', async () => {
        const response = await request(server).get('/api/products');
        expect(response.status).toBe(200);
        expect(response.header['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveLength(1);

        // Lo que NO esperamos
        expect(response.body).not.toHaveProperty('errors');
    });
});
