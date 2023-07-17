import { Request, Response } from 'express';
import { Brand } from '../../models/brand';
import { Op } from 'sequelize';
import locales from '../../translate/locales/locales';

export const UpdateBrand = async (req: Request, res: Response) => {
    try {
        const language = req.query.language as 'pt' | 'en';
        const id = parseInt(req.params.id);

        const messages = locales[language].message;

        const result = await Brand.findOne({ where: { id } });

        if (!result) {
            return res.status(404).json({ message: messages.brand404 });
        }

        const name = req.body.name;

        const brandExist = await Brand.findOne({
            where: { name, id: { [Op.not]: id } },
        });

        if (brandExist) {
            return res.status(409).json({
                message: messages.updateBrand409,
            });
        }

        await result.update(req.body);

        res.json({ message: messages.updateBrand200 });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
