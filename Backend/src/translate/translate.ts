import { Request, Response, NextFunction } from 'express';
import locales from './locales/locales';
export const translate = (req: Request, res: Response, next: NextFunction) => {
    try {
        const language = req.query.language as 'pt' | 'en';
        const messages = locales[language].message;
        req.query.translate = messages;
        next();
    } catch (error) {
        const messages = locales['pt'].message;
        req.query.translate = messages;
        next();
    }
};
