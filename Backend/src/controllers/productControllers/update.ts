import { Request, Response } from 'express';
import { Product } from '../../models/Product';

interface productData {
    id?: number;
    name: string;
    description: string;
    price: number;
}

export const Update = async (req: Request, res: Response) => {
    try {
        const productData: productData = {
            id: parseInt(req.params.id),
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
        };

        if (!productData.id) {
            return res.status(400).json({ message: 'ID é obrigatório' });
        }

        const result = await Product.findOne({ where: { id: productData.id } });
        if (!result) {
            return res
                .status(404)
                .json(
                    `O produto com o ID ${productData.id} não foi encontrado`,
                );
        }

        await Product.update(productData, {
            where: { id: productData.id },
        });

        res.json({ message: 'O produto foi alterado com sucesso' });
    } catch (error) {
        console.log(error);
    }
};
