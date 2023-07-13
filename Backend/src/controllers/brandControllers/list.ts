import { Request, Response } from 'express';
import { Brand } from '../../models/brand';
import { Op } from 'sequelize';

interface Filter {
    name?: string;
}

export const ListBrand = async (req: Request, res: Response) => {
    try {
        const filter: Filter = req.query.filter as unknown as Filter;

        let whereData = {};

        if (filter) {
            whereData = { name: { [Op.like]: `${filter}%` } };
        }
        const results = await Brand.findAndCountAll({ where: whereData });

        return res.json({ data: results.rows, count: results.count });
    } catch (error) {
        res.status(500).json(error);
    }
};
