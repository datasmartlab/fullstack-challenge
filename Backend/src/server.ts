import express, { Request, Response } from 'express';
import mainRoutes from './routes';
import cors from 'cors';

const server = express();

server.use(cors());

server.use(express.json());

server.use(mainRoutes);

server.use((req: Request, res: Response) => {
    res.status(404).json('Rota não encontrada');
});

server.listen(process.env.PORT);
