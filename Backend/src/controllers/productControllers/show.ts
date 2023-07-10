import { Request, Response } from 'express';
import { Product } from '../../models/product';
import { Brand } from '../../models/brand';

export const ShowProduct = async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);

        const result = await Product.findOne({
            where: { id },
            include: {
                model: Brand,
                attributes: ['name'],
            },
        });

        if (!result) {
            return res
                .status(404)
                .json({ message: 'Produto não foi encontrado' });
        }
        return res.json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};
