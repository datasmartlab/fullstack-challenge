import { Request, Response } from 'express';
import { Product } from '../../models/Product';
import { Op } from 'sequelize';

export const List = async (req: Request, res: Response) => {
    try {
        const filter = req.query.filter as string;
        const limit = parseInt(req.query.limit as string);
        const offset = parseInt(req.query.offset as string);

        let results: any;
        if (filter) {
            results = await Product.findAll({
                where: { name: { [Op.like]: `${filter}%` } },
            });
        } else {
            results = await Product.findAll({
                offset,
                limit,
            });
        }
        const count = await Product.count({
            where: { name: { [Op.like]: `${filter}%` } },
        });
        res.json({ data: results, count: count });
    } catch (error) {
        res.status(500).json(error);
    }
};
