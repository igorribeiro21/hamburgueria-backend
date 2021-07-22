import User from "../models/User";

class UserRepository{
    async getOne(email){
        const user = await User.findOne({
            where: { email }
        });

        return user;
    }
}

export default new UserRepository();