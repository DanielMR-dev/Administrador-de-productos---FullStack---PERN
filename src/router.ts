import { Router } from "express";
import { body, param } from "express-validator";
import { createProduct, getProductById, getProducts, updateProduct } from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router();

// Routing
router.get('/', getProducts);
router.get('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    getProductById
);

router.post('/', 
    // Validacion
    body('name')
        .notEmpty().withMessage('El nombre de producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio de producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no válido'),
    handleInputErrors,
    createProduct
);

router.put('/:id', 
    // Validacion
    body('name')
        .notEmpty().withMessage('El nombre de producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio de producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no válido'),
    body('availability')
        .isBoolean().withMessage('Valor para disponibilidad no válido'),
    handleInputErrors,
    updateProduct
);

router.patch('/', (req, res) => {

    res.json('Desde PATCH');
});

router.delete('/', (req, res) => {

    res.json('Desde DELETE');
});

export default router;