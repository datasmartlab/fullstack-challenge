import { Request, Response } from 'express';
import { Product } from '../../models/Product';

export const Show = async (req: Request, res: Response) => {
    try {
        const ID: number = parseInt(req.params.id);

        const result = await Product.findOne({ where: { id: ID } });
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
