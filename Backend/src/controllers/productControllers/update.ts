import { Request, Response } from 'express';
import { Product } from '../../models/product';

export const UpdateProduct = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);

        const result = await Product.findOne({ where: { id } });
        if (!result) {
            return res
                .status(404)
                .json(`O produto com o ID ${id} não foi encontrado`);
        }

        await result.update(req.body);

        res.json({ message: 'O produto foi alterado com sucesso' });
    } catch (error) {
        res.status(500).json(error);
    }
};
