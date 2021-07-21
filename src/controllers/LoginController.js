import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class LoginController {
    async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({
                where: { email }
            });

            if (!user) {
                return res.status(200).json({ isSuccess: false, message: 'Usuário não encontrado', token: '', user: {} });
            }

            const compare = await bcrypt.compare(password, user.password);

            if (compare) {
                jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
                    if (err) {
                        return res.status(500).json({ isSuccess: false, message: 'Erro interno de servidor', token: '', user: {} });
                    } else {
                        return res.status(200).json({ isSuccess: true, token, user,message: '' });
                    }
                })
            } else {
                res.json({ isSuccess: false, message: 'Email ou senha incorreto', user });
            }
        } catch (err) {
            return res.status(500).json({
                message: 'Erro interno de servidor',
                err
            })
        }
    }
}

export default new LoginController;