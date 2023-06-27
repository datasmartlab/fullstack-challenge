import { Request, Response } from 'express';
import { Product } from '../../models/Product';

export const Delete = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (!id) {
            return res.status(400).json({ message: 'ID é obrigatório' });
        }

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
        console.log(error);
    }
};
