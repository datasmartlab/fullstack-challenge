import { Request, Response } from 'express';
import { Product } from '../../models/product';
import { Op } from 'sequelize';
interface Filter {
    name?: string;
    price?: string;
}

export const ListProduct = async (req: Request, res: Response) => {
    try {
        const filter: Filter = (req.query.filter as Filter) || null;
        const limit = parseInt(req.query.limit as string);
        const language = req.query.translate;
        const offset = parseInt(req.query.offset as string);
        let where: { [Op.and]: any[] } = {
            [Op.and]: [],
        };
        if (filter) {
            if (filter.name) {
                where[Op.and].push({ name: { [Op.like]: `${filter.name}%` } });
            }
            if (filter.price) {
                where[Op.and].push({
                    price: filter.price,
                });
            }
        }
        const results = await Product.findAndCountAll({
            offset,
            limit,
            where,
            include: {
                association: 'brandData',
                attributes: ['name', 'id'],
            },
        });
        return res.json({ data: results.rows, count: results.count });
    } catch (error) {
        res.status(500).json(error);
    }
};
