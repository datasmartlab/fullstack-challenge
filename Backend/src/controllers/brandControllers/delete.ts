import { Request, Response } from 'express';
import { Brand } from '../../models/brand';

export const DeleteBrand = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);

        const result = await Brand.findOne({ where: { id } });
        if (!result) {
            return res.status(404).json({ message: 'A marca não encontrado' });
        }
        await result.destroy();

        res.json({
            message: `A marca ${result.name}  foi deletada com sucesso`,
        });
    } catch (error) {
        res.status(500).json(error);
    }
};
