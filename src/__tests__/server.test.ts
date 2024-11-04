import request from "supertest";
import server  from "../server";

describe('GET /api', () => {
    test('should send back a JSON response', async () => {
        const res = await request(server).get('/api');

        // Lo que se espera
        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body.msg).toBe('Desde API');

        // Lo que NO se espera
        expect(res.status).not.toBe(404);
        expect(res.body.msg).not.toBe('desde api');
    });
});
