import { Request, Response } from 'express';
import { Product } from '../../models/product';
import locales from '../../translate/locales/locales';

export const UpdateProduct = async (req: Request, res: Response) => {
    console.log('oi')
    try {
        const language = req.query.language as 'pt' | 'en';
        const messages = locales[language].message;

        const id = parseInt(req.params.id);

        const result = await Product.findOne({ where: { id } });

        if (!result) {
            return res.status(404).json({ message: messages.product404 });
        }

        await result.update(req.body);

        res.json({ message: messages.updateProduct200, data: result });
        
    } catch (error) {
        res.status(500).json(error);
    }
};
