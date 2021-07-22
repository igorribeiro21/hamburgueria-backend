import LoginService from "../services/LoginService";

class LoginController {
    async login(req, res) {
        return await LoginService.login(req,res);
    }
}

export default new LoginController;