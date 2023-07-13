import { Request, Response } from 'express';
import { Product } from '../../models/product';

export const CreateProduct = async (req: Request, res: Response) => {
    try {
        const product = Product.build({
            name: req.body.name,
            price: parseFloat(req.body.price),
            description: req.body.description || '',
            brandId: req.body.brandId || null,
        });

        product.save();

        res.status(201).json({
            message: 'O produto foi cadastrado com sucesso',
        });
    } catch (error) {
        res.status(500).json(error);
    }
};
