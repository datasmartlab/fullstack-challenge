import { Request, Response } from 'express';
import { Brand } from '../../models/brand';

export interface BrandData {
    name: string;
}

export const CreateBrand = async (req: Request, res: Response) => {
    try {
        const brandData: BrandData = {
            name: req.body.name,
        };

        const [result, created] = await Brand.findOrCreate({
            where: { name: brandData.name },
        });

        if (!created) {
            return res.status(409).json({
                message: `A marca com o nome ${brandData.name} já foi cadastrada`,
            });
        }

        res.status(201).json({
            message: `A marca ${brandData.name} foi cadastrada com sucesso`,
            data: result,
        });
    } catch (error) {
        res.status(500).json(error);
    }
};
