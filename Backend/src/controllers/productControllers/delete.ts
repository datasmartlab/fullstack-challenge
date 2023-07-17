import { Request, Response } from 'express';
import { Product } from '../../models/product';
import locales from '../../translate/locales/locales';

export const DeleteProduct = async (req: Request, res: Response) => {
    try {
        const language = req.query.language as 'pt' | 'en';
        const id = parseInt(req.params.id);

        const messages = locales[language].message;

        const result = await Product.findOne({ where: { id } });

        if (!result) {
            return res.status(404).json({ message: messages.product404 });
        }

        await result.destroy();

        res.json({
            message: messages.deleteProduct200,
        });
    } catch (error) {
        res.status(500).json(error);
    }
};
