import { Request, Response } from 'express';
import { Product } from '../../models/Product';
import { Op } from 'sequelize';

interface Filter {
    name: string;
    price?: number;
}

export const List = async (req: Request, res: Response) => {
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

        // se tiver os dois
        if (filter.name && filter.price) {
            const results = await Product.findAndCountAll({
                where: {
                    name: { [Op.like]: `${filter.name}%` },
                    price: filter.price,
                },
            });
            return res.json({ data: results.rows, count: results.count });
        }

        // caso tenha apenas o filtro do preço
        if (filter.name && !filter.price) {
            const results = await Product.findAndCountAll({
                where: {
                    name: { [Op.like]: `%${filter.name}%` },
                },
            });
            return res.json({ data: results.rows, count: results.count });
        }

        // caso tenha apenas o filtro do preço
        if (filter.price && !filter.name) {
            const results = await Product.findAndCountAll({
                where: {
                    price: filter.price,
                },
            });
            return res.json({ data: results.rows, count: results.count });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};
