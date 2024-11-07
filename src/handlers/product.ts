import { Request, Response } from "express";
import Product from "../models/Product.model";

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            order: [
                ['price', 'DESC']
            ],
            attributes: {exclude: ['createdAt', 'updatedAt', 'availability']}
        });
        res.json({data: products});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if(!product) {
            res.status(404).json({
                error: 'Producto No Encontrado'
            });
            return;
        };

        res.json({data: product});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const createProduct = async (req : Request, res : Response) => {
    // Forma 1
    // const product = new Product(req.body);
    // const savedProduct = await product.save();

    // Forma 2 
    // const product = await Product.create(req.body);
    // res.json({data: product});

    try {
        const product = await Product.create(req.body);
        res.status(201).json({ data: product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const updateProduct = async (req : Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if(!product) {
            res.status(404).json({
                error: 'Producto No Encontrado'
            });
            return;
        };

        // Actualizar
        await product.update(req.body); // Producto actualizado
        await product.save(); // Producto guardado

        res.json({data: product});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
    
};
export const updateAvailability = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
    
        if(!product) {
            res.status(404).json({
                error: 'Producto No Encontrado'
            });
            return;
        };
    
        // Actualizar
        product.availability = !product.dataValues.availability;
        await product.save(); // Producto guardado
    
        res.json({data: product});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if(!product) {
            res.status(404).json({
                error: 'Producto No Encontrado'
            });
            return;
        };

        // Eliminar
        await product.destroy();
        res.json({data: 'Producto Eliminado'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};