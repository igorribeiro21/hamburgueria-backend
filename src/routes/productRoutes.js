import express from 'express';
const routes = express.Router();
import ProductController from '../controllers/ProductController';
import auth from '../middlewares/auth';

routes.post('/',auth, ProductController.post)
    .get('/', auth,ProductController.getAllProducts)
    .get('/:id',auth, ProductController.getId)
    .put('/:id',auth, ProductController.updateId)
    .delete('/:id',auth, ProductController.deleteId)

export default routes;    

