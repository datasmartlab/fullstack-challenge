import { Request, Response } from 'express';
import { Brand } from '../../models/brand';
import locales from '../../translate/locales/locales';

export const CreateBrand = async (req: Request, res: Response) => {
    try {
        const language = req.query.language as 'pt' | 'en';
        const name = req.body.name;

        const messages = locales[language].message;

        const [result, created] = await Brand.findOrCreate({
            where: { name },
        });

        if (!created) {
            return res.status(409).json({
                message: messages.createBrand409,
            });
        }

        res.status(201).json({
            message: messages.createBrand201,
            data: result,
        });
    } catch (error) {
        res.status(500).json(error);
    }
};
