import { Request, Response } from 'express';
import { Product } from '../../models/product';
import { Op } from 'sequelize';

interface Filter {
    name: string;
    price?: number;
}

export const ListProduct = async (req: Request, res: Response) => {
    try {
        const filter: Filter = req.query.filter as unknown as Filter;
        const limit = parseInt(req.query.limit as string);
        const offset = parseInt(req.query.offset as string);

        //caso não tenha nenhum filtro
        if (!filter) {
            const results = await Product.findAndCountAll({
                offset,
                limit,
            });
            return res.json({ data: results.rows, count: results.count });
        }

        let whereData = {};

        if (filter.name) {
            whereData = { name: { [Op.like]: `${filter.name}%` } };
        }
        if (filter.price) {
            whereData = { price: filter.price };
        }
        if (filter.name && filter.price) {
            whereData = {
                name: { [Op.like]: `${filter.name}%` },
                price: filter.price,
            };
        }
        const results = await Product.findAndCountAll({
            offset,
            limit,
            where: whereData,
        });
        return res.json({ data: results.rows, count: results.count });
    } catch (error) {
        res.status(500).json(error);
    }
};
