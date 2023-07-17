import { Request, Response, NextFunction } from 'express';
export const translate = (req: Request, res: Response, next: NextFunction) => {
    try {
        const language = req.query.language as 'pt' | 'en';
        req.query.language = language;
        next();
    } catch (error) {
        req.query.translate = 'pt';
        next();
    }
};
