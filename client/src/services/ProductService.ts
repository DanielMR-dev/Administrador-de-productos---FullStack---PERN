import { safeParse, number, parse, string, transform, pipe, boolean } from "valibot";
import axios from "axios";
import { DraftProductSchema, ProductsSchema, Product, ProductSchema } from "../types";
import { toBoolean } from "../utils";

type ProductData = {
    [k: string] : FormDataEntryValue;
};

export async function addProduct(data : ProductData) {
    try {
        const result = safeParse(DraftProductSchema, {
            name : data.name,
            price : +data.price
        });
        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`;
            await axios.post(url, {
                name : result.output.name,
                price : result.output.price
            });
        } else {
            throw new Error('Datos no válidos');
        }
    } catch (error) {
        console.log(error);
    }
};

export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`;        
        const { data } = await axios(url);
        // console.log(data);
        const result = safeParse(ProductsSchema, data.data);
        // console.log(result);
        if(result.success) {
            return result.output;
        } else {
            throw new Error('Hubo un error...');   
        }
    } catch (error) {
        console.log(error);
    };
};

export async function getProductById(id : Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;        
        const { data } = await axios(url);
        // console.log(data);
        const result = safeParse(ProductSchema, data.data);
        // console.log(result);
        if(result.success) {
            return result.output;
        } else {
            throw new Error('Hubo un error...');   
        }
    } catch (error) {
        console.log(error);
    }
}

export async function updateProduct(data : ProductData, id : Product['id']) {
    try {
        const NumberSchema = pipe(string(), transform(Number), number());

        const result = safeParse(ProductSchema, {
            id,
            name : data.name,
            price : parse(NumberSchema, data.price),
            availability : toBoolean(data.availability.toString())
        });

        if(result.success) {
            
        }
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}