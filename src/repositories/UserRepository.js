import User from "../models/User";

class UserRepository{
    async getAll(){
        const users = await User.findAll();

        return users;
    }

    async getOne(email){
        const user = await User.findOne({
            where: { email }
        });

        return user;
    }

    async getId(id){
        const user = await User.findByPk(id);

        return user;
    }

    async createUser(name, email, password, type){        
        const user = await User.create({ name, email, password, type });

        return user;
    }

    async updatePassword(email,password){
        const newUser = await User.update({ password }, {
            where: { email }
        });

        return newUser;
    }

    async deleteUser(id){
        const destroy = await User.destroy({
            where: { id }
        });

        return destroy;
    }
}

export default new UserRepository();