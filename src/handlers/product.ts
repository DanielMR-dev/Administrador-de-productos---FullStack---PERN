import { Request, Response } from "express";
import Product from "../models/Product.model";

export const getProducts = async (req: Request, res: Response) => {

    try {
        const products = await Product.findAll({
            order: [
                ['price', 'DESC']
            ],
            attributes: {exclude: ['createdAt', 'updatedAt', 'availability']}
        })
        res.json({data: products});
    } catch (error) {
        console.log(error);
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
        res.json({data: product});
    } catch (error) {
        console.log(error);
    }
};