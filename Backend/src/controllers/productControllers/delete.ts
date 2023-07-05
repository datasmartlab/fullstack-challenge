import { Request, Response } from 'express';
import { Product } from '../../models/product';

export const DeleteProduct = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);

        const result = await Product.findOne({ where: { id: id } });

        if (!result) {
            return res
                .status(404)
                .json({ message: 'O Produto não encontrado' });
        }

        await result.destroy();

        res.json({
            message: `O produto ${result.name}  foi deletado com sucesso`,
        });
    } catch (error) {
        res.status(500).json(error);
    }
};
