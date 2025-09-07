export class LoginModel implements ILoginModel {
    username: string;
    password: string;

    constructor(loginModel: ILoginModel) {
        this.username = loginModel.username;
        this.password = loginModel.password;
    }
}

interface ILoginModel {
    username: string;
    password: string;
};