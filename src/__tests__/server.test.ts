import { connectDB }  from "../server";
import db from "../config/db";


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