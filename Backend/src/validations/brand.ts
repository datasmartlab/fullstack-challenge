import * as Yup from 'yup';
import { Request, Response, NextFunction } from 'express';

const BrandSchema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
});

export const ValidationBrand = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        await BrandSchema.validate(req.body);
        next();
    } catch (error) {
        return res.status(500).json(error);
    }
};

export default ValidationBrand;
