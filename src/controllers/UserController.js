import User from "../models/User";
import bcrypt from 'bcrypt';


class UserController {
    async createUser(req, res) {
        const { name, email, password, confirmPassword, type } = req.body;

        try {

            if (password === confirmPassword) {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(password, salt);

                const consultUser = await User.findAll({
                    where: {
                        email
                    }
                });

                if (consultUser.length > 0) {
                    return res.status(400).json({ message: 'Email já cadastrado' });
                }

                const user = await User.create({ name, email, password: hash, type })

                return res.status(200).json({
                    isSuccess: true,
                    message: 'Usuário criado com sucesso!',
                    user
                });

            } else {
                return res.status(400).json({ message: 'Senhas não correspondem' });
            }
        } catch (err) {
            return res.status(500).json({
                message: 'Erro interno de servidor',
                err
            })
        }
    }

    async getAll(req, res) {
        try {
            const users = await User.findAll();

            if (!users) {
                return res.status(400).json({ message: 'Nenhum usuário encontrado' });
            }

            return res.status(200).json(users);
        } catch (err) {
            return res.status(500).json({
                message: 'Erro interno de servidor',
                err
            })
        }
    }

    async getId(req, res) {
        const { id } = req.params;

        try {
            const user = await User.findByPk(id);

            if (!user) {
                return res.status(400).json({ message: 'Usuário não encontrado' });
            }

            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json({
                message: 'Erro interno de servidor',
                err
            })
        }
    }

    async updatePassword(req, res) {
        const { email, password, confirmNewPassword } = req.body;

        try {
            const user = await User.findOne({
                where: { email }
            });
            console.log(user)
            if (!user) {
                return res.status(400).json({ message: 'Usuário não encontrado' });
            }

            const compareNewPassword = bcrypt.compare(password, confirmNewPassword);

            if (compareNewPassword) {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(password, salt);

                const newUser = await User.update({ password: hash }, {
                    where: { email }
                });
                
                if(newUser[0] === 1)
                return res.status(200).json({
                    newUser,
                    isSuccess: true,
                    message: 'Senha alterada com sucesso!'
                });
                else
                return res.status(200).json({
                    newUser,
                    isSuccess: false,
                    message: 'Não foi possível alterar a senha!'
                })
                
            } else {
                return res.status(400).json({ message: 'Senhas não correspondem' });
            }

        } catch (err) {
            return res.status(500).json({
                message: 'Erro interno de servidor',
                err
            })
        }

    }

    async deleteId(req, res) {
        const { id } = req.params;

        try {
            const user = await User.findByPk(id);

            if (!user) {
                return res.status(400).json({ message: 'Usuário não encontrado' });
            }

            const destroy = await User.destroy({
                where: { id }
            });

            if (destroy) {
                return res.status(200).json({ message: 'Usuário deletado com sucesso' });
            }


        } catch (err) {
            return res.status(500).jsn({
                message: 'Erro interno de servidor',
                err
            })
        }
    }
}

export default new UserController;