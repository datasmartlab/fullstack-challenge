import { Request, Response } from 'express';
import { Product } from '../../models/Product';

export const List = async (req: Request, res: Response) => {
    try {
        const results = await Product.findAll();

        res.json(results);
    } catch (error) {
        console.log(error);
    }
};
