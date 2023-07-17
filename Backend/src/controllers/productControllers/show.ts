import { Request, Response } from 'express';
import { Product } from '../../models/product';
import locales from '../../translate/locales/locales';

export const ShowProduct = async (req: Request, res: Response) => {
    try {
        const language = req.query.language as 'pt' | 'en';
        const id: number = parseInt(req.params.id);

        const messages = locales[language].message;

        const result = await Product.findOne({
            where: { id },
            include: {
                association: 'brandData',
                attributes: ['name', 'id'],
            },
        });

        if (!result) {
            return res.status(404).json({ message: messages.product404 });
        }
        return res.json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};
