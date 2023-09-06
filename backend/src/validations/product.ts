import * as Yup from 'yup';
import { Request, Response, NextFunction } from 'express';
import locales from '../translate/locales/locales';

export const ValidationProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const language = req.query.language as 'pt' | 'en';

        const messages = locales[language].message;

        const ProductSchema = Yup.object().shape({
            name: Yup.string().required(messages.validationProductName),
            description: Yup.string(),
            price: Yup.number()
                .required(messages.validationProductPriceRequired)
                .positive(messages.validationProductPricePositive),
        });

        await ProductSchema.validate(req.body);

        next();
    } catch (error) {
        return res.status(500).json(error);
    }
};

export default ValidationProduct;
