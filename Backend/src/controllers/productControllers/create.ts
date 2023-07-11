import { Request, Response } from 'express';
import { Product } from '../../models/product';
import { ProductSchema } from '../../validations/product';

interface ProductData {
    name: string;
    price: number;
    description?: string;
    brandId?: number;
}

export const CreateProduct = async (req: Request, res: Response) => {
    try {
        const productData: ProductData = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            brandId: req.body.brandId,
        };
        await ProductSchema.validate(productData);

        const product = Product.build({
            name: productData.name,
            price: productData.price,
            description: productData.description || '',
            brandId: productData.brandId || null,
        });

        product.save();

        res.status(201).json({
            message: 'O produto foi cadastrado com sucesso',
        });
    } catch (error) {
        res.status(500).json(error);
    }
};
