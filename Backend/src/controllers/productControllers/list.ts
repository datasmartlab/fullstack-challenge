import { Request, Response } from 'express';
import { Product } from '../../models/Product';

export const List = async (req: Request, res: Response) => {
    try {
        const limit = parseInt(req.query.limit as string);
        const offset = parseInt(req.query.offset as string);
        const results = await Product.findAll({ offset, limit });
        const count = await Product.count();
        res.json({ data: results, count: count });
    } catch (error) {
        res.status(500).json(error);
    }
};
