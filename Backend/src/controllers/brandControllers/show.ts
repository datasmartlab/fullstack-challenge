import { Request, Response } from 'express';
import { Brand } from '../../models/brand';
import locales from '../../translate/locales/locales';

export const ShowBrand = async (req: Request, res: Response) => {
    try {
        const language = req.query.language as 'pt' | 'en';
        const id = parseInt(req.params.id);

        const messages = locales[language].message;

        const result = await Brand.findOne({ where: { id } });

        if (!result) {
            return res.status(404).json({ message: messages.brand404 });
        }

        return res.json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};
