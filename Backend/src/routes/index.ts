import { Router } from 'express'
import { Create } from '../controllers/productControllers/create';
import { Update } from '../controllers/productControllers/update';
import { Delete } from '../controllers/productControllers/delete';
import { Read } from '../controllers/productControllers/read';
import { Show } from '../controllers/productControllers/show';
const mainRoutes = Router();

mainRoutes.route('/product')
    .get(Read)
    .post(Create)
    .delete(Delete)
    .put(Update)
    
    mainRoutes.route('/product:id').get(Show)


export default mainRoutes