import * as Yup from 'yup';
import { Request, Response, NextFunction } from 'express';

const ProductSchema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    description: Yup.string(),
    price: Yup.number()
        .required('Preço é obrigatória')
        .positive('o preço precisa ser positivo'),
});

export const ValidationProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        await ProductSchema.validate(req.body);
        next();
    } catch (error) {
        return res.status(500).json(error);
    }
};

export default ValidationProduct;
