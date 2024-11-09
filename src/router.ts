import { Router } from "express";
import { body, param } from "express-validator";
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router();
/** 
* @swagger
* components: 
*       schemas:
*           Product:
*               type: object
*               properties:
*                   id:
*                       type: integer
*                       description: The Product ID
*                       example: 1
*                   name:
*                       type: string
*                       description: The Product Name
*                       example: Monitor Curvo de 49 Pulgadas
*                   price:
*                       type: number
*                       description: The Product Price
*                       example: 300
*                   availability:
*                       type: boolean
*                       description: The Product Availability
*                       example: true               
*/


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
    param('id').isInt().withMessage('ID no válido'),
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

router.patch('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    updateAvailability
);

router.delete('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    deleteProduct
);

export default router;