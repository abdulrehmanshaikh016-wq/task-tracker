export class SignupModel implements ISignupModel {
    username: string;
    password: string;
    confirmPassword: string;
    profileImage: string;

    constructor(loginModel: ISignupModel) {
        this.username = loginModel.username;
        this.password = loginModel.password;
        this.confirmPassword = loginModel.confirmPassword;
        this.profileImage = loginModel.profileImage;
    }
}

interface ISignupModel {
    username: string;
    password: string;
    confirmPassword: string;
    profileImage: string;
};