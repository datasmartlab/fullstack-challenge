import { Request, Response } from 'express';
import { Brand } from '../../models/brand';
import { BrandSchema } from '../../validations/brand';

export interface brandData {
    id?: number;
    name: string;
}

export const CreateBrand = async (req: Request, res: Response) => {
    try {
        const BrandData: brandData = {
            name: req.body.name,
        };
        await BrandSchema.validate(BrandData);

        const result = await Brand.findOne({
            where: { name: BrandData.name },
        });

        if (result) {
            return res.status(409).json({
                message: `O marca com o nome ${BrandData.name} já foi cadastrado `,
            });
        }

        const product = Brand.build({
            name: BrandData.name,
        });

        product.save();

        res.status(201).json({
            message: 'O produto foi cadastrado com sucesso',
        });
    } catch (error) {
        res.status(500).json(error);
    }
};
