import { Request, Response } from 'express';
import { Product } from '../../models/product';
import locales from '../../translate/locales/locales';

export const CreateProduct = async (req: Request, res: Response) => {
    try {
        const language = req.query.language as 'pt' | 'en';
        const messages = locales[language].message;

        const product = Product.build({
            name: req.body.name,
            price: parseFloat(req.body.price),
            description: req.body.description || '',
            brandId: req.body.brandId || null,
        });

        product.save();

        res.status(201).json({
            message: messages.createProduct201,
            data: product
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
