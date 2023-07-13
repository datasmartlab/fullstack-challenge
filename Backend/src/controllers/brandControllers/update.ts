import { Request, Response } from 'express';
import { Brand } from '../../models/brand';
import { Op } from 'sequelize';
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

        const brandExist = await Brand.findOne({
            where: { name, id: { [Op.not]: id } },
        });

        if (brandExist) {
            return res.status(409).json({
                message: `Já existe uma marca com o nome ${name}`,
            });
        }

        await result.update(req.body);

        res.json({ message: 'A marca foi alterado com sucesso' });
    } catch (error) {
        res.status(500).json(error);
    }
};
