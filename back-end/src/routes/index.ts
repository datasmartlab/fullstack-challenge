import { Router } from 'express'

import * as ProductController from '../controllers/productControllers'

const mainRoutes = Router();

mainRoutes.get('/products',ProductController.getAllProduct);
mainRoutes.post('/product',ProductController.addProduct);
mainRoutes.put('/product',ProductController.alterProduct);
mainRoutes.delete('/product/:id',ProductController.deleteProduct);


export default mainRoutes