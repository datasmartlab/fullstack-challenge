import { Request, Response } from 'express';
import { Brand } from '../../models/brand';
import { Op } from 'sequelize';

interface Filter {
    name: string;
}

export const ListBrand = async (req: Request, res: Response) => {
    try {
        const filter: Filter = req.query.filter as unknown as Filter;

        let where = {};

        if (filter) {
            where = { name: { [Op.like]: `${filter}%` } };
        }
        const results = await Brand.findAll({ where });

        return res.json(results);
    } catch (error) {
        res.status(500).json(error);
    }
};
