import User from "../models/User";
import bcrypt from 'bcrypt';
import UserService from "../services/UserService";


class UserController {
    async createUser(req, res) {

        return await UserService.createUser(req, res);
    }

    async getAll(req, res) {

        return await UserService.getAll(req, res);
    }

    async getId(req, res) {

        return await UserService.getId(req, res);
    }

    async updatePassword(req, res) {

        return await UserService.updatePassword(req, res);
    }

    async deleteId(req, res) {

        return await UserService.deleteId(req, res);
    }
}

export default new UserController;