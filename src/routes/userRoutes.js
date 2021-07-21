import express from 'express';
import UserController from '../controllers/UserController';
import auth from '../middlewares/auth';

const routes = express.Router();

routes.post('/', UserController.createUser)
    .get('/', auth, UserController.getAll)
    .get('/:id', auth, UserController.getId)
    .put('/', UserController.updatePassword)
    .delete('/:id', auth, UserController.deleteId)

export default routes;