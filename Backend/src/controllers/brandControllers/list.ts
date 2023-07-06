import { Request, Response } from 'express';
import { Brand } from '../../models/brand';
import { Op } from 'sequelize';

interface Filter {
    name: string;
}

export const ListBrand = async (req: Request, res: Response) => {
    try {
        const filter: Filter = req.query.filter as unknown as Filter;
        const limit = parseInt(req.query.limit as string);
        const offset = parseInt(req.query.offset as string);

        //caso não tenha nenhum filtro
        if (!filter) {
            const results = await Brand.findAndCountAll({
                offset,
                limit,
            });
            return res.json({ data: results.rows, count: results.count });
        }
        let whereData = {};
        if (filter.name) {
            whereData = { name: { [Op.like]: `${filter.name}%` } };
        }
        const results = await Brand.findAndCountAll({
            offset,
            limit,
            where: whereData,
        });
        return res.json({ data: results.rows, count: results.count });
    } catch (error) {
        res.status(500).json(error);
    }
};
