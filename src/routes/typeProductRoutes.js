import express from 'express';
import TypeProductController from '../controllers/TypeProductController';
import auth from '../middlewares/auth';
const routes = express.Router();

routes.post('/',auth, TypeProductController .post)
    .get('/',auth, TypeProductController.getAll)
    .get('/:id',auth, TypeProductController.getId)
    .put('/:id',auth, TypeProductController.updateId)
    .delete('/:id',auth, TypeProductController.deleteId)

export default routes;    