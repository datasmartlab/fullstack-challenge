import { Request, Response } from 'express';
import { Product } from '../../models/product';
import { ProductSchema } from '../../validations/product';

interface productData {
    id?: number;
    name: string;
    description?: string;
    brandId: number;
    price: number;
}

export const CreateProduct = async (req: Request, res: Response) => {
    try {
        const productData: productData = {
            name: req.body.name,
            brandId: req.body.brandId,
            description: req.body.description,
            price: req.body.price,
        };
        await ProductSchema.validate(productData);

        const product = Product.build({
            name: productData.name,
            description: productData.description || '',
            price: productData.price,
            brandId: productData.brandId,
        });

        product.save();

        res.status(201).json({
            message: 'O produto foi cadastrado com sucesso',
        });
    } catch (error) {
        res.status(500).json(error);
    }
};
