import { Request, Response } from 'express';
import { Brand } from '../../models/brand';

export const ShowBrand = async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);

        const result = await Brand.findOne({ where: { id } });
        if (!result) {
            return res
                .status(404)
                .json({ message: 'A marca não foi encontrado' });
        }
        return res.json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};
