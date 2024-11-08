import request from "supertest";
import server, { connectDB }  from "../server";
import db from "../config/db";

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

jest.mock('../config/db'); // Creamos el mock para simular la conexión a la DB

describe('connectDB', () => {
    test('should handle database connection error', async () => {
        jest.spyOn(db, 'authenticate') // Se crea un "espía" que va a esperar que se ejecute db.authenticate
            .mockRejectedValueOnce(new Error('Hubo un error al conectar a la DB')); // Se fuerza el catch o la exepción
        const consoleSpy = jest.spyOn(console, 'log'); // Se crea otro "espía" esperando una respuesta en consola

        await connectDB();

        expect(consoleSpy).toHaveBeenCalledWith( // Se espera que el "espía" de la consola contenga un string con el texto especificado
            expect.stringContaining('Hubo un error al conectar a la DB')
        );
    });
});