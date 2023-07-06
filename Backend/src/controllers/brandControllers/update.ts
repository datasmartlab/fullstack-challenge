import { Request, Response } from 'express';
import { Brand } from '../../models/brand';

export const UpdateBrand = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);

        const result = await Brand.findOne({ where: { id } });
        if (!result) {
            return res
                .status(404)
                .json(`A marca com o ID ${id} não foi encontrado`);
        }

        const name = req.body.name;

        const { count } = await Brand.findAndCountAll({ where: { name } });

        if (count === 1) {
            return res.json({
                message: `Ja existe uma marca com o nome ${name}`,
            });
        }

        await result.update(req.body);
        res.json({ message: 'A marca foi alterado com sucesso' });
    } catch (error) {
        res.status(500).json(error);
    }
};
